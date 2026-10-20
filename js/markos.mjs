import { readPref, writePref, resolveTheme } from "./prefs.mjs";
import { sectionFromHash } from "./router.mjs";
import { createSound } from "./sound.mjs";
import { initWindows } from "./windows.mjs";

const root = document.documentElement;
const storage = (() => { try { return localStorage; } catch { return null; } })();
const phone = matchMedia("(max-width: 720px)");
const darkScheme = matchMedia("(prefers-color-scheme: dark)");

const sound = createSound(window.AudioContext || window.webkitAudioContext);
sound.setEnabled(readPref(storage, "markos-sound", "off") === "on");

/* ---------- Music: the album is the navigation ---------- */

const tracks = [...document.querySelectorAll("[data-track]")];
const nowPlaying = document.querySelector("[data-now-playing]");
const playBtn = document.querySelector("[data-play]");
const progress = document.querySelector(".player__progress");
let selected = tracks[0];

function selectTrack(track) {
  selected = track;
  const name = track.querySelector(".tracks__name").textContent.trim();
  tracks.forEach((t) => t.removeAttribute("aria-current"));
  track.setAttribute("aria-current", "true");
  nowPlaying.textContent = `Now playing: ${name}`;
  playBtn.setAttribute("aria-label", `Play ${name}`);
  progress.style.setProperty("--progress", `${((tracks.indexOf(track) + 1) / tracks.length) * 100}%`);
}

playBtn.addEventListener("click", () => openSection(selected.dataset.open, playBtn));

/* ---------- windows + hash routing ---------- */

const clearHash = (id) => {
  if (location.hash === `#${id}`) history.replaceState(null, "", location.pathname + location.search);
};

const wm = initWindows(document.querySelector(".desktop"), {
  isPhone: () => phone.matches,
  onOpen(id) {
    sound.play("open");
    const track = tracks.find((t) => t.dataset.open === id);
    if (track) selectTrack(track);
  },
  onClose(id) {
    sound.play("close");
    clearHash(id);
  },
});

// On phones the Music app is routable too; on desktop it's always on screen.
const idFromHash = () => sectionFromHash(location.hash) ?? (phone.matches && location.hash === "#music" ? "music" : null);

let pendingOpener = null;
let current = idFromHash();

function route() {
  const id = idFromHash();
  // Back to "/" closes what the hash had opened; a desktop keeps several windows, a phone shows one app.
  if (!id && current) wm.close(current);
  if (id && phone.matches) wm.openIds().filter((o) => o !== id).forEach(wm.close);
  if (id) wm.open(id, pendingOpener);
  current = id;
  pendingOpener = null;
}

function openSection(id, opener) {
  if (location.hash === `#${id}`) wm.open(id, opener);
  else {
    pendingOpener = opener;
    location.hash = id;
  }
}

document.addEventListener("click", (e) => {
  const opener = e.target.closest("[data-open]");
  const closer = e.target.closest("[data-close]");
  if (opener) {
    e.preventDefault();
    openSection(opener.dataset.open, opener);
  } else if (closer) {
    e.preventDefault();
    wm.close(closer.dataset.close);
  } else if (e.target.closest("a, button:not([data-sound-toggle]), summary")) {
    sound.play("tick");
  }
});

addEventListener("hashchange", route);
if (current) wm.open(current);

/* ---------- menubar: theme, sound, clock ---------- */

const themeBtn = document.querySelector("[data-theme-toggle]");
const soundBtn = document.querySelector("[data-sound-toggle]");

function paintToggles() {
  themeBtn.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));
  soundBtn.setAttribute("aria-pressed", String(sound.enabled));
  soundBtn.querySelector("use").setAttribute("href", sound.enabled ? "#i-sound-on" : "#i-sound-off");
}

themeBtn.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  writePref(storage, "markos-theme", next);
  paintToggles();
});

// Follow the system theme until the visitor picks one.
darkScheme.addEventListener("change", (e) => {
  root.dataset.theme = resolveTheme(readPref(storage, "markos-theme", null), e.matches);
  paintToggles();
});

soundBtn.addEventListener("click", () => {
  sound.setEnabled(!sound.enabled);
  writePref(storage, "markos-sound", sound.enabled ? "on" : "off");
  paintToggles();
  sound.play("tick");
});

paintToggles();

const clock = document.querySelector("[data-clock]");
const clockFormat = new Intl.DateTimeFormat("en-PH", {
  timeZone: "Asia/Manila",
  weekday: "short",
  hour: "numeric",
  minute: "2-digit",
});
function tickClock() {
  const now = new Date();
  clock.textContent = clockFormat.format(now);
  clock.dateTime = now.toISOString();
}
tickClock();
setInterval(tickClock, 30_000);
