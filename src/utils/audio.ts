// Pure Web Audio API Sound Effects & Ambient Synthesizer

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play a cute pop sound when clicking buttons
export function playPopSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.debug('Audio play failed:', e);
  }
}

// Play a celebratory sparkle chime when clicking YES or opening gifts
export function playChimeSound() {
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
      
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.45);
    });
  } catch (e) {
    console.debug('Chime failed:', e);
  }
}

// Play a playful boing/dodge sound when NO button escapes
export function playDodgeSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    console.debug('Dodge sound failed:', e);
  }
}

// ---------------------------------------------------------------------------
// Background music: "music1"
// Looks for a real music1.(mp3|wav|ogg|m4a) file in src/assets/music/.
// If it exists, plays it on loop. If it doesn't exist yet, falls back to the
// synth chord-progression melody below so the toggle still works.
// ---------------------------------------------------------------------------

const musicModules = import.meta.glob('../assets/music/music1.{mp3,wav,ogg,m4a}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const music1Url = Object.values(musicModules)[0] || null;

let bgAudioEl: HTMLAudioElement | null = null;

function getBgAudioEl(): HTMLAudioElement {
  if (!bgAudioEl && music1Url) {
    bgAudioEl = new Audio(music1Url);
    bgAudioEl.loop = true;
    bgAudioEl.volume = 0.5;
  }
  return bgAudioEl as HTMLAudioElement;
}

// Romantic Background Synth Loop (fallback when music1 isn't available)
let bgMelodyInterval: number | null = null;
let isMelodyPlaying = false;

export function toggleRomanticMelody(onStateChange?: (playing: boolean) => void): boolean {
  if (isMelodyPlaying) {
    stopRomanticMelody();
    onStateChange?.(false);
    return false;
  } else {
    startRomanticMelody();
    onStateChange?.(true);
    return true;
  }
}

export function startRomanticMelody() {
  if (isMelodyPlaying) return;
  isMelodyPlaying = true;

  // Prefer the real music1 file if it's been added
  if (music1Url) {
    try {
      const el = getBgAudioEl();
      el.currentTime = 0;
      el.play().catch((e) => console.debug('music1 play failed:', e));
    } catch (e) {
      console.debug('music1 setup failed:', e);
    }
    return;
  }

  // Fallback: synth chord progression
  try {
    const ctx = getAudioContext();

    // Soothing warm chord progression (Fmaj7 - Cmaj7 - Am7 - G)
    const chords = [
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [196.00, 246.94, 293.66, 392.00], // G
    ];

    let chordIdx = 0;

    const playChordStep = () => {
      if (!isMelodyPlaying) return;
      const chord = chords[chordIdx % chords.length];
      chordIdx++;

      chord.forEach((freq, noteIdx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + noteIdx * 0.15);

        gain.gain.setValueAtTime(0, ctx.currentTime + noteIdx * 0.15);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + noteIdx * 0.15 + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + noteIdx * 0.15 + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + noteIdx * 0.15);
        osc.stop(ctx.currentTime + noteIdx * 0.15 + 2.6);
      });
    };

    playChordStep();
    bgMelodyInterval = window.setInterval(playChordStep, 3200);
  } catch (e) {
    console.debug('Melody failed:', e);
  }
}

export function stopRomanticMelody() {
  isMelodyPlaying = false;

  if (bgAudioEl) {
    bgAudioEl.pause();
  }

  if (bgMelodyInterval !== null) {
    clearInterval(bgMelodyInterval);
    bgMelodyInterval = null;
  }
}

export function getMelodyStatus() {
  return isMelodyPlaying;
}

// --- add these near the bg audio section ---

export function getBgAudioTime(): { currentTime: number; duration: number } {
  if (bgAudioEl && music1Url) {
    return {
      currentTime: bgAudioEl.currentTime || 0,
      duration: bgAudioEl.duration || 0,
    };
  }
  return { currentTime: 0, duration: 0 };
}

export function seekBgAudio(time: number) {
  if (bgAudioEl && music1Url) {
    bgAudioEl.currentTime = time;
  }
}

export function hasRealMusicTrack(): boolean {
  return !!music1Url;
}