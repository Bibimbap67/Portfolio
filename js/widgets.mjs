// Rotation in degrees for each clock hand; the hour hand drifts with the minutes, the minute hand with the seconds.
export function clockAngles(date) {
  const m = date.getMinutes() + date.getSeconds() / 60;
  const h = (date.getHours() % 12) + m / 60;
  return { h: h * 30, m: m * 6, s: date.getSeconds() * 6 };
}

// Wires the desktop widgets: a live analog clock.
export function initWidgets(root) {
  const hands = ["h", "m", "s"].map((k) => [k, root.querySelector(`[data-hand=${k}]`)]);

  function tick() {
    const a = clockAngles(new Date());
    for (const [k, el] of hands) el.setAttribute("transform", `rotate(${a[k]} 50 50)`);
  }
  tick();
  setInterval(tick, 1000);
}
