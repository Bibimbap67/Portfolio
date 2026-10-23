// Rotation in degrees for each clock hand; the hour hand drifts with the minutes, the minute hand with the seconds.
export function clockAngles(date) {
  const m = date.getMinutes() + date.getSeconds() / 60;
  const h = (date.getHours() % 12) + m / 60;
  return { h: h * 30, m: m * 6, s: date.getSeconds() * 6 };
}

export function calendarFace(date) {
  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "long" }),
    day: date.getDate(),
    month: date.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  };
}

// Wires the desktop widgets: a live analog clock and calendar.
export function initWidgets(root) {
  const $ = (s) => root.querySelector(s);
  const hands = ["h", "m", "s"].map((k) => [k, $(`[data-hand=${k}]`)]);
  const [weekday, day, month] = ["weekday", "day", "month"].map((k) => $(`[data-cal=${k}]`));

  function tick() {
    const now = new Date();
    const a = clockAngles(now);
    for (const [k, el] of hands) el.setAttribute("transform", `rotate(${a[k]} 50 50)`);
    const face = calendarFace(now);
    weekday.textContent = face.weekday;
    day.textContent = face.day;
    month.textContent = face.month;
  }
  tick();
  setInterval(tick, 1000);
}
