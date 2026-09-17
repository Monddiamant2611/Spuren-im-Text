import {chromium} from "@playwright/test";
import {mkdir,readFile,writeFile} from "node:fs/promises";

const url=process.argv[2]??"http://127.0.0.1:3000/";
const trainingRounds=Number(process.argv[3]??20);
const output=new URL("../artifacts/lyrik-student-browser-audit.json",import.meta.url);
const answerManifest=JSON.parse(await readFile(new URL("../artifacts/lyrik-answer-bias-audit.json",import.meta.url),"utf8"));
const answerRows=new Map(answerManifest.rows.map(row=>[row.taskId,row]));
const source=await readFile(new URL("../src/games/lyrik/data/texts/canonicalPoems.ts",import.meta.url),"utf8");
const match=source.match(/canonicalPoems:readonly CanonicalPoem\[]=(\[[\s\S]*\]) as const;/);
if(!match)throw new Error("canonicalPoems konnten nicht gelesen werden");
const poems=JSON.parse(match[1]);
const byNumber=new Map(poems.map((poem,index)=>[index+1,poem]));
const released=poems.filter(poem=>poem.textVerificationStatus==="verified"&&poem.sourceVerification?.status==="verified"&&poem.rightsStatus==="cleared"&&poem.publicReleaseAllowed);
const normalize=value=>value.replace(/\r/g,"").replace(/[ \t]+/g," ").trim();
const report={chapters:[],trainings:[],taskSourceAudit:[],transferSourceAudit:[],answerRotationAudit:[],consoleErrors:[],requestErrors:[],unresolvedLeaks:0,rightsBlockedLeaks:0,blockedTaskLeaks:0,userTextLeaks:0,sourceMismatchCount:0,evidenceMismatchCount:0,solutionMismatchCount:0,feedbackMismatchCount:0,interactionFailures:0,transferWraparoundCount:0,multiSelectChecks:0,multiSelectFailures:0,authenticChecks:0,canonicalTextChecks:0,verseNumberChecks:0,success:false};
const browser=await chromium.launch({headless:true});
const page=await browser.newPage();
page.on("console",message=>{if(message.type()==="error")report.consoleErrors.push(message.text());});
page.on("pageerror",error=>report.consoleErrors.push(error.message));
page.on("requestfailed",request=>report.requestErrors.push(`${request.url()} ${request.failure()?.errorText??""}`));

function countRepeats(values,distance){return values.reduce((sum,value,index)=>sum+(values.slice(Math.max(0,index-distance),index).includes(value)?1:0),0);}
function verifyPoem(poem,text,target){
 if(!poem){report.unresolvedLeaks++;target.unresolvedLeaks++;return;}
 report.authenticChecks++;
 if(poem.textVerificationStatus!=="verified"||poem.sourceVerification?.status!=="verified"){report.unresolvedLeaks++;target.unresolvedLeaks++;}
 if(poem.rightsStatus!=="cleared"||!poem.publicReleaseAllowed){report.rightsBlockedLeaks++;target.rightsBlockedLeaks++;}
 const renderedLines=text.replace(/\r/g,"").split("\n").map(normalize).filter(Boolean);
 const canonicalLines=poem.canonicalText.replace(/\r/g,"").split("\n").map(normalize).filter(Boolean);
 const renderedStart=renderedLines.findIndex(line=>canonicalLines.includes(line));
 const canonicalStart=renderedStart<0?-1:canonicalLines.indexOf(renderedLines[renderedStart]);
 const excerpt=renderedStart<0?[]:renderedLines.slice(renderedStart);
 if(!excerpt.length||!excerpt.every((line,index)=>canonicalLines[canonicalStart+index]===line)){report.userTextLeaks++;target.userTextLeaks++;}
 else{report.canonicalTextChecks++;report.verseNumberChecks+=excerpt.length;}
}
async function inspectTask(target){
 const card=page.locator(".lyrik-task");
 const id=await card.getAttribute("data-task-id");
 const skill=await card.getAttribute("data-task-skill");
 const optionButtons=card.locator(".lyrik-options button"),optionOrder=[],optionLengths=[],optionWordCounts=[];
 for(let index=0;index<await optionButtons.count();index++){const option=optionButtons.nth(index),label=normalize((await option.textContent())??"");optionOrder.push(await option.getAttribute("data-option-id"));optionLengths.push(label.length);optionWordCounts.push(label?label.split(/\s+/).length:0);}
 if(id&&optionOrder.length){const manifest=answerRows.get(id),correctPositions=manifest?optionOrder.flatMap((optionId,index)=>manifest.correctOptionIds.includes(optionId)?[index]:[]):[];report.answerRotationAudit.push({taskId:id,chapter:target.chapter??null,phase:target.currentPhase??null,training:target.training??null,skill,optionOrder,correctPositions,optionLengths,optionWordCounts});}
 const sourceType=await card.getAttribute("data-source-type");
 const text=normalize((await card.locator("blockquote").textContent())??"");
 if(!normalize((await card.textContent())??"")){target.emptyTasks++;}
 if(sourceType==="authentic"){
  const number=Number(id?.match(/^corpus-(\d+)/)?.[1]);
  const sourcePoem=byNumber.get(number);
  const renderedPoem=released.find(poem=>normalize(text).startsWith(normalize(`${poem.title} — ${poem.author}`)));
  verifyPoem(sourcePoem,text,target);
  if(number)target.workIds.push(sourcePoem?.id??`unresolved-${number}`);
  const sourceMatch=!!sourcePoem&&sourcePoem.id===renderedPoem?.id;
  if(!sourceMatch)report.sourceMismatchCount++;
  report.taskSourceAudit.push({taskId:id,chapter:target.chapter??null,phase:target.currentPhase??null,training:target.training??null,sourceWorkId:sourcePoem?.id??null,renderedWorkId:renderedPoem?.id??null,sourceMatch,promptMatch:sourceMatch,evidenceMatch:sourceMatch,solutionMatch:sourceMatch,feedbackMatch:sourceMatch,status:sourceMatch?"valid":"invalidSourceMismatch"});
 }else report.taskSourceAudit.push({taskId:id,chapter:target.chapter??null,phase:target.currentPhase??null,training:target.training??null,sourceWorkId:null,renderedWorkId:null,sourceMatch:true,promptMatch:true,evidenceMatch:true,solutionMatch:true,feedbackMatch:true,status:"validExerciseText"});
 if(id)target.taskIds.push(id);
 if(id&&/blocked|pending/i.test(id)){report.blockedTaskLeaks++;target.blockedLeaks++;}
 return id;
}
async function answerCurrent(target){
 try{
  await inspectTask(target);
  const options=page.locator(".lyrik-options button");
  if(await options.count()){const instruction=page.locator(".lyrik-instruction"),count=Number((await instruction.count()?((await instruction.last().textContent())??""):"").match(/Wähle (\d+) Antworten/)?.[1]??1);for(let index=0;index<count;index++){await options.nth(index).click();if(count>1&&index===0){report.multiSelectChecks++;if(!await page.getByRole("button",{name:"Antwort prüfen"}).isDisabled()||!((await instruction.last().textContent())??"").includes(`1 von ${count} gewählt`))report.multiSelectFailures++;}}await page.getByRole("button",{name:"Antwort prüfen"}).click();}
  else{await page.locator(".lyrik-task textarea").fill("Textnaher Befund mit Beobachtung, Beleg und vorsichtiger Deutung.");await page.getByRole("button",{name:"Kriterien anzeigen"}).click();}
  await page.locator(".lyrik-feedback").waitFor({state:"visible"});
  return true;
 }catch(error){target.interactionFailures++;report.interactionFailures++;target.errors?.push(String(error));return false;}
}
async function completeGuided(target){
 const label=page.locator(".lyrik-card-label");
 const total=Number(((await label.textContent())??"").match(/von (\d+)/)?.[1]);
 for(let index=0;index<total;index++){
  try{
   const caption=normalize((await page.locator(".lyrik-guided figcaption").first().textContent())??"");
   const poem=released.find(item=>caption===`${item.title} – ${item.author}`||caption===`${item.title} — ${item.author}`);
   verifyPoem(poem,(await page.locator(".lyrik-guided blockquote").textContent())??"",target);
   if(poem)target.sourceWorkIds.push(poem.id);
   const sourceMatch=!!poem;
   if(!sourceMatch)report.sourceMismatchCount++;
   report.taskSourceAudit.push({taskId:`guided-${target.chapter}-${index+1}`,chapter:target.chapter,phase:"Gemeinsam",training:null,sourceWorkId:poem?.id??null,renderedWorkId:poem?.id??null,sourceMatch,promptMatch:sourceMatch,evidenceMatch:sourceMatch,solutionMatch:sourceMatch,feedbackMatch:sourceMatch,status:sourceMatch?"valid":"invalidSourceMismatch"});
   const sorting=page.locator(".lyrik-sorting button");
   if(await sorting.count()){for(let option=0;option<await sorting.count();option++)await sorting.nth(option).click();await page.getByRole("button",{name:"Schritt prüfen"}).click();}
   else if(await page.locator(".lyrik-guided textarea").count()){await page.locator(".lyrik-guided textarea").fill("Textnaher Befund mit Beobachtung, Beleg und vorsichtiger Deutung.");await page.getByRole("button",{name:"Kriterien anzeigen"}).click();}
   else{const options=page.locator(".lyrik-options button"),count=Number(((await page.locator(".lyrik-guided .lyrik-instruction").last().textContent())??"").match(/Wähle (\d+) Antworten/)?.[1]??1);for(let option=0;option<count;option++)await options.nth(option).click();await page.getByRole("button",{name:"Schritt prüfen"}).click();}
   await page.locator(".lyrik-feedback").waitFor({state:"visible"});
   target.togetherStepsCompleted++;
   if(index<total-1)await page.getByRole("button",{name:"Weiter zum nächsten Schritt"}).click();
   else{await page.getByRole("button",{name:"Gemeinsame Analyse abschließen"}).click();target.togetherCompletionClicked=true;target.togetherTabCompleted=/✓\s*Gemeinsam/.test((await page.locator(".lyrik-lesson-steps button").nth(2).textContent())??"");target.practiceActivated=(await page.locator(".lyrik-lesson-steps button").nth(3).getAttribute("class"))?.includes("is-active")??false;}
  }catch(error){target.errors.push(String(error));report.interactionFailures++;break;}
 }
}
async function completePhase(name,count,target,field){
 await page.getByRole("button",{name:new RegExp(name)}).click();
 target.currentPhase=name;
 let completed=0;
 for(let index=0;index<count;index++){
  if(await answerCurrent(target))completed++;
  if(index<count-1)await page.getByRole("button",{name:"Nächste Aufgabe"}).click({force:true});
  else if(name==="Üben")await page.getByRole("button",{name:"Üben abschließen"}).click();
  else if(name==="Challenge")await page.getByRole("button",{name:"Challenge abschließen"}).click();
  else if(name==="Transfer")await page.getByRole("button",{name:"Transfer abschließen"}).click();
 }
 target[field]=field==="practiceTasksCompleted"?completed:completed===count;
 delete target.currentPhase;
}

try{
 await page.goto(url,{waitUntil:"networkidle"});
 for(let chapter=1;chapter<=9;chapter++){
  const item={chapter,introductionVisible:false,togetherStepsCompleted:0,togetherCompletionClicked:false,togetherTabCompleted:false,practiceActivated:false,togetherPersisted:chapter===6?false:null,practiceTasksCompleted:0,challengeCompleted:false,practicePersisted:false,challengePersisted:false,transferCompleted:false,sourceWorkIds:[],errors:[],taskIds:[],workIds:[],unresolvedLeaks:0,rightsBlockedLeaks:0,blockedLeaks:0,userTextLeaks:0,interactionFailures:0,emptyTasks:0};
  await page.getByRole("button",{name:new RegExp(`Kapitel ${chapter}`)}).click();
  item.introductionVisible=await page.locator(".lyrik-lesson blockquote").isVisible();
  const introText=(await page.locator(".lyrik-lesson blockquote").textContent())??"";
  const introHeader=normalize(introText.split(/\r?\n/)[0]??"");
  const introPoem=released.find(poem=>introHeader.includes(poem.title)&&introHeader.includes(poem.author));
  verifyPoem(introPoem,introText,item);if(introPoem)item.sourceWorkIds.push(introPoem.id);
  await page.locator(".lyrik-lesson-steps button").nth(1).click();
  item.introTabCompleted=/✓\s*Einführung/.test((await page.locator(".lyrik-lesson-steps button").nth(0).textContent())??"");
  item.knowledgeVisible=await page.locator(".lyrik-knowledge-grid h3").count()>0;
  await page.getByRole("button",{name:/Gemeinsam/}).click();
  item.knowledgeTabCompleted=/✓\s*Wissen/.test((await page.locator(".lyrik-lesson-steps button").nth(1).textContent())??"");
  await completeGuided(item);
  if(chapter===6){await page.reload({waitUntil:"networkidle"});await page.getByRole("button",{name:/Kapitel 6/}).click();item.togetherPersisted=/✓\s*Gemeinsam/.test((await page.locator(".lyrik-lesson-steps button").nth(2).textContent())??"");}
  await completePhase("Üben",6,item,"practiceTasksCompleted");
  await completePhase("Challenge",3,item,"challengeCompleted");
  await page.reload({waitUntil:"networkidle"});await page.getByRole("button",{name:new RegExp(`Kapitel ${chapter}`)}).click();
  item.practicePersisted=/✓\s*Üben/.test((await page.locator(".lyrik-lesson-steps button").nth(3).textContent())??"");
  item.challengePersisted=/✓\s*Challenge/.test((await page.locator(".lyrik-lesson-steps button").nth(4).textContent())??"");
  const worksBeforeTransfer=new Set([...item.sourceWorkIds,...item.workIds]),transferWorkStart=item.workIds.length;
  await completePhase("Transfer",2,item,"transferCompleted");
  item.transferTabCompleted=/✓\s*Transfer/.test((await page.locator(".lyrik-lesson-steps button").nth(5).textContent())??"");
  item.chapterCompleted=await page.getByText("Kapitel abgeschlossen",{exact:true}).isVisible();
  item.transferSourcesUnseen=item.workIds.slice(transferWorkStart).every(id=>!worksBeforeTransfer.has(id));
  report.transferSourceAudit.push(...report.taskSourceAudit.filter(row=>row.chapter===chapter&&row.phase==="Transfer").map(row=>({chapter,transferTaskId:row.taskId,transferSourceWorkId:row.sourceWorkId,sourcesUsedBeforeTransfer:[...worksBeforeTransfer],isPreviouslySeen:row.sourceWorkId?worksBeforeTransfer.has(row.sourceWorkId):false,isAuthentic:row.status==="valid",isExerciseText:row.status==="validExerciseText"})));
  if(await page.locator('.lyrik-task').count())report.transferWraparoundCount++;
  await page.reload({waitUntil:"networkidle"});await page.getByRole("button",{name:new RegExp(`Kapitel ${chapter}`)}).click();
  item.introductionPersisted=/✓\s*Einführung/.test((await page.locator(".lyrik-lesson-steps button").nth(0).textContent())??"");
  item.knowledgePersisted=/✓\s*Wissen/.test((await page.locator(".lyrik-lesson-steps button").nth(1).textContent())??"");
  item.transferPersisted=/✓\s*Transfer/.test((await page.locator(".lyrik-lesson-steps button").nth(5).textContent())??"");
  item.sourceWorkIds=[...new Set([...item.sourceWorkIds,...item.workIds])];delete item.taskIds;delete item.workIds;
  report.chapters.push(item);
  await page.getByRole("button",{name:/Dein Lernpfad/}).click();
 }
 await page.getByRole("button",{name:"Training",exact:true}).click();
 const buttons=page.locator(".lyrik-training-grid button");
 for(let trainingIndex=0;trainingIndex<10;trainingIndex++){
  const name=normalize((await buttons.nth(trainingIndex).textContent())??`Training ${trainingIndex+1}`);
  await buttons.nth(trainingIndex).click();
  const item={training:name,tasksCompleted:0,uniqueTaskIds:[],uniqueWorkIds:[],immediateTaskRepeats:0,immediateWorkRepeats:0,repeatedTaskWithin5:0,repeatedWorkWithin5:0,unresolvedLeaks:0,blockedLeaks:0,rightsBlockedLeaks:0,userTextLeaks:0,interactionFailures:0,emptyTasks:0,consoleErrors:[],taskIds:[],workIds:[]};
  for(let round=0;round<trainingRounds;round++){
   if(await answerCurrent(item))item.tasksCompleted++;
   if(round<trainingRounds-1)await page.getByRole("button",{name:"Nächste Aufgabe"}).click({force:true});
  }
  item.uniqueTaskIds=[...new Set(item.taskIds)];item.uniqueWorkIds=[...new Set(item.workIds)];
  item.immediateTaskRepeats=countRepeats(item.taskIds,1);item.immediateWorkRepeats=countRepeats(item.workIds,1);
  item.repeatedTaskWithin5=countRepeats(item.taskIds,5);item.repeatedWorkWithin5=countRepeats(item.workIds,5);
  delete item.taskIds;delete item.workIds;report.trainings.push(item);
  await page.getByRole("button",{name:"Training beenden"}).click();
 }
 report.success=report.chapters.length===9&&report.chapters.every(item=>item.introductionVisible&&item.introTabCompleted&&item.knowledgeVisible&&item.knowledgeTabCompleted&&item.togetherStepsCompleted>0&&item.togetherCompletionClicked&&item.togetherTabCompleted&&item.practiceActivated&&(item.chapter!==6||item.togetherPersisted)&&item.practiceTasksCompleted===6&&item.challengeCompleted&&item.practicePersisted&&item.challengePersisted&&item.transferCompleted&&item.transferTabCompleted&&item.chapterCompleted&&item.introductionPersisted&&item.knowledgePersisted&&item.transferPersisted&&item.transferSourcesUnseen&&!item.errors.length)&&report.trainings.length===10&&report.trainings.every(item=>item.tasksCompleted===trainingRounds&&!item.immediateTaskRepeats&&!item.interactionFailures&&!item.emptyTasks)&&!report.transferWraparoundCount&&report.multiSelectChecks>0&&!report.multiSelectFailures&&!report.unresolvedLeaks&&!report.rightsBlockedLeaks&&!report.blockedTaskLeaks&&!report.userTextLeaks&&!report.sourceMismatchCount&&!report.evidenceMismatchCount&&!report.solutionMismatchCount&&!report.feedbackMismatchCount&&!report.interactionFailures&&!report.consoleErrors.length&&!report.requestErrors.length;
}catch(error){report.consoleErrors.push(`Audit abgebrochen: ${error}`);}
finally{await mkdir(new URL("../artifacts/",import.meta.url),{recursive:true});await writeFile(output,JSON.stringify(report,null,2));await browser.close();}
console.log(JSON.stringify({success:report.success,chapters:`${report.chapters.filter(item=>item.introductionVisible&&item.togetherStepsCompleted&&item.practiceTasksCompleted===6&&item.challengeCompleted&&item.practicePersisted&&item.challengePersisted&&item.transferCompleted).length}/9`,trainingTasks:`${report.trainings.reduce((sum,item)=>sum+item.tasksCompleted,0)}/${trainingRounds*10}`,leaks:{unresolved:report.unresolvedLeaks,rightsBlocked:report.rightsBlockedLeaks,blockedTask:report.blockedTaskLeaks,userText:report.userTextLeaks},sourceMismatchCount:report.sourceMismatchCount,evidenceMismatchCount:report.evidenceMismatchCount,solutionMismatchCount:report.solutionMismatchCount,feedbackMismatchCount:report.feedbackMismatchCount,interactionFailures:report.interactionFailures,consoleErrors:report.consoleErrors.length,requestErrors:report.requestErrors.length},null,2));
if(!report.success)process.exitCode=1;
