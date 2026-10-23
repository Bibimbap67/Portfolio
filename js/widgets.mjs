import { artUrl, formatTime } from "./music.mjs";

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

export function timeLeft(position, duration) {
  return `-${formatTime(Math.max(0, duration - position))}`;
}

// Wires the desktop widgets: a live clock and calendar, and a now-playing card that mirrors the Music player.
export function initWidgets(root, { openMusic }) {
  const $ = (s) => root.querySelector(s);
  const hands = ["h", "m", "s"].map((k) => [k, $(`[data-hand=${k}]`)]);
  const [weekday, day, month] = ["weekday", "day", "month"].map((k) => $(`[data-cal=${k}]`));
  const card = $(".wgt--music");
  const [title, artist, bar, timeNow, left] = [".wgt__title", ".wgt__artist", ".wgt__bar i", ".wgt__now", ".wgt__left"].map($);
  let hasTrack = false;

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

  // The card's buttons press the Music window's own, so shuffle, repeat and auto-advance keep working.
  const press = (ctl) => document.querySelector(ctl === "pp" ? ".music__pp" : `.music__now [data-ctl="${ctl}"]`).click();
  card.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-w]");
    if (!btn && !e.target.closest(".wgt__cover")) return;
    if (!hasTrack) openMusic(btn ?? card);
    else if (btn) press(btn.dataset.w);
  });

  return {
    setPlaying(on) {
      card.classList.toggle("is-playing", on);
      card.querySelector("[data-w=pp]").setAttribute("aria-label", on ? "Pause" : "Play");
    },
    setNow({ track, position, duration }) {
      hasTrack = true;
      card.classList.add("has-track");
      card.style.setProperty("--cover", `url(${artUrl(track.art, 300)})`);
      title.textContent = track.title;
      artist.textContent = track.artist;
      bar.style.width = duration ? `${(position / duration) * 100}%` : "0%";
      timeNow.textContent = formatTime(position);
      left.textContent = timeLeft(position, duration);
    },
  };
}
