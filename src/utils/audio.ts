/**
 * Web Audio API synthesizer for Rajasthani Royal Ambience & Folk Harmonics.
 * Generates continuous Tanpura drone (Sa-Pa resonance in D) and chime responses
 * in authentic Raag Mand without external audio files.
 */

class FolkAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private droneGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();
  }

  public toggleMute(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx?.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startDrone();
    } else {
      this.stopDrone();
    }

    return !this.isMuted;
  }

  public getMutedStatus(): boolean {
    return this.isMuted;
  }

  private startDrone() {
    if (!this.ctx) return;
    this.stopDrone();

    const master = this.ctx.createGain();
    master.gain.setValueAtTime(0.001, this.ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 2.5);
    master.connect(this.ctx.destination);
    this.droneGain = master;

    // Filter to give that warm, hollow resonance of a pumpkin gourd Tanpura
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.5, this.ctx.currentTime);
    filter.connect(master);
    this.filter = filter;

    // Rajasthani Tanpura tuning: Pa (fifth), Sa (tonic middle), Sa (tonic middle), Kharaj Sa (low tonic)
    // Base frequency ~ 146.83 Hz (D3)
    const baseFreq = 146.83;
    const frequencies = [
      baseFreq * 1.5, // Pa (A3, ~220Hz)
      baseFreq,       // Sa (D3, ~146.8Hz)
      baseFreq,       // Sa (D3, ~146.8Hz)
      baseFreq * 0.5, // Kharaj Sa (D2, ~73.4Hz)
      baseFreq * 2.0, // High shimmer harmonic
    ];

    frequencies.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      // Soft saw/triangle blend for rich wooden acoustic overtones
      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.4, this.ctx.currentTime);

      // Low frequency modulation for the iconic gentle "Javari" cotton thread buzzing of Tanpura
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.2 + idx * 0.08, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      lfo.connect(lfoGain.gain);

      oscGain.gain.setValueAtTime(0.06 / (idx + 1), this.ctx.currentTime);
      osc.connect(oscGain);
      if (this.filter) {
        oscGain.connect(this.filter);
      } else {
        oscGain.connect(master);
      }

      osc.start();
      lfo.start();
      this.oscillators.push(osc);
    });
  }

  private stopDrone() {
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, this.ctx.currentTime);
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
      setTimeout(() => {
        this.oscillators.forEach(o => {
          try { o.stop(); } catch { /* ignore */ }
        });
        this.oscillators = [];
      }, 700);
    }
  }

  /**
   * Play an authentic Raag Mand note when interacting with the particle cloud or UI buttons.
   * Notes: 0 = Sa, 1 = Re, 2 = Ga, 3 = Ma, 4 = Pa, 5 = Dha, 6 = Ni, 7 = High Sa
   */
  public playNote(noteIndex = 0, velocity = 0.5) {
    if (this.isMuted || !this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const base = 293.66; // D4
    // Ratios of Raag Mand (Bilas / Mand scale)
    const ratios = [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2];
    const freq = base * (ratios[noteIndex % ratios.length] || 1);

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm pluck envelope resembling a Sarangi / Sitar chime
    const vol = Math.min(0.25, Math.max(0.02, velocity * 0.15));
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.3);
  }

  /**
   * Shimmering harp/glass chime when activating the Glass AI button
   */
  public playBurstChord() {
    if (this.isMuted || !this.ctx) return;
    [0, 2, 4, 7].forEach((note, i) => {
      setTimeout(() => {
        this.playNote(note, 0.7);
      }, i * 75);
    });
  }
}

export const folkAudio = new FolkAudioEngine();
