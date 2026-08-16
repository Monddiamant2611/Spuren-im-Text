import { expect, test } from "@playwright/test";

const key="lernwerkstatt-games:state:v1";
const decision=(id:string,dimension:string,value:string,reasoningId:string)=>({id,dimension,characterId:"both",value,evidenceIds:["c04_romeo_warning"],reasoningId,kind:"optional_staging_choice"});
const variantA={
 figure_distance:decision("figure_distance","distance","große Distanz","distance_avoidance"),
 romeo_attitude:decision("romeo_attitude","speech_attitude","kontrolliert","attitude_avoidance"),
 romeo_facing:decision("romeo_facing","facing","Blick zur Gruft","facing_dead"),
 figure_movement:decision("figure_movement","movement","statisch","movement_distance"),
 pre_fight_pause:decision("pre_fight_pause","pause","unmittelbar sprechen","pause_urgency"),
 stage_lighting:decision("stage_lighting","lighting","gleichmäßiges Bühnenlicht","light_clarity"),
};
const variantB={
 figure_distance:decision("figure_distance","distance","geringe Distanz","distance_pressure"),
 romeo_attitude:decision("romeo_attitude","speech_attitude","angespannt","attitude_tension"),
 romeo_facing:decision("romeo_facing","facing","direkter Blickkontakt","facing_conflict"),
 figure_movement:decision("figure_movement","movement","abrupte Bewegung","movement_escalation"),
 pre_fight_pause:decision("pre_fight_pause","pause","längere spannungssteigernde Pause","pause_tension"),
 stage_lighting:decision("stage_lighting","lighting","enger Fokus","light_conflict"),
};
function state(staging=variantA,patch:Record<string,unknown>={}){return{version:1,currentGame:"dramatik",currentChapter:"finale",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04","chapter_05"],decisions:{chapter_05:{hypothesisRefined:true,relevanceAssignments:{analysis_paris_arrest:"high_relevance"},argumentOrder:[]}},competencies:{evidence_reasoning:{value:5,level:"advanced"},staging_reasoning:{value:4,level:"secure"}},failedAttempts:{},stagingDecisions:{chapter_04:staging},selectedEvidence:[],progress:{finale_ready:true},theatreState:"AFTER_CHAPTER_5",settings:{music:false,soundEffects:false,reducedMotion:false},lastSavedAt:new Date().toISOString(),finaleStarted:false,finaleCompleted:false,gameCompleted:false,performanceState:"NOT_STARTED",currentPerformanceMoment:0,finalStaging:{},finalHypothesis:null,visibleCompetencyResults:{},...patch}}
async function seed(page:import("@playwright/test").Page,value:ReturnType<typeof state>){await page.goto("/dramatik");await page.evaluate(({key,value})=>localStorage.setItem(key,JSON.stringify(value)),{key,value});await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click()}

test("two stored stagings visibly differ while their protected source text remains identical",async({page})=>{
 await seed(page,state(variantA));await page.getByRole("button",{name:"Aufführung beginnen"}).click();const stageA=page.locator(".performance-stage");await expect(stageA).toHaveClass(/distance-large/);await expect(stageA).toHaveClass(/light-even/);await expect(page.locator(".performance-figure.romeo")).toHaveClass(/facing-tomb/);const textA=await page.locator(".performance-text p").textContent();
 await seed(page,state(variantB));await page.getByRole("button",{name:"Aufführung beginnen"}).click();const stageB=page.locator(".performance-stage");await expect(stageB).toHaveClass(/distance-close/);await expect(stageB).toHaveClass(/light-focus/);await expect(page.locator(".performance-figure.romeo")).toHaveClass(/facing-paris/);await expect(page.locator(".performance-figure.romeo img")).toHaveAttribute("src",/Romeo, nachdenklich/);expect(await page.locator(".performance-text p").textContent()).toBe(textA);await page.getByRole("button",{name:"Weiter"}).click();await page.getByRole("button",{name:"Weiter"}).click();await expect(stageB).toHaveClass(/movement-abrupt/);
});

test("chapter 5 revision overrides chapter 4 in performance and director book",async({page})=>{
 const revision=decision("figure_distance","distance","mittlere Distanz","distance_pressure");const saved=state(variantA,{stagingDecisions:{chapter_04:variantA,chapter_05_revision:revision}});await seed(page,saved);await page.getByRole("button",{name:"Aufführung beginnen"}).click();await expect(page.locator(".performance-stage")).toHaveClass(/distance-medium/);
});

test("performance cursor survives reload and staging pause changes progression timing",async({page})=>{
 await seed(page,state(variantB,{finaleStarted:true,performanceState:"PERFORMANCE_RUNNING",theatreState:"PERFORMANCE_RUNNING",currentPerformanceMoment:5}));await expect(page.getByText("Abschnitt 6 von 7")).toBeVisible();const next=page.getByRole("button",{name:/Pause|Weiter/});await expect(next).toBeDisabled();await expect(next).toBeEnabled({timeout:2500});await next.click();await expect(page.getByText("Abschnitt 7 von 7")).toBeVisible();await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await expect(page.getByText("Abschnitt 7 von 7")).toBeVisible();
});

test("director book prints core information and exposes readable player choices",async({page})=>{
 const saved=state(variantB,{finaleStarted:true,finaleCompleted:true,gameCompleted:true,performanceState:"PERFORMANCE_COMPLETE",theatreState:"PERFORMANCE_COMPLETE",finalStaging:variantB,finalHypothesis:"Gespeicherte Deutung"});await seed(page,saved);await expect(page.getByRole("heading",{name:"Kompetenzübersicht"})).toBeVisible();await expect(page.getByText("geringe Distanz")).toBeVisible();await expect(page.getByText("macht die zunehmende Bedrängung und Eskalation sichtbar")).toBeVisible();await expect(page.locator(".own-staging")).not.toContainText("distance_pressure");await page.emulateMedia({media:"print"});await expect(page.getByRole("heading",{name:"Die letzte Aufführung"})).toBeVisible();await expect(page.getByRole("heading",{name:"Kompetenzübersicht"})).toBeVisible();await expect(page.getByRole("heading",{name:"Deutungshypothese"})).toBeVisible();await expect(page.getByRole("heading",{name:"Endgültige Regieentscheidungen"})).toBeVisible();await expect(page.getByRole("heading",{name:"Textgrundlage"})).toBeVisible();await expect(page.getByRole("navigation",{name:"Regiebuch-Aktionen"})).toBeHidden();
});
