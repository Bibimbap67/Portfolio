# markOS Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the 6-page static portfolio into markOS: a single-page desktop with draggable section windows, an album-style Music app for navigation, dark/light mode, opt-in click sounds, and a phone home-screen mode.

**Architecture:** `index.html` holds all content as plain, stacked sections, so it reads fine without JS. A tiny inline head script adds `html.js` and the theme before paint. Desktop and phone behaviour is CSS scoped under `.js`, plus ES modules. Pure logic lives in small modules tested with Node's built-in runner (prefs/theme, hash routing, sound, window clamping). DOM wiring is checked in the browser.

**Tech Stack:** HTML, CSS (custom properties, `color-mix`, media queries), vanilla ES modules, Web Audio API, Google Fonts (Bricolage Grotesque, IBM Plex Mono), Vercel static hosting and Analytics. Tests use `node --test` (Node 24, no package.json: Node detects ESM syntax).

**Spec:** `docs/superpowers/specs/2026-10-20-markos-redesign-design.md`. Visual reference: `.superpowers/brainstorm/album-desktop-v2.html`, option 1.

## Global Constraints

- No frameworks, no JS/CSS libraries, no build step, no `package.json`.
- All content is present in `index.html` and readable with JS disabled, in reading order: hello, about, skills, projects, contact.
- Sound is off by default; nothing plays until the visitor enables it.
- Theme follows `prefers-color-scheme` until toggled. Storage keys are `markos-theme` (`"light"`|`"dark"`) and `markos-sound` (`"on"`|`"off"`). All storage access sits in try/catch.
- `prefers-reduced-motion: reduce` gives instant state changes, with no window or slide animation.
- WCAG AA contrast in both themes. Body text is 16px or larger. Everything is reachable by keyboard; dragging is never required.
- Fonts are Bricolage Grotesque (display and UI) and IBM Plex Mono (menubar, window titles, track numbers, meta). Fraunces and Inter are removed.
- Phone mode is `max-width: 720px`.
- Keep the Vercel Analytics snippet exactly (`window.va` stub plus `/_vercel/insights/script.js`).
- Copy is kept from the current pages, except where the spec changes it (album *Simple, Complicated*; sticky note "todo: ☑ learn React ☐ connect the db ☐ sleep").
- Skill routing for UI tasks follows `CLAUDE.md` (Impeccable for craft, typeset, colorize, animate and so on). Ponytail is on.

## Review Focus

1. **Deep link on load:** opening `/#projects` (on a phone or a desktop) shows the Projects window or app immediately, not the home view. Covered by the `sectionFromHash` tests (Task 2) and Task 6/7 browser checks.
2. **Blocked storage** (private mode, or storage disabled): no errors, the theme follows the system, and sound stays off. Covered by prefs tests (Task 2).
3. **Window dragged off-screen, or viewport shrunk:** the window's title bar stays inside the desktop. Covered by `clampPosition` tests (Task 6).
4. **No AudioContext support:** turning sound on doesn't throw, and clicks still work. Covered by sound tests (Task 3).
5. **JS disabled, or a module fails to load:** all content is still readable and the links work. Covered by the Task 4 browser check.

---

### Task 1: Commit the spec and create PRODUCT.md

**Files:**
- Create: `PRODUCT.md` (generated)
- Add: `docs/superpowers/specs/2026-10-20-markos-redesign-design.md`, `docs/superpowers/plans/2026-10-20-markos-redesign.md`, `.gitignore` (already modified: `.superpowers/`)

- [ ] **Step 1:** Run `/impeccable init`. Answer its product questions from the spec's Intent, Goals and Anti-goals: audience is recruiters, professors and classmates; the feeling is "simple but unique"; the voice is playful and self-deprecating ("lol"). Ask Mark only about something the spec doesn't cover.
- [ ] **Step 2:** Check that `PRODUCT.md` exists and doesn't contradict the spec (no cream/Fraunces direction, sound opt-in).
- [ ] **Step 3: Commit**

```bash
git add .gitignore PRODUCT.md docs/
git commit -m "docs: add markOS design, plan and product context"
```

---

### Task 2: Prefs, theme and hash-routing logic

**Files:**
- Create: `js/prefs.js`, `js/router.js`
- Test: `tests/prefs.test.js`, `tests/router.test.js`

**Interfaces:**
- Produces:
  - `readPref(storage: Storage|null, key: string, fallback: string): string`, which returns `fallback` if storage is null, throws, or has no value.
  - `writePref(storage: Storage|null, key: string, value: string): boolean`, which returns `false` on any failure.
  - `resolveTheme(stored: string|null, prefersDark: boolean): "light"|"dark"`. A stored `"light"` or `"dark"` wins; anything else follows `prefersDark`.
  - `SECTIONS = ["about", "skills", "projects", "contact"]`.
  - `sectionFromHash(hash: string): string|null`, which returns the section for an exact `#<section>`, and otherwise `null`.

- [ ] **Step 1: Write failing tests**

```js
// tests/prefs.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { readPref, writePref, resolveTheme } from "../js/prefs.js";

const throwing = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
const mem = () => { const m = new Map(); return { getItem: k => m.get(k) ?? null, setItem: (k, v) => m.set(k, v) }; };

test("readPref falls back when storage throws or is missing", () => {
  assert.equal(readPref(throwing, "markos-theme", "x"), "x");
  assert.equal(readPref(null, "markos-theme", "x"), "x");
  assert.equal(readPref(mem(), "markos-theme", "x"), "x");
});
test("writePref round-trips and reports failure", () => {
  const s = mem();
  assert.equal(writePref(s, "markos-sound", "on"), true);
  assert.equal(readPref(s, "markos-sound", "off"), "on");
  assert.equal(writePref(throwing, "markos-sound", "on"), false);
});
test("resolveTheme: stored choice wins, else system", () => {
  assert.equal(resolveTheme("dark", false), "dark");
  assert.equal(resolveTheme("light", true), "light");
  assert.equal(resolveTheme(null, true), "dark");
  assert.equal(resolveTheme("garbage", false), "light");
});
```

```js
// tests/router.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { sectionFromHash, SECTIONS } from "../js/router.js";

test("known sections route", () => {
  for (const s of SECTIONS) assert.equal(sectionFromHash("#" + s), s);
});
test("unknown, empty and non-section hashes don't route", () => {
  for (const h of ["", "#", "#hello", "#music", "#Projects", "#projects/x", "projects"]) assert.equal(sectionFromHash(h), null);
});
```

- [ ] **Step 2:** Run `node --test`. Expected: FAIL (modules not found).
- [ ] **Step 3:** Implement the five exports in `js/prefs.js` and `js/router.js`.
- [ ] **Step 4:** Run `node --test`. Expected: all pass.
- [ ] **Step 5: Commit:** `git add js/prefs.js js/router.js tests/ && git commit -m "feat: prefs, theme and hash routing logic"`

---

### Task 3: Sound module

**Files:**
- Create: `js/sound.js`
- Test: `tests/sound.test.js`

**Interfaces:**
- Produces `createSound(AudioContextCtor?: Function): { enabled: boolean, setEnabled(on: boolean): void, play(name: "tick"|"open"|"close"): void }`.
  - It never constructs a context while disabled. It lazily creates one context on the first `play` while enabled, then reuses it.
  - `play` is a no-op for unknown names, for a missing constructor, or when anything throws.
  - Each sound is a short oscillator plus gain envelope, at most 80ms. The builder picks the pitches (for example tick ≈1800Hz, open a rising blip, close a falling blip).

- [ ] **Step 1: Write failing tests**

```js
// tests/sound.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { createSound } from "../js/sound.js";

function fakeCtx() {
  let made = 0;
  const param = { value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {}, linearRampToValueAtTime() {} };
  const node = () => ({ frequency: { ...param }, gain: { ...param }, type: "", connect(n) { return n; }, start() {}, stop() {} });
  class Ctx { constructor() { made++; } get currentTime() { return 0; } get destination() { return {}; } createOscillator() { return node(); } createGain() { return node(); } }
  return { Ctx, count: () => made };
}

test("disabled by default and never creates a context", () => {
  const f = fakeCtx(); const s = createSound(f.Ctx);
  assert.equal(s.enabled, false);
  s.play("tick");
  assert.equal(f.count(), 0);
});
test("enabled: one context, reused", () => {
  const f = fakeCtx(); const s = createSound(f.Ctx);
  s.setEnabled(true); s.play("tick"); s.play("open"); s.play("close");
  assert.equal(f.count(), 1);
});
test("unknown name or missing AudioContext never throws", () => {
  const s = createSound(undefined); s.setEnabled(true);
  assert.doesNotThrow(() => s.play("tick"));
  const f = fakeCtx(); const t = createSound(f.Ctx); t.setEnabled(true);
  assert.doesNotThrow(() => t.play("boom"));
});
```

- [ ] **Step 2:** Run `node --test tests/sound.test.js`. Expected: FAIL.
- [ ] **Step 3:** Implement `createSound` in `js/sound.js`.
- [ ] **Step 4:** Run `node --test`. Expected: all pass.
- [ ] **Step 5: Commit:** `git add js/sound.js tests/sound.test.js && git commit -m "feat: opt-in synthesized UI sounds"`

---

### Task 4: Single-page markup, redirects, old pages removed

**Files:**
- Modify: `index.html` (full rewrite)
- Modify: `vercel.json`
- Delete: `home.html`, `about.html`, `skills.html`, `projects.html`, `contact.html`, `js/portfolio.js`, `css/portfolio.css`. `index.html` already links `css/markos.css`, which Task 5 creates, so this task's page is deliberately unstyled.

**Interfaces (DOM contract used by Tasks 5–7):**
- `<html lang="en" data-theme="light|dark">`. An inline head script, before the stylesheet, adds class `js` and sets `data-theme` from `localStorage["markos-theme"]` or `prefers-color-scheme`, inside try/catch. It's one statement, a deliberate duplicate of `resolveTheme` to avoid a flash.
- Menubar: `<header class="menubar">` with a `markOS` menu (`<details>` holding GitHub, Instagram and Email links), `<time data-clock>`, `<button data-theme-toggle aria-pressed>` and `<button data-sound-toggle aria-pressed="false">`.
- Windows: `<section class="win" id="<id>" aria-labelledby="<id>-title">` with ids `hello`, `music`, `about`, `skills`, `projects` and `contact`. Each has `<div class="win__bar"><h2 id="<id>-title" class="win__title">…</h2><button data-close="<id>" aria-label="Close …">`, then `<div class="win__body">`. `hello` and `music` have no close button.
- Openers: any element with `data-open="<section>"` (desktop icons, Music tracks, hello buttons, phone icons). Each is a real `<a href="#<section>">`, so it works without JS.
- Sticky note: `<aside class="note">`. Desktop icons: `<nav class="icons">`. Phone app grid: `<nav class="apps">` (its icons are `<a data-open>`, plus Music as `<a href="#music" data-open="music">`).
- Content is moved verbatim from the old pages (hello gets the old hero content per spec call 11). Fix: the hero GIF's alt becomes something descriptive, not "Juan Dela Cruz". The joke card ("Soon just give me a break") becomes a non-link `<article>` labelled "coming soon". Every other project card keeps its live link (`target="_blank" rel="noopener"`) and gets a correct `aria-label`.
- Fonts link: `family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=IBM+Plex+Mono:wght@400;500`.
- Scripts at end: `<script type="module" src="js/markos.js">` plus the unchanged Analytics snippet.

- [ ] **Step 1:** Rewrite `index.html` to the contract above, with content from the old pages.
- [ ] **Step 2:** Update `vercel.json`:

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    { "source": "/(about|skills|projects|contact)(\\.html)?", "destination": "/#$1", "permanent": true },
    { "source": "/home(\\.html)?", "destination": "/", "permanent": true }
  ]
}
```

- [ ] **Step 3:** Delete the old files listed above. Grep for leftover references with `Grep "portfolio\.(css|js)|about\.html|skills\.html|projects\.html|contact\.html|home\.html"`. Expected: none outside `docs/` and `.superpowers/`.
- [ ] **Step 4: Verify no-JS reading** (Review Focus 5). Serve the repo, for example by adding `.claude/launch.json` with `npx --yes serve -l 5173 .` and using `preview_start`. In the browser pane, open the page with JS disabled, or check before `markos.js` exists. Expected: every section is visible in order, all links work, and nothing overlaps.
- [ ] **Step 5: Commit:** `git add -A index.html vercel.json home.html about.html skills.html projects.html contact.html js/portfolio.js css/portfolio.css && git commit -m "feat: single-page markOS markup and redirects"`

---

### Task 5: markOS styles (themes, type, desktop, windows, sections)

Use `/impeccable craft`, with `typeset`, `colorize` and `layout` as the routing table says.

**Files:**
- Create: `css/markos.css` (already linked from `index.html` in Task 4)

**Interfaces:**
- Tokens on `:root` / `[data-theme="dark"]`: `--wall-1/2/3` (light: periwinkle, pink, butter, starting from `#c9d4ff`, `#f6c6e6`, `#fff3b0`; dark: the same hues at night, starting from `#1b1d2b`, `#2b1f2c`, `#24251c`), `--win`, `--win-bar`, `--text`, `--text-muted`, `--edge`, `--accent` (light around `#c2477f`, dark around `#f6c6e6`; adjust for AA), `--font-ui`, `--font-mono`, `--dur` (180ms), `--ease`. Set `color-scheme` per theme.
- Base styles (no `.js`): stacked, readable document. Desktop layout only under `html.js` and `(min-width: 721px)`: full-viewport wallpaper, fixed menubar, absolutely positioned `.win` (with initial positions for hello, music, the note and the icons like the mockup), `.win.is-open` / `.win.is-focused` state classes, and closed section windows hidden (`html.js .win:not(.is-open)` gets `display:none`, except hello and music).
- Section styles: Skills as a "System Info" panel (label/value rows, logos at 32px with visible names), Projects as a folder (grid of file cards: thumbnail, name, description, stack; coming-soon card muted), About (GIF, highlighted paragraphs, rows), Contact (heading, lead, GIF, links). Windows scroll internally (`overflow:auto`, `max-height` within the viewport).
- `@media (prefers-reduced-motion: reduce)`: no transitions or animations.

- [ ] **Step 1:** Write `css/markos.css` to the contract.
- [ ] **Step 2: Verify in browser,** with `html.js` forced on via devtools, since the JS lands in Task 6. Both themes (toggle `data-theme` by hand) match the mockup's feel. Body text is 16px or larger. The Impeccable design hook reports no contrast or tiny-text findings. The no-JS view is still readable.
- [ ] **Step 3: Commit:** `git add css/markos.css && git commit -m "feat: markOS themes, type and window styles"`

---

### Task 6: Window manager and desktop wiring

Use `/impeccable animate` for open, close and focus motion.

**Files:**
- Create: `js/windows.js`, `js/markos.js`
- Test: `tests/windows.test.js`

**Interfaces:**
- Consumes: `readPref`, `writePref`, `resolveTheme` (Task 2); `sectionFromHash`, `SECTIONS` (Task 2); `createSound` (Task 3); the DOM contract (Task 4).
- Produces:
  - `clampPosition(pos: {x, y, w}, bounds: {width, height, top}): {x, y}`, a pure function. It keeps at least 80px of the window's width horizontally inside the bounds, and the title bar between `top` (the menubar height) and `height - 30`.
  - `initWindows(root: HTMLElement, { onOpen?(id), onClose?(id) }): { open(id), close(id), focus(id) }`.
    - `open` shows (`.is-open`), focuses, and raises the z-index; it's idempotent if already open, and just focuses.
    - `close` hides it and returns focus to the opener that opened it.
    - `focus` raises it and sets `.is-focused`.
    - Pointer-drag on `.win__bar` is desktop only, with the position clamped.
    - Esc closes the focused closable window.
- `markos.js` (entry) behaviour:
  - Hash is the single source: `data-open` links set `location.hash`, and `hashchange` plus the initial load call `open(sectionFromHash(location.hash))`.
  - Closing the window that matches the hash clears it with `history.replaceState(null, "", location.pathname)`.
  - Theme toggle flips `data-theme`, writes `markos-theme`, and updates `aria-pressed` and the label (☾ dark / ☀ light).
  - Sound toggle calls `setEnabled`, writes `markos-sound`, and plays a tick when turned on. `open` and `close` play the matching sounds, and other `click`s on interactive elements play a tick.
  - The clock uses `toLocaleTimeString("en-PH", { timeZone: "Asia/Manila", weekday: "short", hour: "2-digit", minute: "2-digit" })` and refreshes every 30s.
  - Music: clicking a track opens its section, updates "Now playing: <track>", and moves the progress bar. ▶ opens the currently selected track (default About Me).

- [ ] **Step 1: Write failing test**

```js
// tests/windows.test.js
import { test } from "node:test";
import assert from "node:assert/strict";
import { clampPosition } from "../js/windows.js";

const b = { width: 1200, height: 800, top: 30 };
test("inside stays put", () => assert.deepEqual(clampPosition({ x: 100, y: 100, w: 400 }, b), { x: 100, y: 100 }));
test("dragged off right/left keeps 80px visible", () => {
  assert.equal(clampPosition({ x: 1190, y: 100, w: 400 }, b).x, 1120);
  assert.equal(clampPosition({ x: -390, y: 100, w: 400 }, b).x, -320);
});
test("title bar stays below menubar and above bottom", () => {
  assert.equal(clampPosition({ x: 0, y: -50, w: 400 }, b).y, 30);
  assert.equal(clampPosition({ x: 0, y: 900, w: 400 }, b).y, 770);
});
```

- [ ] **Step 2:** Run `node --test tests/windows.test.js`. Expected: FAIL.
- [ ] **Step 3:** Implement `clampPosition` and `initWindows` in `js/windows.js`, and the entry wiring in `js/markos.js`. Guard `windows.js` so importing it in Node doesn't touch `document` at module top level.
- [ ] **Step 4:** Run `node --test`. Expected: all pass.
- [ ] **Step 5: Verify in browser (desktop width):**
  - Loading `/` shows hello, music and the note.
  - Loading `/#projects` opens Projects focused (Review Focus 1).
  - An icon, a track or a hello button opens the right window, and opening it twice doesn't duplicate it.
  - Dragging works, and a window can't be lost off-screen (Review Focus 3).
  - Tab, Enter and Esc work, and focus returns to the opener.
  - Theme persists across reload. Sound stays silent until toggled.
  - With `localStorage` blocked (devtools: block storage, or override `localStorage` to throw), the page still works (Review Focus 2).
  - Reduced-motion emulation removes animation. The console shows no errors.
- [ ] **Step 6: Commit:** `git add js/windows.js js/markos.js tests/windows.test.js && git commit -m "feat: markOS window manager, menubar, music navigation"`

---

### Task 7: Phone home screen

Use `/impeccable adapt`.

**Files:**
- Modify: `css/markos.css` (phone section), `js/markos.js` (phone behaviour)

**Interfaces:**
- Under `html.js` and `(max-width: 720px)`:
  - The status bar (clock, theme and sound toggles) is fixed at the top.
  - The hello widget is compact, and the `.apps` grid shows Music, About, Skills, Projects ★ and Contact.
  - The note, desktop icons and desktop window chrome are hidden.
  - An open window is full-screen (`position: fixed; inset: 0` below the status bar), with a "‹ Home" control in place of the close button (`data-close`, same behaviour).
  - `music` is a full-screen app when opened from `#music`. On phones, `music` is routable: `sectionFromHash` stays desktop-strict, and `markos.js` treats `#music` as an opener on phones only.
  - Drag is disabled.
- The browser Back button closes the open app (hash history from Task 6).

- [ ] **Step 1:** Add the phone CSS and the `#music` phone handling.
- [ ] **Step 2: Verify at 375×812** (`resize_window` preset mobile):
  - The home screen shows the hello widget and five app icons. Tapping one opens it full-screen.
  - "‹ Home" and browser Back both return to the home screen.
  - `/#projects` loaded directly opens the Projects app (Review Focus 1).
  - The toggles work. There's no horizontal scroll. Resizing between desktop and phone width doesn't strand a window.
- [ ] **Step 3: Commit:** `git add css/markos.css js/markos.js && git commit -m "feat: markOS phone home screen"`

---

### Task 8: DESIGN.md, review and final verification

**Files:**
- Create: `DESIGN.md` (generated)

- [ ] **Step 1:** Run `/impeccable document` to write `DESIGN.md` from the shipped CSS.
- [ ] **Step 2:** Run `/impeccable audit` and `design:accessibility-review` on the page. Fix real findings (contrast, focus order, target sizes, labels). Then run `/impeccable polish`.
- [ ] **Step 3:** Run `node --test` (all pass), then repeat the browser checks from Tasks 4, 6 and 7 at desktop and 375px, in both themes. The console shows no errors.
- [ ] **Step 4:** Run `/ponytail-review` on the branch diff and fix the findings worth fixing.
- [ ] **Step 5: Commit:** `git add DESIGN.md css/ js/ index.html && git commit -m "docs: DESIGN.md; polish and a11y fixes"`
- [ ] **Step 6:** Mark checks the Vercel redirects (`/about` → `/#about`) after deploy, since the local server doesn't apply `vercel.json`.
