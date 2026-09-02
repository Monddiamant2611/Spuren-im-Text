export type AudioCategory = "ambient" | "ui" | "success" | "error" | "transition" | "performance";

export const DRAMATIK_MUSIC_TRACKS = [
  "/assets/dramatik/audio/leberch-aesthetic-590427.mp3",
  "/assets/dramatik/audio/andriih-piano-piano-music-590655.mp3",
  "/assets/dramatik/audio/tech_oasis-operatic-music-whispers-of-the-night-20-213767.mp3",
  "/assets/dramatik/audio/tech_oasis-operatic-music-whispers-of-the-night-214572.mp3",
] as const;

type AudioFactory = (source:string)=>HTMLAudioElement;

export class AudioManager {
  private musicEnabled = true;
  private effectsEnabled = true;
  private ambient: HTMLAudioElement | null = null;
  private trackIndex = 0;
  constructor(private readonly tracks:readonly string[]=DRAMATIK_MUSIC_TRACKS,private readonly createAudio:AudioFactory=(source)=>new Audio(source)) {}
  setEnabled(enabled: boolean) { this.setMusicEnabled(enabled); this.setEffectsEnabled(enabled); }
  setMusicEnabled(enabled: boolean) { this.musicEnabled = enabled; if (!enabled) this.stopAmbient(); }
  setEffectsEnabled(enabled: boolean) { this.effectsEnabled = enabled; }
  isEnabled(category?: AudioCategory) { return category === "ambient" ? this.musicEnabled : category ? this.effectsEnabled : this.musicEnabled || this.effectsEnabled; }
  startMusic() {
    if (!this.musicEnabled || this.ambient || !this.tracks.length) return;
    const next=this.createAudio(this.tracks[this.trackIndex]);next.volume=.15;next.preload="auto";
    next.addEventListener("ended",()=>{if(this.ambient!==next)return;this.ambient=null;this.trackIndex=(this.trackIndex+1)%this.tracks.length;this.startMusic()},{once:true});
    next.addEventListener("error",()=>{if(this.ambient===next)this.ambient=null},{once:true});
    this.ambient=next;void next.play().catch(()=>{if(this.ambient===next){next.pause();this.ambient=null}});
  }
  play(category: AudioCategory, source?: string) {
    if (!this.isEnabled(category) || !source || typeof Audio === "undefined") return;
    if (category === "ambient") { this.stopAmbient(); this.ambient = this.createAudio(source);this.ambient.volume=.15;void this.ambient.play().catch(()=>{this.ambient=null});return; }
    void this.createAudio(source).play().catch(()=>{});
  }
  stopAmbient() { this.ambient?.pause(); this.ambient = null; }
}
