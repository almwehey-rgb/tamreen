let ctx = null;

function getCtx() {
  if (!ctx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioCtx();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(time, freq, duration, gainPeak, type = "sine") {
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, time);
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(gainPeak, time + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(time);
  osc.stop(time + duration + 0.02);
}

export function playSpinTicks(totalDurationSec, tickCount = 26) {
  const c = getCtx();
  const start = c.currentTime + 0.02;
  for (let i = 0; i < tickCount; i++) {
    const progress = i / (tickCount - 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const time = start + eased * totalDurationSec;
    tone(time, 900 - progress * 260, 0.045, 0.05, "square");
  }
}

export function playWinChime() {
  const c = getCtx();
  const start = c.currentTime + 0.02;
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    tone(start + i * 0.1, freq, 0.32, 0.09, "triangle");
  });
}
