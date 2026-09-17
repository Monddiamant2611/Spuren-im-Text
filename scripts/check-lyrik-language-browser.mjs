import {chromium} from "@playwright/test";
import {mkdir,writeFile} from "node:fs/promises";

const browser=await chromium.launch({headless:true});
const page=await browser.newPage();
const report={chapters:[],kartei:null,archive:null,training:null,consoleErrors:[],requestErrors:[],success:false};
page.on("console",message=>{if(message.type()==="error")report.consoleErrors.push(message.text());});
page.on("pageerror",error=>report.consoleErrors.push(error.message));
page.on("requestfailed",request=>report.requestErrors.push(`${request.url()} ${request.failure()?.errorText??""}`));
const text=async locator=>(await locator.textContent()??"").trim();
try{
 await page.goto(process.argv[2]??"http://127.0.0.1:4186/lyrik",{waitUntil:"networkidle"});
 for(const chapter of [1,3,5,6,7,9]){
  await page.getByRole("button",{name:new RegExp(`Kapitel ${chapter}(?:\\D|$)`)}).click();
  const item={chapter,introduction:await text(page.locator(".lyrik-lesson").first()),knowledgeCards:0,knowledgeExample:"",guidedPrompt:"",practicePrompt:"",challengePrompt:"",transferPrompt:""};
  await page.locator(".lyrik-lesson-steps button").nth(1).click();
  item.knowledgeCards=await page.locator(".lyrik-knowledge-grid h3").count();
  item.knowledgeExample=await text(page.locator(".lyrik-knowledge-grid").first());
  await page.locator(".lyrik-lesson-steps button").nth(2).click();item.guidedPrompt=await text(page.locator(".lyrik-guided .lyrik-instruction").first());
  await page.locator(".lyrik-lesson-steps button").nth(3).click();item.practicePrompt=await text(page.locator(".lyrik-task h3").first());
  await page.locator(".lyrik-lesson-steps button").nth(4).click();item.challengePrompt=await text(page.locator(".lyrik-task h3").first());
  await page.locator(".lyrik-lesson-steps button").nth(5).click();item.transferPrompt=await text(page.locator(".lyrik-task h3").first());
  report.chapters.push(item);
  await page.getByRole("button",{name:/Dein Lernpfad/}).click();
 }
 await page.getByRole("button",{name:"Kartei",exact:true}).click();
 await page.locator(".lyrik-category-grid button").first().click();
 await page.getByRole("button",{name:"Umdrehen"}).first().click();
 report.kartei=await text(page.locator(".lyrik-flashcard").first());
 await page.getByRole("button",{name:"Wissensarchiv",exact:true}).click();
 await page.locator(".lyrik-archive-index summary").first().click();
 await page.locator(".lyrik-archive-index details button").first().click();
 report.archive=await text(page.locator(".lyrik-detail"));
 await page.getByRole("button",{name:"Training",exact:true}).click();
 await page.locator(".lyrik-training-grid button").first().click();
 report.training=await text(page.locator(".lyrik-task h3").first());
 report.success=report.chapters.length===6&&report.chapters.every(item=>item.introduction&&item.knowledgeCards>0&&item.guidedPrompt&&item.practicePrompt&&item.challengePrompt&&item.transferPrompt)&&!!report.kartei&&!!report.archive&&!!report.training&&!report.consoleErrors.length&&!report.requestErrors.length;
}catch(error){report.consoleErrors.push(`Browserstichprobe abgebrochen: ${error}`);}
finally{const directory=new URL("../artifacts/",import.meta.url);await mkdir(directory,{recursive:true});await writeFile(new URL("lyrik-language-browser-sample.json",directory),JSON.stringify(report,null,2));await browser.close();}
console.log(JSON.stringify({success:report.success,chapters:report.chapters.length,kartei:!!report.kartei,archive:!!report.archive,training:!!report.training,consoleErrors:report.consoleErrors.length,requestErrors:report.requestErrors.length},null,2));
if(!report.success)process.exitCode=1;
