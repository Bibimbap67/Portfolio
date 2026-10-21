// Card tilt for a pointer at (x, y), each 0..1 from the card's top-left. `max` is the tilt in degrees at the edges;
// `sx` (-0.5..0.5) slides the sheen across the card.
export function tiltAngles(x, y, max = 8) {
  const cx = Math.min(1, Math.max(0, x)) - 0.5;
  const cy = Math.min(1, Math.max(0, y)) - 0.5;
  return { rx: -cy * 2 * max + 0, ry: cx * 2 * max, sx: cx };
}

// Wires the tilt onto `stage`, updating CSS variables on `card`; does nothing under reduced motion.
export function initTilt(stage, card) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  stage.addEventListener("pointermove", (e) => {
    const r = stage.getBoundingClientRect();
    const t = tiltAngles((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height);
    card.style.setProperty("--rx", `${t.rx}deg`);
    card.style.setProperty("--ry", `${t.ry}deg`);
    card.style.setProperty("--sx", t.sx);
  });
  stage.addEventListener("pointerleave", () => {
    for (const v of ["--rx", "--ry", "--sx"]) card.style.removeProperty(v);
  });
}
