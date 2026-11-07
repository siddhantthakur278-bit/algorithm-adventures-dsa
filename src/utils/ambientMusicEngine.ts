// Web Audio API Procedural Lo-Fi & Retro Synth Music Generator
// 100% Client-side synthesized - Zero external audio files required!

export type AmbientMode = 'lofi' | 'chiptune' | 'cyberpunk' | 'rain';

class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentMode: AmbientMode = 'lofi';
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private volume: number = 0.25;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.ctx && !this.masterGain) {
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(32);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getMode(): AmbientMode {
    return this.currentMode;
  }

  public start(mode: AmbientMode = 'lofi') {
    this.stop();
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;
    this.currentMode = mode;

    if (mode === 'lofi') {
      this.playLoFiLoop();
    } else if (mode === 'chiptune') {
      this.playChiptuneLoop();
    } else if (mode === 'cyberpunk') {
      this.playCyberpunkLoop();
    } else if (mode === 'rain') {
      this.playRainLoop();
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  // --- LO-FI CHILL PIANO / CHORD SEQUENCE ---
  private playLoFiLoop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    // Jazzy Lo-Fi chords: Dm9 -> G13 -> Cmaj9 -> Am9 (frequencies in Hz)
    const chords = [
      [146.83, 220.0, 261.63, 329.63], // Dm9
      [196.0, 246.94, 329.63, 392.0],  // G13
      [130.81, 196.0, 246.94, 329.63], // Cmaj9
      [110.0, 164.81, 220.0, 261.63],  // Am9
    ];

    let chordIdx = 0;
    const playNextChord = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq, fIdx) => {
        const osc = this.ctx!.createOscillator();
        const filter = this.ctx!.createBiquadFilter();
        const gain = this.ctx!.createGain();

        // Warm sine / triangle with lowpass warmth
        osc.type = fIdx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Soft filter cutoff for vinyl lo-fi muffled texture
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800 + Math.random() * 200, now);

        // Soft ADSR envelope
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now);
        osc.stop(now + 2.9);
      });

      this.timerId = window.setTimeout(playNextChord, 2600);
    };

    playNextChord();
  }

  // --- 8-BIT RETRO CHIPTUNE SEQUENCE ---
  private playChiptuneLoop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    // Classic GameBoy pentatonic arpeggio sequence
    const melody = [
      261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 440.0, 392.0,
      293.66, 349.23, 440.0, 587.33, 440.0, 349.23, 523.25, 440.0,
    ];

    let step = 0;
    const playNote = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const freq = melody[step % melody.length];
      step++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.17);

      this.timerId = window.setTimeout(playNote, 180);
    };

    playNote();
  }

  // --- CYBERPUNK DARK SYNTH DRONE ---
  private playCyberpunkLoop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const baseFreqs = [55.0, 65.41, 73.42, 49.0]; // A1, C2, D2, G1
    let idx = 0;

    const playBassPulse = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const freq = baseFreqs[idx % baseFreqs.length];
      idx++;

      // Dual sawtooth with detuning
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(freq * 1.01, now); // slight detune

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.8);
      filter.frequency.exponentialRampToValueAtTime(300, now + 2.0);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 2.5);
      osc2.stop(now + 2.5);

      this.timerId = window.setTimeout(playBassPulse, 2200);
    };

    playBassPulse();
  }

  // --- DEEP FOCUS RAIN / NOISE ---
  private playRainLoop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink / Brown noise generation
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.15;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start();

      // Check loop state
      const checkLoop = () => {
        if (!this.isPlaying) {
          try {
            noise.stop();
          } catch {}
          return;
        }
        this.timerId = window.setTimeout(checkLoop, 1000);
      };
      checkLoop();
    } catch {
      // fallback
    }
  }
}

export const ambientRadio = new AmbientMusicEngine();
