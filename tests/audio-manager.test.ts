import {describe,expect,it,vi} from "vitest";
import {AudioManager,DRAMATIK_MUSIC_TRACKS} from "../src/core/audio/AudioManager";

class FakeAudio {
  volume=1;preload="";paused=false;
  listeners=new Map<string,()=>void>();
  play=vi.fn(()=>Promise.resolve());
  pause=vi.fn(()=>{this.paused=true});
  addEventListener(type:string,listener:()=>void){this.listeners.set(type,listener)}
  emit(type:string){this.listeners.get(type)?.()}
}

const factory=()=>{const created:FakeAudio[]=[];const sources:string[]=[];return{created,sources,make:(source:string)=>{sources.push(source);const audio=new FakeAudio();created.push(audio);return audio as unknown as HTMLAudioElement}}};

describe("dramatik background music",()=>{
  it("contains four distinct tracks and excludes the duplicate copy",()=>{expect(DRAMATIK_MUSIC_TRACKS).toHaveLength(4);expect(new Set(DRAMATIK_MUSIC_TRACKS).size).toBe(4);expect(DRAMATIK_MUSIC_TRACKS.join(" ")).not.toContain("(1)")});
  it("does not start while music is disabled",()=>{const f=factory(),manager=new AudioManager(DRAMATIK_MUSIC_TRACKS,f.make);manager.setMusicEnabled(false);manager.startMusic();expect(f.created).toHaveLength(0)});
  it("starts quietly after activation, pauses immediately and can restart",()=>{const f=factory(),manager=new AudioManager(DRAMATIK_MUSIC_TRACKS,f.make);manager.startMusic();expect(f.created[0].play).toHaveBeenCalledOnce();expect(f.created[0].volume).toBe(.15);manager.setMusicEnabled(false);expect(f.created[0].pause).toHaveBeenCalledOnce();manager.setMusicEnabled(true);manager.startMusic();expect(f.created).toHaveLength(2)});
  it("advances cyclically after a track ends",()=>{const f=factory(),manager=new AudioManager(DRAMATIK_MUSIC_TRACKS,f.make);manager.startMusic();f.created[0].emit("ended");expect(f.sources.slice(0,2)).toEqual(DRAMATIK_MUSIC_TRACKS.slice(0,2))});
  it("handles rejected playback and missing files without an unhandled error",async()=>{const f=factory(),manager=new AudioManager(DRAMATIK_MUSIC_TRACKS,f.make);f.make=(source:string)=>{const audio=new FakeAudio();audio.play=vi.fn(()=>Promise.reject(new DOMException("blocked","NotAllowedError")));f.sources.push(source);f.created.push(audio);return audio as unknown as HTMLAudioElement};const rejecting=new AudioManager(DRAMATIK_MUSIC_TRACKS,f.make);expect(()=>rejecting.startMusic()).not.toThrow();await Promise.resolve();expect(f.created[0].pause).toHaveBeenCalledOnce();expect(()=>f.created[0].emit("error")).not.toThrow();expect(manager).toBeDefined()});
});
