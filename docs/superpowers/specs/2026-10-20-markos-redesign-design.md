# markOS: portfolio redesign

## Intent

Mark's portfolio (static HTML/CSS/JS on Vercel) is tidy but forgettable. A first-time visitor's reaction is "this is it??" Mark wants visitors to feel the site is **simple but unique**, and to come away remembering him, not a template.

The redesign turns the site into **markOS**, a small, calm computer desktop that is Mark's personal space. It carries his humour ("I love making simple things complicated, and complicated things simple, lol") and his love of K-pop. The portfolio sections become apps and windows on that desktop, and the album metaphor runs through the navigation.

Chosen by Mark from clickable mockups (`.superpowers/brainstorm/album-desktop-v2.html`, option 1). That mockup is the visual reference.

## Goals

- First screen makes a visitor stop and react within ~10 seconds, while staying simple: few objects, lots of breathing room.
- A recruiter can reach Projects in one or two clicks or taps, on desktop or phone.
- Dark and light mode, with click sounds that are opt-in.
- Purposeful motion: windows open, close and focus with short, snappy animation.
- Better typography than the current Fraunces/Inter pairing, which reads as generic.

## Non-goals

- Real music playback or audio files. The album is navigation, and the only sounds are synthesized UI ticks.
- A CMS, a build step, a framework, or any JS or CSS library.
- New content sections (résumé, blog, timeline). Mark has nothing to add right now.

## Anti-goals (failure even if it "works")

- A cluttered fake OS: many icons, fake apps that do nothing, gimmicks before content.
- Content that's hard to find or read, for example a recruiter who can't find projects, or text too small.
- Sound that plays before the visitor turns it on.
- A slow first load, or a broken or unusable phone experience.
- An inaccessible site: no keyboard access, or content that's only reachable by dragging.

## Constraints

- Static site on Vercel (`vercel.json` has `cleanUrls: true`). Plain HTML, CSS and vanilla JS only, platform features first.
- Keep Vercel Analytics (the `/_vercel/insights/script.js` snippet).
- Must work and be readable with JS disabled: all content is in the HTML, and JS only adds the desktop behaviour.
- `prefers-reduced-motion`: no window or slide animation, only instant state changes.
- WCAG AA contrast in both themes. Body text at least 16px.

## What Mark decided

- **Concept: markOS, desktop first, album as an app** (mockup option 1).
- **Desktop (wide screens):** a gradient wallpaper, a top menubar, a `hello.txt` window (name and his line), a Music app window showing the album, a sticky note, and folder icons on the side for the sections.
- **Music app = navigation.** The album's tracks are the portfolio sections, Projects is the ★ title track, and clicking a track opens that section's window.
- **Menubar:** `markOS`, a live clock in Manila time, a dark/light toggle, and a sound toggle.
- **Windows** can be dragged by their title bar and come to the front when clicked.
- **Sound** is off by default and turned on from the menubar. Once on, interactions make a soft tick.
- **Phones:** markOS becomes a **phone home screen**. Sections are app icons, and tapping one opens that section full-screen like an app, with a way back.
- **Content:** existing text and info stay. Each section is restyled to fit markOS.

## Calls made for Mark (he handed these over; flagged so he can veto)

1. **Single page.** `index.html` becomes the whole of markOS. Each section is a window, a `<section>` in that page, opened by URL hash (`/#projects`, `/#about`, `/#skills`, `/#contact`), so every section still has a shareable link. Old URLs (`/about`, `/skills`, `/projects`, `/contact`, `/home`) redirect to the hash via `vercel.json` `redirects`. The old page files and the duplicate `home.html` are deleted.
2. **Album title:** *Simple, Complicated* (from his tagline). Tracklist: 01 About Me, 02 Skills, 03 Projects ★, 04 Contact. Each track shows a fake duration.
3. **Window contents:**
   - About: his photo GIF, the two intro paragraphs (keep the highlight words), and the Education / Programming Interests / Interests / Hobbies rows.
   - Skills: styled as a "System Info" panel listing the four groups (Languages, Web Technologies, Database, Tools/Frameworks) with the existing devicon logos and visible names.
   - Projects: styled as a folder of files. Each project is a card with its existing thumbnail, name, description and stack, and it opens the live link in a new tab.
   - Contact: heading, lead line, GIF, and the Email / GitHub / Instagram links.
4. **Desktop at load:** `hello.txt` and Music are open, the sticky note is visible, and the folder icons are Projects, About, Skills and Contact. The sticky note reads "todo: ☑ learn React ☐ connect the db ☐ sleep" (a nod to the click-game project).
5. **Theme:** follows `prefers-color-scheme` until toggled, then remembered in `localStorage`, with `try/catch` and a working default when storage fails. Light wallpaper is a pastel periwinkle → pink → butter gradient. Dark is a deep night version of the same hues.
6. **Sound:** Web Audio API, synthesized, with no audio files. Three soft sounds: click/tick, window open, window close. The preference is remembered like the theme. When the toggle turns sound on, it plays one tick as confirmation.
7. **Type:** Bricolage Grotesque for display and UI, IBM Plex Mono for system labels (menubar, window titles, track numbers, meta). Both from Google Fonts. Fraunces and Inter are dropped.
8. **Footer** is removed. Its links already live in Contact, and the menubar's `markOS` menu also links GitHub, Instagram and Email.
9. **Fix:** the hero image's alt text says "Juan Dela Cruz". Use a correct, descriptive alt.
10. **Keyboard:** icons and tracks are buttons or links, each window has a close button, Esc closes the focused window, and opening a window moves focus into it. Dragging is optional, never the only way to reach anything.
11. **`hello.txt` content:** the hero GIF as a small image beside the name (caption "Didn't you learn that studying is important?" under it), the name, the role line ("Web Developer / IT Student"), his "lol" line, the three facts (3rd Year BSIT · Parañaque City · Web & App Development) as a small mono meta row with the green status dot, and two buttons: "Open Projects ★" and "Contact", which open those windows. This is the densest window, but it is the "who am I" card, so it carries what a recruiter scans for.
12. **Phone home screen (below about 720px):** top status bar with the clock and the theme and sound toggles; a "hello" widget at the top (same content as `hello.txt`, compact); then an app-icon grid: About, Skills, Projects ★, Contact; then the album as a now-playing widget (cover, title, tracks, player) so the album is visible on the home screen itself. *(Changed at the finish review: the separate Music app tile was dropped because the widget carries the album; `/#music` scrolls to the widget.)* The sticky note and folder icons are desktop-only. Each opened app is full-screen with a "‹ Home" back control, and the URL hash still updates so links work.
13. **The joke project card** ("Soon just give me a break", the oiia-cat GIF) stays as a non-clickable "coming soon" file in the Projects folder. It's Mark's humour, but its broken self-link and copied `aria-label` go.
14. **Analytics:** keep the existing Vercel Analytics snippet as is. There's no per-section tracking (Mark rarely checks analytics), so most visits will show as `/`.
15. **No-JS fallback:** windows render as a normal stacked page in reading order (hello, about, skills, projects, contact) with the menubar as a plain header.

## Project context files

`PRODUCT.md` and `DESIGN.md` don't exist yet. After this design is approved, they're generated with Impeccable (`/impeccable init`, then `/impeccable document` once the new type and palette exist), and they must agree with this document.

## Left to the builder

Exact window sizes and positions; icon artwork (inline SVG or CSS shapes); animation curves and durations (short: about 150–250ms); the exact synthesized sound parameters; z-index and focus-order handling; the breakpoint where desktop switches to the phone home screen (around 720px); how the Music app's ▶ button and progress bar behave (decorative or "play opens the selected track"); and the exact palette values, as long as they meet AA contrast.
