import { expect,test } from "@playwright/test";

const base={version:1,currentGame:"dramatik",completedChapters:[],competencies:{},failedAttempts:{},stagingDecisions:{},selectedEvidence:[],progress:{},theatreState:"INITIAL",settings:{music:false,soundEffects:false,reducedMotion:true},lastSavedAt:"2026-08-09T12:00:00.000Z"};
async function save(page:import("@playwright/test").Page,currentChapter:string,decisions:Record<string,unknown>,completedChapters:string[]=[]){await page.evaluate(({state})=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify(state)),{state:{...base,currentChapter,decisions,completedChapters}});await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click()}

test.beforeEach(async({page})=>{await page.goto("/dramatik");await page.evaluate(()=>localStorage.clear())});

test("neutral theatre reveals only the current image-based chapter access",async({page})=>{
 await page.getByRole("button",{name:"Spiel beginnen"}).click();
 await expect(page.locator(".theatre-main-background")).toHaveAttribute("src",/Theater_neutral_Hauptansicht/);
 await expect(page.locator(".theatre-access")).toHaveCount(1);
 await expect(page.locator(".theatre-access-image")).toHaveAttribute("src",/Kapitelzugang_1_Regiebuch/);
 await expect(page.getByRole("button",{name:/Kapitel 1 öffnen: Das zerrissene Regiebuch/})).toBeEnabled();
 await expect(page.locator(".theatre-access-label")).toHaveText(/Kapitel 1Das zerrissene RegiebuchJetzt betreten/);
});

test("completed access objects remain subdued while progression reveals the next chapter",async({page})=>{
 const state={...base,currentChapter:"chapter_02",completedChapters:["chapter_01","chapter_02"],decisions:{},theatreState:"AFTER_CHAPTER_2"};
 await page.evaluate(saved=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify(saved)),state);await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();
 await expect(page.locator(".theatre-access")).toHaveCount(3);
 await expect(page.locator(".theatre-access.completed")).toHaveCount(2);
 await expect(page.locator(".theatre-access.current")).toHaveCount(1);
 await expect(page.locator(".theatre-access.current .theatre-access-image")).toHaveAttribute("src",/Kapitelzugang_3_Archivtruhe/);
 await page.getByRole("button",{name:/Kapitel 1 öffnen: Das zerrissene Regiebuch/}).click();
 await expect(page.getByRole("heading",{name:"Das zerrissene Regiebuch"})).toBeVisible();
 await page.getByRole("button",{name:"← Theater"}).click();
 await expect(page.locator(".theatre-access.current")).toHaveCount(1);
});

test("chapter 1 shows and removes Balthasar while a failed image keeps the fallback",async({page})=>{
 await page.route(/Balthasar,%20ruhig\(1\)\.png$/,route=>route.abort());
 const chapter01={round:2,assignments:{},balthasarVisible:false,informationAssignments:{},regieChecks:[],completed:false,failedAttempts:0,competencyEvents:[]};
 await save(page,"chapter_01",{chapter_01:chapter01});
 await page.getByRole("button",{name:/Balthasar tritt auf/}).click();
 await expect(page.locator(".balthasar-slot")).toBeVisible();await expect(page.locator(".balthasar-slot").getByText("B",{exact:true})).toBeVisible();
 await page.getByRole("button",{name:/Balthasar ab/}).click();await expect(page.locator(".balthasar-slot")).toHaveCount(0);
});

test("chapter 3 uses urgent Balthasar and archive objects",async({page})=>{
 const chapter03={round:3,messageAssignments:{},knowledgeAssignments:{},foundClues:[],orderedEvents:[],causalConnections:[],roleAssignments:{},missingInformationSelected:false,audienceAssignments:{},claimAssignments:{},relevanceSelections:[],completed:false,failedAttempts:0,competencyEvents:[]};
 await save(page,"chapter_03",{chapter_03:chapter03},["chapter_01","chapter_02"]);
 await expect(page.locator(".archive-character img")).toHaveAttribute("src",/Balthasar, aufgeregt/);await expect(page.locator(".clue-grid button").first().locator("img")).toHaveCount(0);await expect(page.locator(".clue-grid button").first()).toContainText("Brief");
});

test("chapter 4 character image follows staging state and uses the tomb stage",async({page})=>{
 const common={round:9,perspectiveAssignments:{},goalEvidence:{},speechAssignments:{},orderedPhases:[],escalationSelections:[],languageFindings:[],rehearsalPlayed:false,rehearsalMoment:0,counterprobeActive:false,correctionUsed:false,directorErrorResolved:false,revisedRehearsalPlayed:false,completed:false,failedAttempts:0,competencyEvents:[]};
 const calm={...common,stagingDecisions:{romeo_attitude:{id:"romeo_attitude",dimension:"speech_attitude",characterId:"romeo",value:"kontrolliert",evidenceIds:[],reasoningId:"attitude_avoidance",kind:"optional_staging_choice"}}};
 await save(page,"chapter_04",{chapter_04:calm},["chapter_01","chapter_02","chapter_03"]);await expect(page.locator(".stage-figure.romeo img").first()).toHaveAttribute("src",/Romeo, ruhig/);await expect(page.locator(".rehearsal-stage>.asset-backdrop").first()).toHaveAttribute("src",/Bühne mit Gruftkulisse/);
 const angry={...calm,stagingDecisions:{...calm.stagingDecisions,romeo_attitude:{...calm.stagingDecisions.romeo_attitude,value:"aggressiv"}}};await page.evaluate(session=>{const state=JSON.parse(localStorage.getItem("lernwerkstatt-games:state:v1")!);state.decisions.chapter_04=session;localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify(state))},angry);await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await expect(page.locator(".stage-figure.romeo img").first()).toHaveAttribute("src",/Romeo, wütend/);
});

test("finale uses the restored theatre background",async({page})=>{const state={...base,currentChapter:"finale",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"],decisions:{},theatreState:"AFTER_CHAPTER_5"};await page.evaluate(saved=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify(saved)),state);await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await expect(page.locator(".finale-title>.asset-backdrop")).toHaveAttribute("src",/Finale helle/)});

for(const viewport of [{width:1920,height:1080},{width:1366,height:768},{width:1180,height:820},{width:1024,height:768},{width:390,height:844}])test(`production stage assets remain contained at ${viewport.width}x${viewport.height}`,async({page})=>{await page.setViewportSize(viewport);const session={round:9,perspectiveAssignments:{},goalEvidence:{},speechAssignments:{},orderedPhases:[],escalationSelections:[],languageFindings:[],stagingDecisions:{figure_distance:{id:"figure_distance",dimension:"distance",characterId:"both",value:"mittlere Distanz",evidenceIds:[],reasoningId:"distance_pressure",kind:"optional_staging_choice"}},rehearsalPlayed:false,rehearsalMoment:0,counterprobeActive:false,correctionUsed:false,directorErrorResolved:false,revisedRehearsalPlayed:false,completed:false,failedAttempts:0,competencyEvents:[]};await save(page,"chapter_04",{chapter_04:session},["chapter_01","chapter_02","chapter_03"]);const result=await page.locator(".rehearsal-stage").first().evaluate(stage=>{const box=stage.getBoundingClientRect();const images=[...stage.querySelectorAll("img")];return{overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,loaded:images.every(image=>image.naturalWidth>0),contained:images.filter(image=>image.classList.contains("character-image")).every(image=>{const rect=image.getBoundingClientRect();return rect.left>=box.left-1&&rect.right<=box.right+1&&rect.top>=box.top-1&&rect.bottom<=box.bottom+1})}});expect(result).toEqual({overflow:0,loaded:true,contained:true})});
