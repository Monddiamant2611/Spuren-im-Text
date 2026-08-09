export type AudioCategory = "ambient" | "ui" | "success" | "error" | "transition" | "performance";

export class AudioManager {
  private musicEnabled = true;
  private effectsEnabled = true;
  private ambient: HTMLAudioElement | null = null;
  setEnabled(enabled: boolean) { this.setMusicEnabled(enabled); this.setEffectsEnabled(enabled); }
  setMusicEnabled(enabled: boolean) { this.musicEnabled = enabled; if (!enabled) this.stopAmbient(); }
  setEffectsEnabled(enabled: boolean) { this.effectsEnabled = enabled; }
  isEnabled(category?: AudioCategory) { return category === "ambient" ? this.musicEnabled : category ? this.effectsEnabled : this.musicEnabled || this.effectsEnabled; }
  play(category: AudioCategory, source?: string) {
    if (!this.isEnabled(category) || !source || typeof Audio === "undefined") return;
    if (category === "ambient") { this.stopAmbient(); this.ambient = new Audio(source); void this.ambient.play(); return; }
    void new Audio(source).play();
  }
  stopAmbient() { this.ambient?.pause(); this.ambient = null; }
}
