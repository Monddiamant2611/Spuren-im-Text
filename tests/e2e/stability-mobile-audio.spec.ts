import {expect,test} from "@playwright/test";

const chapterFiveSave={version:1,currentGame:"dramatik",currentChapter:"chapter_05",completedChapters:["chapter_01","chapter_02","chapter_03","chapter_04"],decisions:{},competencies:{},failedAttempts:{},stagingDecisions:{chapter_04:{}},selectedEvidence:[],progress:{},theatreState:"AFTER_CHAPTER_4",settings:{music:false,soundEffects:false,reducedMotion:true},lastSavedAt:"2026-01-01T00:00:00.000Z"};
const musicPaths=[
  "/assets/dramatik/audio/leberch-aesthetic-590427.mp3",
  "/assets/dramatik/audio/andriih-piano-piano-music-590655.mp3",
  "/assets/dramatik/audio/tech_oasis-operatic-music-whispers-of-the-night-20-213767.mp3",
  "/assets/dramatik/audio/tech_oasis-operatic-music-whispers-of-the-night-214572.mp3",
];

test("all four production music files are served as distinct MPEG audio assets",async({request})=>{
  const bodies:Buffer[]=[];
  for(const path of musicPaths){const response=await request.get(path);expect(response.status(),path).toBe(200);expect(response.headers()["content-type"],path).toContain("audio/mpeg");bodies.push(await response.body())}
  expect(new Set(bodies.map(body=>body.toString("base64").slice(0,256)+body.length)).size).toBe(4);
});

for(const viewport of [{width:1366,height:768},{width:1024,height:768},{width:768,height:1024},{width:390,height:844},{width:360,height:800}]){
  test(`all chapter 5 stations avoid document overflow and figure/workspace collisions at ${viewport.width}x${viewport.height}`,async({page})=>{
    await page.setViewportSize(viewport);
    for(let round=1;round<=18;round+=1){
      await page.goto(`/dramatik?review=1&step=chapter_05-round-${round}`);
      await expect(page.locator(".chapter05-workshop")).toBeVisible();
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1),`round ${round} document overflow`).toBe(true);
      const collision=await page.evaluate(()=>{
        const figures=document.querySelector<HTMLElement>(".chapter05-workshop .scene-characters");
        const workspace=document.querySelector<HTMLElement>(".chapter05-layout");
        if(!figures||!workspace)return false;
        const a=figures.getBoundingClientRect(),b=workspace.getBoundingClientRect();
        return a.bottom>b.top+1;
      });
      expect(collision,`round ${round} figures overlap the workspace`).toBe(false);
      const desk=page.locator(".chapter05-desk");
      await expect(desk).toBeVisible();
      const deskBox=await desk.boundingBox();
      expect(deskBox!.width,`round ${round} workspace width`).toBeGreaterThan(viewport.width<=390?300:500);
      if(viewport.width<=390){
        const shortButtons=await desk.locator("button:visible").evaluateAll(nodes=>nodes.filter(node=>node.getBoundingClientRect().height<43).length);
        expect(shortButtons,`round ${round} undersized touch targets`).toBe(0);
      }
    }
  });
}

test("long Juliette source keeps navigation while short Romeo source stays directly visible",async({page})=>{
  await page.goto("/dramatik?review=1&step=chapter_05-round-5");
  await expect(page.locator(".source-toggle")).toBeVisible();
  await expect(page.locator(".evidence-markers button")).toHaveCount(4);
  await page.goto("/dramatik?review=1&step=chapter_05-round-12");
  await expect(page.locator(".chapter05-source")).toBeVisible();
  await expect(page.locator(".source-toggle,.evidence-markers")).toHaveCount(0);
});

test("critical chapter 5 stations keep scene, heading, source and work area separated",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  for(const round of [5,6,9,12,13,18]){
    await page.goto(`/dramatik?review=1&step=chapter_05-round-${round}`);
    const parts=page.locator(".scene-characters,.chapter05-brief,.chapter05-desk");
    const boxes=(await parts.evaluateAll(elements=>elements.map(element=>{const r=element.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}}))).sort((a,b)=>a.y-b.y);
    for(let index=1;index<boxes.length;index+=1)expect(boxes[index-1].y+boxes[index-1].height,`round ${round} vertical separation`).toBeLessThanOrEqual(boxes[index].y+1);
  }
});

test("mobile smoke keeps representative game areas reachable without horizontal document overflow",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  for(const step of ["theatre-after-5","chapter_01-round-1","chapter_02-round-1","chapter_03-round-1","chapter_04-round-1","chapter_05-round-1","chapter_05-completion","finale-intro"]){
    await page.goto(`/dramatik?review=1&step=${step}`);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1),step).toBe(true);
  }
  await page.goto("/dramatik");
  await page.evaluate((state)=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify(state)),chapterFiveSave);
  await page.reload();
  for(const name of ["Optionen","Quellen"]){
    await page.getByRole("button",{name}).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1)).toBe(true);
    await page.getByRole("button",{name:"Fenster schließen"}).click();
  }
});

test("music follows the persisted setting and only starts after a user action",async({page})=>{
  await page.addInitScript(()=>{
    const log={plays:0,pauses:0,sources:[] as string[]};
    Object.defineProperty(window,"__musicLog",{value:log,writable:false});
    HTMLMediaElement.prototype.play=function(){log.plays+=1;log.sources.push((this as HTMLMediaElement).src);return Promise.resolve()};
    HTMLMediaElement.prototype.pause=function(){log.pauses+=1};
  });
  await page.goto("/dramatik");
  await page.evaluate((state)=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify(state)),chapterFiveSave);
  await page.reload();
  await page.getByRole("button",{name:"Fortsetzen"}).click();
  expect(await page.evaluate(()=>(window as unknown as {__musicLog:{plays:number}}).__musicLog.plays)).toBe(0);
  await page.getByRole("button",{name:"← Theater"}).click();
  await page.getByRole("button",{name:"Optionen"}).click();
  await page.getByLabel("Hintergrundmusik").check();
  expect(await page.evaluate(()=>(window as unknown as {__musicLog:{plays:number}}).__musicLog.plays)).toBe(1);
  await page.getByLabel("Hintergrundmusik").uncheck();
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem("lernwerkstatt-games:state:v1")!).settings.music)).toBe(false);
  await page.reload();
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem("lernwerkstatt-games:state:v1")!).settings.music)).toBe(false);
});

test("a rejected browser playback promise never becomes an application error",async({page})=>{
  const errors:string[]=[];page.on("pageerror",error=>errors.push(error.message));
  await page.addInitScript(()=>{HTMLMediaElement.prototype.play=()=>Promise.reject(new DOMException("blocked","NotAllowedError"));HTMLMediaElement.prototype.pause=()=>{}});
  await page.goto("/dramatik");
  await page.evaluate((state)=>localStorage.setItem("lernwerkstatt-games:state:v1",JSON.stringify({...state,settings:{...state.settings,music:true}})),chapterFiveSave);
  await page.reload();await page.getByRole("button",{name:"Fortsetzen"}).click();await page.waitForTimeout(50);
  expect(errors).toEqual([]);
});

test("real audio elements play quietly, pause, resume and cycle without chapter restarts",async({page})=>{
  const errors:string[]=[];page.on("pageerror",error=>errors.push(error.message));
  await page.addInitScript(()=>{
    const NativeAudio=window.Audio;
    const created:HTMLAudioElement[]=[];
    Object.defineProperty(window,"__realAudios",{value:created});
    window.Audio=(function(source?:string){const audio=new NativeAudio(source);created.push(audio);return audio} as unknown) as typeof Audio;
  });
  await page.goto("/dramatik");await page.evaluate(()=>localStorage.clear());await page.reload();await page.getByRole("button",{name:"Spiel beginnen"}).click();
  await expect.poll(()=>page.evaluate(()=>(window as unknown as {__realAudios:HTMLAudioElement[]}).__realAudios.length)).toBe(1);
  const first=await page.evaluate(() => {const audio=(window as unknown as {__realAudios:HTMLAudioElement[]}).__realAudios[0];return{src:new URL(audio.src).pathname,volume:audio.volume,paused:audio.paused,readyState:audio.readyState}});
  expect(first.src).toBe(musicPaths[0]);expect(first.volume).toBe(.15);expect(first.paused).toBe(false);expect(first.readyState).toBeGreaterThan(0);await expect.poll(()=>page.evaluate(()=>(window as unknown as {__realAudios:HTMLAudioElement[]}).__realAudios[0].currentTime)).toBeGreaterThan(0);
  await page.getByRole("button",{name:"Optionen"}).click();await page.getByLabel("Hintergrundmusik").uncheck();
  await expect.poll(()=>page.evaluate(()=>(window as unknown as {__realAudios:HTMLAudioElement[]}).__realAudios[0].paused)).toBe(true);
  await page.getByLabel("Hintergrundmusik").check();await expect.poll(()=>page.evaluate(()=>(window as unknown as {__realAudios:HTMLAudioElement[]}).__realAudios.length)).toBe(2);
  await page.getByRole("button",{name:"Fenster schließen"}).click();const beforeChapter=await page.evaluate(()=>(window as unknown as {__realAudios:HTMLAudioElement[]}).__realAudios.length);await page.getByRole("button",{name:/Regiepult: verfügbar/}).click();await expect(page.getByRole("heading",{name:"Das zerrissene Regiebuch"})).toBeVisible();expect(await page.evaluate(()=>(window as unknown as {__realAudios:HTMLAudioElement[]}).__realAudios.length)).toBe(beforeChapter);
  await page.getByRole("button",{name:"← Theater"}).click();await page.getByRole("button",{name:"Optionen"}).click();await page.getByRole("button",{name:"Prüfmodus",exact:true}).click();const beforeReview=await page.evaluate(()=>(window as unknown as {__realAudios:HTMLAudioElement[]}).__realAudios.length);await page.getByRole("button",{name:"Nächster Schritt →"}).click();expect(await page.evaluate(()=>(window as unknown as {__realAudios:HTMLAudioElement[]}).__realAudios.length)).toBe(beforeReview);
  for(let index=1;index<=4;index+=1){await page.evaluate(()=>{const audios=(window as unknown as {__realAudios:HTMLAudioElement[]}).__realAudios;audios[audios.length-1].dispatchEvent(new Event("ended"))});await expect.poll(()=>page.evaluate(()=>(window as unknown as {__realAudios:HTMLAudioElement[]}).__realAudios.length)).toBe(beforeChapter+index)}
  const cycled=await page.evaluate(()=>(window as unknown as {__realAudios:HTMLAudioElement[]}).__realAudios.slice(-4).map(audio=>new URL(audio.src).pathname));expect(cycled).toEqual([musicPaths[1],musicPaths[2],musicPaths[3],musicPaths[0]]);expect(errors).toEqual([]);
});
