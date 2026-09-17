import {chromium} from "@playwright/test";
import {mkdir,writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";

const base=process.argv[2]??"http://127.0.0.1:4188";
const browser=await chromium.launch({headless:true});
const report={root:false,introStanzaBoundary:false,categories:[],styleGroups:[],styleCardCount:0,archiveGroups:[],archiveArticles:0,emptyCardBacks:[],emptyArticles:[],responsive:[],responsiveSurfaces:[],keyboard:{},sessions:[],storage:{},consoleErrors:[],consoleWarnings:[],requestErrors:[],httpErrors:[],screenshots:[],success:false};
const shots=new URL("../artifacts/lyrik-final-screenshots/",import.meta.url);
const shotPath=file=>fileURLToPath(new URL(file,shots));
await mkdir(shots,{recursive:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
page.on("console",message=>{if(message.type()==="error")report.consoleErrors.push(message.text());if(message.type()==="warning")report.consoleWarnings.push(message.text());});
page.on("pageerror",error=>report.consoleErrors.push(error.message));
page.on("requestfailed",request=>report.requestErrors.push(`${request.url()}: ${request.failure()?.errorText??""}`));
page.on("response",response=>{if(response.status()>=400)report.httpErrors.push(`${response.status()} ${response.url()}`);});
const title=locator=>locator.textContent().then(value=>value?.trim()??"");
try{
 await page.goto(`${base}/`,{waitUntil:"networkidle"});report.root=await page.getByRole("heading",{name:"Lyrikwerkstatt"}).isVisible();
 await page.goto(`${base}/lyrik`,{waitUntil:"networkidle"});
 for(const chapter of [1,3,5,6,7,9]){
  await page.getByRole("button",{name:new RegExp(`Kapitel ${chapter}(?:\\D|$)`)}).click();
  if(chapter===6)report.introStanzaBoundary=(await title(page.locator(".lyrik-lesson blockquote"))).includes("Stäbe gäbe\n\nund hinter");
  const file=`chapter-${chapter}.png`;await page.screenshot({path:shotPath(file),fullPage:true});report.screenshots.push(file);
  await page.getByRole("button",{name:/Dein Lernpfad/}).click();
 }
 await page.getByRole("button",{name:"Kartei",exact:true}).click();
 const categories=page.locator(".lyrik-category-grid button");
 const categoryCount=await categories.count();
 for(let index=0;index<categoryCount;index++){
  const name=await title(categories.nth(index).locator("strong"));await categories.nth(index).click();
  if(index===0)report.keyboard.searchLabeled=await page.getByRole("textbox",{name:"Begriff suchen"}).count()===1;
  const entry={name,visibleCards:await page.locator(".lyrik-flashcard").count(),flipped:false};
  if(name==="Stilmittel"){
   const groups=page.locator(".lyrik-category-grid button");const groupCount=await groups.count();
   for(let group=0;group<groupCount;group++){
    const groupName=await title(groups.nth(group).locator("strong"));await groups.nth(group).click();
    const cards=page.locator(".lyrik-flashcard");const count=await cards.count();report.styleCardCount+=count;report.styleGroups.push({name:groupName,cards:count});
    for(let card=0;card<count;card++){await cards.nth(card).getByRole("button",{name:"Umdrehen"}).click();if(!(await title(cards.nth(card).locator("p").nth(1))))report.emptyCardBacks.push(`${groupName}:${card}`);}
    if(group===0){const file="kartei-stilmittel.png";await page.screenshot({path:shotPath(file),fullPage:true});report.screenshots.push(file);}
    await page.getByRole("button",{name:/Stilmittelgruppen/}).click();
   }
  }else{
   const cards=page.locator(".lyrik-flashcard");for(let card=0;card<await cards.count();card++){await cards.nth(card).getByRole("button",{name:"Umdrehen"}).click();if(!(await title(cards.nth(card).locator("p").nth(1))))report.emptyCardBacks.push(`${name}:${card}`);}
   entry.flipped=true;
  }
  report.categories.push(entry);await page.getByRole("button",{name:/Zurück zu den Kategorien/}).click();
 }
 await page.getByRole("button",{name:"Wissensarchiv",exact:true}).click();
 report.keyboard.archiveSearchLabeled=await page.getByRole("textbox",{name:"Begriff suchen"}).count()===1;
 const details=page.locator(".lyrik-archive-index details");
 const count=await details.count();
 for(let group=0;group<count;group++){
  const name=await title(details.nth(group).locator("summary b"));await details.nth(group).locator("summary").click();
  const buttons=details.nth(group).locator("button");const articleCount=await buttons.count();report.archiveGroups.push({name,articles:articleCount});
  for(let article=0;article<articleCount;article++){
   await buttons.nth(article).click();report.archiveArticles++;
   if(!(await title(page.locator(".lyrik-detail h2")))||!(await title(page.locator(".lyrik-detail p").nth(1))))report.emptyArticles.push(`${name}:${article}`);
   if(group===0&&article===0){const file="wissensarchiv.png";await page.screenshot({path:shotPath(file),fullPage:true});report.screenshots.push(file);}
   await page.getByRole("button",{name:/Zur Inhaltsübersicht/}).click();
   if(article<articleCount-1)await details.nth(group).locator("summary").click();
  }
 }
 await page.getByRole("button",{name:"Training",exact:true}).click();await page.locator(".lyrik-training-grid button").first().click();
 {const file="training.png";await page.screenshot({path:shotPath(file),fullPage:true});report.screenshots.push(file);}
 report.keyboard.buttonFocusable=await page.getByRole("button",{name:"Training beenden"}).evaluate(element=>{element.focus();return document.activeElement===element;});
 report.keyboard.formLabel=await page.getByRole("textbox",{name:"Deine Analyse"}).count()===1;
 for(const width of [1440,900,390]){
  await page.setViewportSize({width,height:800});
  const result=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,clippedButtons:[...document.querySelectorAll("button")].filter(button=>{const r=button.getBoundingClientRect();return !button.closest(".lyrik-lesson-steps")&&r.width>0&&(r.left<0||r.right>innerWidth+1)}).length}));
  report.responsive.push({width,...result});
  if(width===390){const file="training-mobile.png";await page.screenshot({path:shotPath(file),fullPage:true});report.screenshots.push(file);}
 }
 for(const surface of ["Lernpfad","Kartei","Wissensarchiv","Training"]){
  await page.getByRole("button",{name:surface,exact:true}).click();
  if(surface==="Lernpfad")await page.getByRole("button",{name:/Kapitel 6(?:\D|$)/}).click();
  const fit=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,clippedButtons:[...document.querySelectorAll("button")].filter(button=>{const r=button.getBoundingClientRect();return !button.closest(".lyrik-lesson-steps")&&r.width>0&&(r.left<0||r.right>innerWidth+1)}).length}));
  report.responsiveSurfaces.push({surface,width:390,...fit});
  if(surface==="Lernpfad"){const file="chapter-6-mobile.png";await page.screenshot({path:shotPath(file),fullPage:true});report.screenshots.push(file);}
 }
 await page.evaluate(()=>localStorage.setItem("lyrik.learningProgress.v1",JSON.stringify({version:1,completedTogetherChapters:[7]})));await page.reload({waitUntil:"networkidle"});
 await page.getByRole("button",{name:/Kapitel 7(?:\D|$)/}).click();await page.locator(".lyrik-lesson-steps button").nth(3).click();
 report.keyboard.optionFocusable=await page.locator(".lyrik-options button").first().evaluate(element=>{element.focus();return document.activeElement===element;}).catch(()=>false);
 for(let session=0;session<3;session++){
  const context=await browser.newContext();await context.addInitScript(()=>localStorage.setItem("lyrik.learningProgress.v1",JSON.stringify({version:1,completedTogetherChapters:[7]})));const p=await context.newPage();await p.goto(`${base}/lyrik`,{waitUntil:"networkidle"});await p.getByRole("button",{name:/Kapitel 7(?:\D|$)/}).click();await p.locator(".lyrik-lesson-steps button").nth(3).click();
  const ids=await p.locator(".lyrik-options button").evaluateAll(elements=>elements.map(element=>element.getAttribute("data-option-id")));
  if(ids.length)await p.locator(".lyrik-options button").first().click();
  const same=await p.locator(".lyrik-options button").evaluateAll(elements=>elements.map(element=>element.getAttribute("data-option-id")));
  report.sessions.push({session:session+1,taskId:await p.locator(".lyrik-task").getAttribute("data-task-id"),optionIds:ids,stable:JSON.stringify(ids)===JSON.stringify(same)});await context.close();
 }
 for(const [name,value] of [["invalid","not-json"],["partial",'{"version":1,"completedTogetherChapters":[6]}']]){
  const context=await browser.newContext();await context.addInitScript(([key,raw])=>localStorage.setItem(key,raw),["lyrik.learningProgress.v1",value]);const p=await context.newPage();await p.goto(`${base}/lyrik`,{waitUntil:"networkidle"});report.storage[name]=await p.getByRole("heading",{name:"Lyrikwerkstatt"}).isVisible();await context.close();
 }
 {const context=await browser.newContext();const p=await context.newPage();await p.goto(`${base}/lyrik`,{waitUntil:"networkidle"});await p.getByRole("button",{name:/Kapitel 1(?:\D|$)/}).click();report.storage.noSkipping=await p.locator(".lyrik-lesson-steps button").nth(5).isDisabled()&&!/✓/.test((await p.locator(".lyrik-lesson-steps button").nth(2).textContent())??"");await p.locator(".lyrik-lesson-steps button").nth(1).click();await p.locator(".lyrik-lesson-steps button").nth(0).click();report.storage.noFalseKnowledgeCheck=!/✓\s*Wissen/.test(await title(p.locator(".lyrik-lesson-steps button").nth(1)));await context.close();}
 {const context=await browser.newContext();const p=await context.newPage();await p.goto(`${base}/lyrik`,{waitUntil:"networkidle"});await p.getByRole("button",{name:/Kapitel 6(?:\D|$)/}).click();await p.locator(".lyrik-lesson-steps button").nth(1).click();await p.reload({waitUntil:"networkidle"});await p.getByRole("button",{name:/Kapitel 6(?:\D|$)/}).click();report.storage.introductionPersisted=/✓\s*Einführung/.test(await title(p.locator(".lyrik-lesson-steps button").nth(0)));await p.locator(".lyrik-lesson-steps button").nth(1).click();await p.locator(".lyrik-lesson-steps button").nth(2).click();await p.reload({waitUntil:"networkidle"});await p.getByRole("button",{name:/Kapitel 6(?:\D|$)/}).click();report.storage.knowledgePersisted=/✓\s*Wissen/.test(await title(p.locator(".lyrik-lesson-steps button").nth(1)));await context.close();}
 report.success=report.root&&report.introStanzaBoundary&&report.categories.length===10&&report.styleCardCount===52&&report.archiveGroups.length===12&&report.archiveArticles>0&&!report.emptyCardBacks.length&&!report.emptyArticles.length&&report.responsive.every(x=>x.scrollWidth<=x.clientWidth+1&&!x.clippedButtons)&&report.responsiveSurfaces.every(x=>x.scrollWidth<=x.clientWidth+1&&!x.clippedButtons)&&report.sessions.length===3&&report.sessions.every(x=>x.stable)&&report.storage.invalid&&report.storage.partial&&report.storage.noSkipping&&report.storage.noFalseKnowledgeCheck&&report.storage.introductionPersisted&&report.storage.knowledgePersisted&&!report.consoleErrors.length&&!report.requestErrors.length&&!report.httpErrors.length;
}catch(error){report.consoleErrors.push(`Audit abgebrochen: ${error}`);}
finally{await writeFile(new URL("../artifacts/lyrik-release-surfaces.json",import.meta.url),JSON.stringify(report,null,2));await browser.close();}
console.log(JSON.stringify({success:report.success,introStanzaBoundary:report.introStanzaBoundary,categories:report.categories.length,styleCards:report.styleCardCount,archiveGroups:report.archiveGroups.length,archiveArticles:report.archiveArticles,responsive:report.responsive,responsiveSurfaces:report.responsiveSurfaces,keyboard:report.keyboard,sessions:report.sessions.length,consoleErrors:report.consoleErrors,consoleWarnings:report.consoleWarnings,requestErrors:report.requestErrors,httpErrors:report.httpErrors},null,2));
if(!report.success)process.exitCode=1;
