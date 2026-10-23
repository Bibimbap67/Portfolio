import { readPref, writePref, resolveTheme } from "./prefs.mjs";
import { SECTIONS, sectionFromHash } from "./router.mjs";
import { createSound } from "./sound.mjs";
import { initWindows, taskbarAction } from "./windows.mjs";
import { initMusic } from "./music.mjs";
import { initTilt } from "./tilt.mjs";
import { initWidgets } from "./widgets.mjs";
import { LINES, pickLine } from "./hamster.mjs";

const root = document.documentElement;
const storage = (() => { try { return localStorage; } catch { return null; } })();
const phone = matchMedia("(max-width: 720px)");
const darkScheme = matchMedia("(prefers-color-scheme: dark)");

const sound = createSound(window.AudioContext || window.webkitAudioContext);
sound.setEnabled(readPref(storage, "markos-sound", "off") === "on");

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- windows, taskbar, hash routing ---------- */

const desktop = document.querySelector(".desktop");
const taskButtons = new Map([...document.querySelectorAll("[data-task]")].map((b) => [b.dataset.task, b]));
const musicTile = document.querySelector(".app--music");

const clearHash = (id) => {
  if (location.hash === `#${id}`) history.replaceState(null, "", location.pathname + location.search);
};

// While a full-screen app is open on a phone, the home screen behind it is out of reach.
const homeScreen = [document.getElementById("hello"), document.querySelector(".apps")];
const appOpen = () => wm.openIds().some((id) => id !== "hello" && !wm.isMinimized(id));
const syncHome = () => homeScreen.forEach((el) => { el.inert = phone.matches && appOpen(); });

function paintTaskbar() {
  const open = new Set(wm.openIds());
  taskButtons.forEach((btn, id) => {
    btn.classList.toggle("is-open", open.has(id));
    btn.classList.toggle("is-focused", open.has(id) && !wm.isMinimized(id) && wm.isFocused(id));
  });
  syncHome();
}

const tiltStage = document.querySelector("[data-tilt]");
if (tiltStage) initTilt(tiltStage, tiltStage.querySelector(".idcard"));

const widgets = initWidgets(document.querySelector(".widgets"), { openMusic: (opener) => openSection("music", opener) });

const music = initMusic(document.getElementById("music"), {
  onPlayingChange(playing) {
    taskButtons.get("music")?.classList.toggle("is-playing", playing);
    musicTile?.classList.toggle("is-playing", playing);
    widgets.setPlaying(playing);
  },
  onNow: widgets.setNow,
});

const wm = initWindows(desktop, {
  isPhone: () => phone.matches,
  minimizeTarget: (id) => (phone.matches ? document.querySelector(`.apps [data-open="${id}"]`) : taskButtons.get(id)) ?? null,
  onOpen(id) {
    sound.play("open");
    if (id === "music") music.mount();
  },
  onClose(id) {
    sound.play("close");
    clearHash(id);
    if (id === "music") music.pause(); // closing stops the song; minimizing keeps it going
  },
  onChange: paintTaskbar,
});

phone.addEventListener("change", syncHome);

let pendingOpener = null;
let current = null;

function route() {
  const id = sectionFromHash(location.hash);
  // Back to "/" closes what the hash had opened; a desktop keeps several windows, a phone shows one app.
  if (!id && current) wm.close(current);
  if (id && phone.matches) wm.openIds().filter((o) => o !== id && o !== "hello").forEach(wm.minimize);
  if (id) wm.open(id, pendingOpener);
  current = id;
  pendingOpener = null;
}

function openSection(id, opener) {
  // hello.txt has no hash of its own; everything else opens through the URL so links and Back work.
  if (!SECTIONS.includes(id) || location.hash === `#${id}`) wm.open(id, opener);
  else {
    pendingOpener = opener;
    location.hash = id;
  }
}

function runTask(id, btn) {
  const open = wm.openIds().includes(id);
  const action = taskbarAction({ open, minimized: wm.isMinimized(id), focused: wm.isFocused(id) });
  if (action === "open") openSection(id, btn);
  else if (action === "restore") wm.restore(id);
  else if (action === "minimize") wm.minimize(id);
  else wm.focus(id);
}

document.addEventListener("click", (e) => {
  const opener = e.target.closest("[data-open]");
  const closer = e.target.closest("[data-close]");
  const task = e.target.closest("[data-task]");
  const min = e.target.closest("[data-minimize]");
  const max = e.target.closest("[data-maximize]");
  if (opener) {
    e.preventDefault();
    openSection(opener.dataset.open, opener);
  } else if (closer) {
    e.preventDefault();
    const id = closer.dataset.close;
    // On a phone, Home on Music works like minimize so the song keeps playing.
    if (phone.matches && id === "music") { wm.minimize(id); clearHash(id); } else wm.close(id);
  } else if (task) {
    runTask(task.dataset.task, task);
  } else if (min) {
    wm.minimize(min.dataset.minimize);
    clearHash(min.dataset.minimize);
  } else if (max) {
    wm.toggleMaximize(max.dataset.maximize);
  } else if (e.target.closest("a, button:not([data-sound-toggle]), summary")) {
    sound.play("tick");
  }
});

addEventListener("hashchange", route);

/* ---------- hamster mascot ---------- */

const menu = document.querySelector(".menubar__menu");
const summary = menu.querySelector("summary");
const bubble = menu.querySelector(".hamster__bubble");
const live = menu.querySelector("[data-hamster-live]");
let lastLine = null;
let talkTimer = 0;

function talk(announce) {
  if (menu.open) return;
  lastLine = pickLine(LINES, lastLine);
  bubble.textContent = lastLine;
  if (announce) live.textContent = lastLine; // timed lines stay silent for screen readers
  menu.classList.add("is-talking");
  clearTimeout(talkTimer);
  talkTimer = setTimeout(() => menu.classList.remove("is-talking"), 4000);
}

function scheduleTalk() {
  setTimeout(() => {
    if (!document.hidden && !reducedMotion.matches) talk(false);
    scheduleTalk();
  }, 20000 + Math.random() * 20000);
}

summary.addEventListener("pointerenter", () => talk(true));
summary.addEventListener("focus", () => talk(true));
menu.addEventListener("toggle", () => { if (menu.open) menu.classList.remove("is-talking"); });
scheduleTalk();

/* ---------- boot screen (first visit this session) ---------- */

const session = (() => { try { return sessionStorage; } catch { return null; } })();

function bootThenRoute() {
  if (!root.classList.contains("booting")) return route();
  const line = document.querySelector(".boot__line");
  const lines = ["waking up the hamster…", "loading snacks…", "loading projects…"];
  let i = 0;
  const cycle = setInterval(() => { line.textContent = lines[i++ % lines.length]; }, 450);
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    clearInterval(cycle);
    writePref(session, "markos-booted", "1");
    root.classList.add("booting-out");
    setTimeout(() => { root.classList.remove("booting", "booting-out"); route(); }, 260);
  };
  setTimeout(finish, 1500);
  addEventListener("pointerdown", finish, { once: true });
  addEventListener("keydown", finish, { once: true });
}

paintTaskbar();
bootThenRoute();

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

root.classList.add("wm"); // tells the head script the desktop is wired up
