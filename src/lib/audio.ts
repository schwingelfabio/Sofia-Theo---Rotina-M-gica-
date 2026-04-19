let audioCtx: AudioContext | null = null;

export const initAudio = () => {
  if (typeof window !== 'undefined' && !audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

const playTone = (freq: number, type: OscillatorType, duration: number, vol = 0.1, slideDown = false) => {
  initAudio();
  if (!audioCtx) return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = type;
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  if (slideDown) {
    osc.frequency.exponentialRampToValueAtTime(freq / 2, audioCtx.currentTime + duration);
  }
  
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
};

export const playClick = () => {
  playTone(400, 'sine', 0.08, 0.05, true);
};

export const playStarTap = () => {
  playTone(800, 'triangle', 0.15, 0.08);
};

export const playSuccess = () => {
  // Arpeggio C5, E5, G5, C6
  setTimeout(() => playTone(523.25, 'sine', 0.3, 0.05), 0);
  setTimeout(() => playTone(659.25, 'sine', 0.3, 0.05), 100);
  setTimeout(() => playTone(783.99, 'sine', 0.4, 0.08), 200);
  setTimeout(() => playTone(1046.50, 'sine', 0.5, 0.15), 300);
};

export const playUnlock = () => {
  // Magical sparkle
  setTimeout(() => playTone(880, 'sine', 0.2, 0.05), 0);
  setTimeout(() => playTone(1108.73, 'sine', 0.2, 0.05), 80);
  setTimeout(() => playTone(1318.51, 'sine', 0.2, 0.05), 160);
  setTimeout(() => playTone(1760, 'sine', 0.4, 0.2), 240);
};
