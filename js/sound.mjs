// Synthesized UI blips: [start Hz, end Hz, seconds]. No audio files to load.
const SOUNDS = {
  tick: [1800, 1800, 0.04],
  open: [520, 880, 0.08],
  close: [760, 420, 0.07],
};

export function createSound(AudioContextCtor) {
  let enabled = false;
  let ctx = null;

  return {
    get enabled() { return enabled; },
    setEnabled(on) { enabled = on; },
    play(name) {
      const spec = SOUNDS[name];
      if (!enabled || !spec || !AudioContextCtor) return;
      try {
        ctx ??= new AudioContextCtor();
        // A context made before any user gesture starts suspended; resume once a click allows it.
        if (ctx.state === "suspended") ctx.resume?.().catch?.(() => {});
        const [from, to, dur] = spec;
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(from, t);
        osc.frequency.exponentialRampToValueAtTime(to, t + dur);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + dur);
      } catch {
        // Audio is decoration: a failure here must never block the click.
      }
    },
  };
}
