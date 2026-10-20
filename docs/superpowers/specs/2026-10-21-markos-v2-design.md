# markOS v2: real-computer upgrades

## Intent

markOS v1 shipped (see `2026-10-20-markos-redesign-design.md`, `DESIGN.md`). Mark wants it to feel even more like a real computer, and more like him:

- a boot screen
- windows that minimize, maximize and resize like real apps
- a taskbar
- a real music player with his own songs
- a live hamster mascot
- clearer icons
- his own cursor

The "simple but unique" goal from v1 stands, and so do PRODUCT.md's principles: personality is the proof, simple before clever, projects within reach, opt-in delight.

## Goals

- First visit: a short, fun boot, then the desktop with only hello.txt open.
- Windows behave like real ones: close, minimize, maximize/restore, resize from every edge and corner, drag.
- A taskbar shows every app and which ones are open or minimized.
- The Music app plays Mark's own Spotify playlist, with search inside it.
- A hamster mascot gives markOS a living character.
- Icons say what each thing is.

## Non-goals

- Searching all of Spotify, or full playback for every visitor. Spotify allows that only through per-visitor login and Premium. Visitors signed in to Spotify hear full tracks; everyone else gets 30-second previews. That's Spotify's rule, not ours.
- New content sections, or changes to project, about, skills or contact copy.
- Any library, framework or build step (Ponytail: platform features first).

## Anti-goals

- A boot screen that makes a client wait: longer than about 1.5s, unskippable, or replayed on every page load.
- Spotify (a third-party iframe) loading before the visitor opens Music. That hurts first-load speed and privacy.
- A cluttered screen where the taskbar, desktop icons and windows fight for space.
- A cursor that hides where you are clicking or breaks text selection.
- Anything the keyboard can't reach, or a hamster that ignores reduced motion.

## Constraints

Everything from v1 still applies:

- static HTML/CSS/vanilla ES modules (`.mjs`) on Vercel
- readable without JS (the `html.js` / `html.wm` fallback stays)
- WCAG AA, 16px body text minimum, `prefers-reduced-motion`
- sound off by default
- theme persisted with try/catch
- tests via `node --test` for JS logic
- commits in Mark's style from CLAUDE.md, with no co-author lines

## What Mark decided

1. **Boot screen** on first load: a Windows-style "booting" screen, then the main desktop.
2. **Mac-style window buttons**, red, yellow and green, in every window's title bar:
   - red closes;
   - yellow minimizes to the taskbar;
   - green maximizes the window to fill the desktop, and clicking it again restores it.
3. **Resizable windows**, like a real app.
4. **Taskbar** along the bottom, like the Windows taskbar in Mark's screenshot.
5. **Music app** with the Spotify icon, named "Music". It plays Mark's public playlist **"music"** (https://open.spotify.com/playlist/3QAwwmlzsDZjdNQOx1ldQH, 17 songs, created this session). It's closed at load: the Music window no longer pops up on its own.
6. **Search** inside Music. Typing filters the playlist's songs, and choosing one plays it.
7. **hello.txt icons**:
   - "3rd Year BSIT Student": a school or graduation icon, replacing the green dot;
   - "Parañaque City, Philippines": an icon;
   - "Web & App Development": a fitting icon.
8. **Hamster mascot**, live and talking, in place of the "markOS" text at the top left.
9. **Better icons**. The Projects folder stays. About, Skills and Contact get icons that suit them.
10. **Custom cursor** while the mouse is over the site.

## Calls made for Mark (flag to veto)

1. **Boot screen**
   - Dark full-screen overlay: the hamster running in a wheel, "markOS" under it, a thin progress bar, and status lines ticking past ("loading snacks…", "waking up the hamster…", "loading projects…").
   - It finishes in about 1.5s. Any click, tap or key skips it immediately.
   - It shows once per browser session (`sessionStorage` key `markos-booted`, try/catch). With `prefers-reduced-motion`, the overlay doesn't show at all.
   - It's rendered only when `html.wm` is set, so if JS fails there's never a stuck overlay.
   - If the visitor arrives on a deep link (`/#projects` and the like), the boot still plays, then the window opens.

2. **Desktop at load**
   - Only hello.txt is open. Music is closed and so is everything else.
   - The sticky note and the desktop icons stay.
   - The album concept from v1 is retired: the *Simple, Complicated* tracklist navigation, the authored album cover, the now-playing widget, and the `data-track` / "Now playing" code are removed. Navigation is now the desktop icons, the taskbar, and hello.txt's buttons.

3. **Window buttons**
   - The three 12px dots sit at the left of every title bar, in mac order: close, minimize, maximize. Colors are #ff5f57, #febc2e and #28c840. Glyphs (×, −, +) appear on hover or focus.
   - Each is a real `<button>` with an `aria-label` ("Close About Me", and so on).
   - hello.txt keeps all three. Closing it just hides it, and its taskbar icon brings it back.

4. **Minimize** hides the window but keeps it "open" in the taskbar, which shows a lit dot. Clicking the taskbar icon restores and focuses it. Minimizing animates toward its taskbar icon, reusing the v1 grow/shrink motion with the taskbar icon as the target.

5. **Maximize**
   - The window fills the desktop area between the menubar and the taskbar, with radius 0, and dragging is disabled.
   - Green again, or a double-click on the title bar, restores the window's previous size and position.

6. **Resize**
   - Eight invisible 6px handles on the edges and corners, each with the matching resize cursor.
   - Minimum size 320×220. The window is clamped so its title bar stays reachable (v1 `clampPosition`).
   - Desktop only. On phones, windows stay full-screen apps.

7. **Taskbar**
   - Fixed bottom bar, 52px, translucent like the menubar. Centered icons: Music, Projects, About, Skills, Contact, plus hello.txt as a small "home" icon at the start.
   - The lit dot means open. Hover shows the app name as a native `title` tooltip. Clicking toggles: open or restore if closed or minimized, minimize if it's already the focused window (like Windows).
   - The desktop icons on the right stay as shortcuts.
   - Phones have no taskbar; they keep the home screen.

8. **Music app**
   - The icon is the official Spotify logo as inline SVG on Spotify green #1ED760, labelled "Music". Brand use is limited to linking or playing Spotify content, which this is.
   - The window holds a search box, then the 17 songs (title, artist, duration) as a list, then Spotify's official embed player.
   - The embed starts on the whole playlist: `https://open.spotify.com/embed/playlist/3QAwwmlzsDZjdNQOx1ldQH`. Choosing a song switches it to `https://open.spotify.com/embed/track/<id>`.
   - The `<iframe>` is created only the first time Music opens (no Spotify requests before that), with `loading="lazy"`, `allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"`, and a title.
   - Search filters by title or artist, case-insensitively, ignoring accents. With no match it says "No songs match '<q>'".
   - Without JS, the section shows a plain "Listen on Spotify" link to the playlist.
   - The track list is static data in the page (from the playlist on 2026-10-21):

     | Title | Artist | Duration | Track ID |
     |---|---|---|---|
     | Hot Mess | aespa | 3:12 | 1SaLI6o5GhfcaxPVAJoD3r |
     | Hold On Tight | aespa | 2:29 | 1o844wI52S3TjXGBwvGcc7 |
     | Dark Arts | aespa | 3:01 | 2wRXvIGUTRWod4yp1k3bGN |
     | ICONIC HEART | Hearts2Hearts | 3:09 | 1OLAjffdDJibTrUGAwApVk |
     | STYLE | Hearts2Hearts | 3:29 | 5EoV2HmAlkqN1XvsIjOBZZ |
     | CRAZY | LE SSERAFIM | 2:44 | 3AoEQRuFf8zVXWqSLo2UOi |
     | ICY | ITZY | 3:11 | 2vdkN2NSQ5mxqNGg7sJUxs |
     | Toki Yo Tomare | ILLIT | 3:08 | 6VedlO2MtaEjAITax6vQyg |
     | Day 1 | Red Velvet | 3:26 | 74muMkVdMYoR65lhmdzy13 |
     | Panorama | IZ*ONE | 3:42 | 0CnpSTdL9l5vQM4YnzXtyo |
     | Still With You | Jung Kook | 3:59 | 0eFMbKCRw8KByXyWBw8WO7 |
     | Ride | HYBS | 3:01 | 37HhnXqIRFSSJXWsysl6B7 |
     | love. | wave to earth | 5:07 | 5mtTAScDytxMMqZj14NmlN |
     | the perfect pair | beabadoobee | 2:57 | 41P6Tnd8KIHqON0QIydx6a |
     | Leave The Door Open | Bruno Mars, Anderson .Paak, Silk Sonic | 4:02 | 4pryE6cN2gFL1FVF5fYINl |
     | Atmosphere | FISHER, Kita Alexander | 3:02 | 63HwAAXuSV2tzIUPoHOwZa |
     | Phonky Town | PlayaPhonk | 2:21 | 5mnpMkzp3Z2RCCbwIEZCbv |

     If Mark edits the playlist later, the embed updates by itself, but the searchable list has to be updated by hand.

9. **hello.txt fact icons**, authored SVG in the existing stroke style:
   - a graduation cap for "3rd Year BSIT Student";
   - a map pin for "Parañaque City, Philippines";
   - `</>` code brackets for "Web & App Development".
   The green status dot is removed.

10. **Desktop and taskbar icons**: Projects keeps the folder, About becomes an ID card, Skills a toolbox, Contact an envelope, and Music the Spotify mark. All are authored SVG at 52px, drawn from the wallpaper palette (per DESIGN.md's Wallpaper Hue rule).

11. **Hamster mascot**
    - An authored inline SVG hamster, about 26px tall, at the left of the menubar in place of the "markOS" text. The markOS menu (GitHub, Instagram and Email links) now opens from the hamster button, with accessible name "markOS menu".
    - Idle animation: breathing, an occasional blink and an ear twitch, all CSS keyframes.
    - Every 20–40s, or when hovered or clicked, a speech bubble shows one line for about 4s, in Mark's voice:
      - "hi! i'm the markOS hamster"
      - "psst, open Projects"
      - "i run on sunflower seeds"
      - "Mark made this, lol"
      - "try the Music app"
      - "dark mode? yes please"
    - The bubble is `aria-live="polite"` and capped at one at a time.
    - With reduced motion: no idle animation, and the bubble appears only on hover or click.
    - On phones, the hamster sits in the status bar.

12. **Custom cursor**
    - SVG cursors via CSS `cursor: url(...) x y, <fallback>`: a rounded berry-outlined arrow by default, a pointer hand on links and buttons, the grab hand on title bars, and native resize cursors on handles. Text fields keep the native I-beam.
    - Desktop pointers only (`@media (pointer: fine)`). The fallback is always the native cursor.

13. **Phones**
    - The home screen keeps the hello widget plus an app grid of 5 tiles: Music (Spotify), About, Skills, Projects ★, Contact. This undoes the v1 Music-tile removal.
    - Apps open full-screen. The red button acts as Home, and minimize and maximize are hidden.
    - The boot screen plays once per session there too.

14. **One-click play.** Choosing a song in the list starts it playing, like a real player. This uses Spotify's official iFrame API, the embed's own controller script from `open.spotify.com/embed/iframe-api/v1`: `createController` once, then `loadUri(trackUri)` and `play()`, with the playlist URI loaded at start. It's Spotify's own embed, not a third-party library, and it's the only way to get "click to play". Browsers can still block autoplay; if play doesn't start, the embed's own play button works. Safari blocks third-party cookies by default, so most visitors will likely hear 30-second previews, and only signed-in Spotify users on permissive browsers get full tracks.
15. **Closing vs minimizing Music.** These work like real apps.
    - Minimize keeps the music playing. The taskbar icon shows a small animated "playing" bar while a song plays.
    - Close (red) pauses playback and keeps the controller, so reopening is instant and nothing plays unseen.
    - On phones, Home acts like minimize: music keeps playing, and the Music tile shows the playing bar.
16. **Hamster bubbles and screen readers.** Timed bubbles are visual only (`aria-hidden`), so they never interrupt a screen reader. A bubble from hovering or focusing the hamster is announced through one `aria-live="polite"` region. Clicking the hamster only opens the markOS menu, with no bubble, so the two never overlap.
17. **Phone title bar.** Phones keep the labelled "‹ Home" control (44px, berry) and hide all three dots. A bare red dot would lose the visible "Home" wording.
18. **Builder settles:**
    - The boot overlay is marked from the head script, under the `html.js` guard.
    - `/#music` opens the Music window.
    - The URL hash during minimize and restore.
    - Music also appears in the desktop icon column.
    - The embed's height.
    - Without JS, the track list still shows as plain text beside the "Listen on Spotify" link.

## Left to the builder

- Exact SVG drawings (hamster, icons, cursors) and boot timings within about 1.5s total.
- Taskbar icon size and spacing.
- The resize-handle implementation details.
- The minimize animation curve.
- How the window state (minimized, maximized, previous geometry) is stored in `windows.mjs`.
- The exact search normalization.

All of this must stay within DESIGN.md's tokens, and DESIGN.md is updated at the end to reflect v2.
