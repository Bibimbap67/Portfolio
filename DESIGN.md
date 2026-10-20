---
name: markOS
description: Mark Panolin's portfolio as a small personal desktop, navigated by an album.
colors:
  pressed-berry: "#ad2d6c"
  on-berry: "#ffffff"
  periwinkle-wall: "#c3cdff"
  bubblegum-wall: "#f4bfe0"
  butter-wall: "#fff0a8"
  window-white: "#ffffff"
  titlebar-lilac: "#f5f3fb"
  lilac-tint: "#efeaf8"
  ink: "#1b1726"
  ink-muted: "#5a536a"
  edge: "rgb(27 23 38 / 0.14)"
  sticky-butter: "#fff0a8"
  sticky-ink: "#2a2414"
  folder-blue: "#8a9cf0"
  folder-edge: "#4a5bb8"
  online-green: "#2f8a4c"
  night-berry: "#f6a3cf"
  night-wall-indigo: "#23285a"
  night-wall-plum: "#4a2150"
  night-wall-violet: "#3b2257"
  night-window: "#17141f"
  night-titlebar: "#201c2b"
  night-tint: "#2a2438"
  night-ink: "#f4f0fa"
  night-ink-muted: "#b6aec6"
  night-edge: "rgb(255 255 255 / 0.12)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.4rem, 4.4vw, 3.7rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.9rem, 3vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Bricolage Grotesque, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Bricolage Grotesque, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 600
  data:
    fontFamily: "IBM Plex Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "0.85rem"
    fontWeight: 500
rounded:
  tag: "4px"
  control: "8px"
  card: "10px"
  window: "12px"
  app-tile: "16px"
  widget: "22px"
  round: "50%"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "28px"
components:
  button-primary:
    backgroundColor: "{colors.pressed-berry}"
    textColor: "{colors.on-berry}"
    rounded: "{rounded.card}"
    padding: "10px 18px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.window-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "10px 18px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "{colors.lilac-tint}"
  window:
    backgroundColor: "{colors.window-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.window}"
    padding: "24px"
  window-titlebar:
    backgroundColor: "{colors.titlebar-lilac}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.data}"
    padding: "6px 8px 6px 16px"
    height: "40px"
  track-row:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "6px 8px"
    height: "40px"
  track-row-current:
    backgroundColor: "{colors.lilac-tint}"
  skill-chip:
    backgroundColor: "{colors.lilac-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "4px 12px 4px 4px"
  sticky-note:
    backgroundColor: "{colors.sticky-butter}"
    textColor: "{colors.sticky-ink}"
    padding: "16px 18px 18px"
    width: "196px"
  app-tile:
    rounded: "{rounded.app-tile}"
    size: "60px"
---

# Design System: markOS

## Overview

**Creative North Star: "The Pastel Desktop"**

The whole site is a small personal computer. A soft printed wallpaper (periwinkle into bubblegum into butter, at 135 degrees, overlaid with fractal film grain) sits under crisp windows that behave like real ones: they open, focus, drag and close. Sections are apps, the navigation is an album's tracklist, and the chrome (menubar, titlebars, clock, folder icons, a sticky note) is the decoration. Nothing ornamental exists outside that computer metaphor.

Density is calm. Few objects on screen, generous window padding, one accent. Playfulness comes from the world (the album cover, the todo note, the GIF portraits, the self-deprecating copy), not from effects. At night the same wallpaper hues deepen to indigo, plum and violet, windows turn ink, and the berry accent lightens to a pastel pink so it holds contrast.

Without JavaScript, or below 721px, the same markup reads as a plain stacked column of windows; on phones with JavaScript it becomes a home screen (status bar, hello widget, app grid, now-playing widget) and opened apps take the full screen.

**Key Characteristics:**
- A desktop, not a web page: windows, menubar, folder icons and a sticky note are the layout.
- Grainy pastel gradient wallpaper; flat white (or ink) windows above it.
- One accent, pressed berry, reserved for the primary action, the title track and active states.
- Bricolage Grotesque for everything human; IBM Plex Mono only for machine data.
- Soft, diffuse window shadows; focus is shown by a deeper shadow, never a ring on the window.
- Motion is spatial and quick: windows grow out of whatever opened them.

## Colors

A pastel wallpaper world with near-white surfaces, violet-tinted ink neutrals, and a single saturated berry accent.

### Primary
- **Pressed Berry** (pressed-berry): the only accent. Primary button fill, the role line under the name, the title track (★ Projects) in the tracklist, the current track number, the progress fill, "Open" links on project files, contact link hover, the focus outline, text selection and the caret. In dark theme it becomes **Night Berry** (night-berry) with ink text on top.

### Secondary
- **Folder Blue** (folder-blue, with folder-edge stroke): desktop folder icons only. It is the wallpaper's periwinkle deepened so folders read as objects on it.
- **Online Green** (online-green): the status dot beside "3rd Year BSIT Student", with a 22% halo ring. Nowhere else.

### Neutral
- **Wallpaper trio** (periwinkle-wall, bubblegum-wall, butter-wall): the 135-degree desktop gradient, stops at 0, 55% and 100%. Dark: night-wall-indigo, night-wall-plum, night-wall-violet.
- **Window White** (window-white): window bodies, menus, the base of the secondary button. Dark: night-window.
- **Titlebar Lilac** (titlebar-lilac): window titlebars. Dark: night-titlebar.
- **Lilac Tint** (lilac-tint): every hover and selected background (menu items, track rows, file cards, skill chips, the "soon" placeholder). Dark: night-tint.
- **Ink** (ink) and **Ink Muted** (ink-muted): body text and secondary text (titles of unfocused windows, captions, meta, definition labels). Dark: night-ink, night-ink-muted.
- **Edge** (edge): every 1px border and divider, as translucent ink so it works on any surface.
- **Sticky Butter** (sticky-butter) with **Sticky Ink** (sticky-ink): the sticky note only; it shares the wallpaper's butter.

### Named Rules
**The One Berry Rule.** Berry marks exactly one thing per context: the primary action, the title track, the current state. If two berry items compete in one window, one of them is wrong.

**The Wallpaper Hue Rule.** Any new decorative color (app tiles, folders, notes) is drawn from the wallpaper's own periwinkle, pink and butter. The phone's Projects tile is the one berry tile, because Projects is the title track.

**The Translucent Edge Rule.** Borders and dividers are ink at 14% (white at 12% at night), never a solid gray, so they sit correctly on white, lilac and tint alike.

## Typography

**Display Font:** Bricolage Grotesque (weights 400, 600, 800; with system-ui fallback)
**Data Font:** IBM Plex Mono (weights 400, 500; with ui-monospace fallback)

**Character:** Bricolage carries the voice: heavy, tightly tracked display at 800 against relaxed 400 body. Plex Mono is the operating system talking: filenames, the clock, track numbers and durations.

### Hierarchy
- **Display** (800, clamp(2.4rem, 4.4vw, 3.7rem), 0.95, -0.035em): the name in hello.txt only, balanced. On phones clamp(2rem, 9vw, 2.6rem). The "Hi, I'm" lead-in inside the same heading is 400 weight, muted, clamp(1rem, 1.8vw, 1.5rem).
- **Headline** (800, clamp(1.9rem, 3vw, 2.6rem), 1, -0.03em): the Contact window heading.
- **Title** (700-800, 1.3-1.5rem, -0.015 to -0.02em): album title (1.45rem), System Info lead (1.5rem), project file names (1.3rem, 700).
- **Body** (400, 1rem, 1.55): prose capped at 62ch in About; the hello line is 1.12rem at 36ch.
- **Label** (600, 0.85-0.9rem): buttons (600 at body size), definition terms in muted ink, stack lines, desktop icon labels, menubar toggles.
- **Data** (Plex Mono 500, 0.8-0.85rem): window titles, the clock, track numbers and durations.

### Named Rules
**The Machine Voice Rule.** Mono is for data the computer would print (filenames, times, counts). Never set prose, headings or buttons in mono.

**The Heavy-or-Regular Rule.** Display and titles are 800 (700 for file names); body is 400; labels and buttons are 600. No light weights.

## Layout

Two layouts from one document. Base styles (no JS, or any width without the desktop query) are a single centered column, max 980px, 32px top and 64px bottom padding, windows stacked with a 28px gap.

**Desktop (721px and up, with JS):** the menubar is fixed at 36px; the desktop fills the rest of the viewport and does not scroll. Windows are absolutely positioned in viewport units with min() widths (hello.txt about 46vw up to 580px at upper left; Music up to 480px tucked 20px under hello's right edge, a margin smaller than hello's 24px padding so text is never covered). Windows cap at the viewport height minus 32px and scroll inside. Folder icons run down the right edge (20px from top, 18px from right, 6px apart); the sticky note sits lower left, below all windows.

**Phone (720px and below, with JS):** the bar grows to 48px; hello.txt and Music become borderless-titlebar widgets with 22px corners, with a 4-column app grid between them (60px tiles, 22px row gap). Opened apps fill the screen under the bar, with a centered mono title and a berry "back" control at left. Touch targets grow to 44-48px.

Window bodies pad 24px (18px on phones). Inner grids pair a fixed media column with a fluid text column (148px photo in hello, 200px in About, 180px GIF in Contact, a clamp(88px, 11vw, 140px) album cover) and collapse to one column on phones. Definition rows use a 120-170px label column with 12-14px vertical padding and edge dividers. Project files use auto-fill columns, min 250px.

## Elevation & Depth

Depth is the desktop's z-order. The wallpaper is the floor, the sticky note and folder icons lie on it, windows float above, and the focused window floats highest. Shadows are soft and diffuse with a violet-tinted ink (pure black at night), two layers each: a tight contact shadow and a long negative-spread drop. The menubar is the only translucent surface (window color at 72%, 14px backdrop blur with 1.4 saturation).

### Shadow Vocabulary
- **Window** (`0 2px 6px rgb(40 24 70 / 0.08), 0 22px 44px -20px rgb(40 24 70 / 0.38)`): every window at rest, menus, and lifted project thumbnails on hover.
- **Focused window** (`0 2px 8px rgb(40 24 70 / 0.1), 0 30px 60px -22px rgb(40 24 70 / 0.5)`): the frontmost window, together with its title switching from muted to full ink.
- **Paper** (`0 2px 4px rgb(0 0 0 / 0.08), 0 16px 26px -16px rgb(0 0 0 / 0.45)`): the sticky note, rotated 3 degrees.
- **Album cover** (`0 2px 4px rgb(27 23 38 / 0.18), 0 14px 24px -14px rgb(27 23 38 / 0.6)`): the cover art in Music.
- **App tile** (`0 1px 2px rgb(0 0 0 / 0.12), 0 10px 18px -10px rgb(40 24 70 / 0.55)`): phone home-screen tiles.

### Named Rules
**The Focus Is Height Rule.** The focused window is shown by a deeper shadow and a darker title, never by an outline. Keyboard focus rings (2px berry, 2px offset) belong to controls inside windows.

**The Soft Shadow Rule.** Every shadow is a blurred, negative-spread drop. No hard offset shadows, no glows.

## Shapes

Rounded rectangles that nest: windows 12px, cards, buttons, photos and menus 10px, controls and track rows 8px, focus rings and menu items 6px, label backings 4px. Phone widgets and app tiles soften to 22px and 16px, the phone's own idiom. Circles are reserved for the play button, the status dot, the menu's gradient dot, and the phone avatar. Opened phone apps drop to 0 radius and no border. The sticky note is the one square, rotated object. The "coming soon" project card uses a 1.5px dashed edge to read as a placeholder. Icons are authored SVG strokes (1.8 stroke, round caps and joins, 1.1em).

## Components

### Buttons
Solid, friendly, and few: hello.txt carries the only pair.
- **Shape:** gently rounded (10px), at least 44px tall, 10px 18px padding, 8px icon gap, 600 weight.
- **Primary:** berry fill, white text, no border; a filled star icon follows the label. Hover mixes 14% ink into the berry.
- **Secondary:** window surface with a 1px edge; hover fills with lilac tint.
- **Press:** both drop 1px on :active. Transitions run 180ms on the strong ease-out.

### Windows
The signature container.
- **Corner Style:** 12px, 1px edge, window shadow, overflow clipped.
- **Titlebar:** 40px min, lilac bar with an edge divider, mono filename title in muted ink (full ink when focused), a 30px close control at right (berry "back" at left on phones). On desktop the bar is the drag handle (grab cursor).
- **Body:** 24px padding, scrolls internally with contained overscroll.
- **Motion:** opening grows the window out of the element that opened it, scale 0.55 to 1 and blur 8px to 0 over 300ms on cubic-bezier(0.16, 1, 0.3, 1); closing runs 170ms on an ease-in. With reduced motion it is an opacity fade only (120ms in, 100ms out).

### Navigation
- **Menubar:** 36px translucent strip. Left: the "markOS" menu (800 weight, with a 10px wallpaper-to-berry gradient dot) opening a 180px dropdown of section links. Right: the mono clock, then Dark and Sound toggles (icon plus label, 8px radius, tint on hover, berry when pressed). Sound is synthesized and off by default.
- **Tracklist:** the album is the main navigation. Rows are a three-column grid (mono number, title, mono duration), 40px min, 8px radius, tint on hover. The title track's name is berry with a filled star; the current track gets a tint background, 700 weight and a berry number.
- **Desktop icons:** 92px wide, 52px authored folder SVGs in folder blue, labels on a 55% window-colored backing with 4px corners.

### Cards / Containers
- **Project file:** 10px padding, 12px corners, no border, tint on hover. A 16:10 thumbnail with 8px corners and an edge border lifts 3px and gains the window shadow on hover. Below it: a 1.3rem title, muted description, a 600-weight stack line, and a berry "Open" link pinned to the bottom.
- **Skill chip:** tint pill-ish row (10px corners) holding a 32px devicon on a white 7px-rounded plate (white in both themes, because the logos assume a light ground).

### Music Player
The album window: cover art, title, meta line, tracklist, then a now-playing row (36px round ink play button, ellipsized track name, a 4px progress bar filling with berry on a 400ms ease-out).

### Sticky Note
196px butter square with sticky ink, 3-degree rotation, paper shadow, bold todo heading and stroke checkbox icons. It always sits beneath the windows.

### Phone App Tiles
60px tiles with 16px corners and wallpaper-hue gradients at 160 degrees (periwinkle, butter, pink; berry for Projects), 28px white or ink icons, labels on a translucent backing. They press to scale 0.94.

## Do's and Don'ts

### Do:
- **Do** put every new section in a window: titlebar with a mono filename, 12px corners, 1px edge, window shadow, 24px body.
- **Do** use lilac tint as the single hover and selected background.
- **Do** keep berry to one meaning per context: primary action, title track, current state.
- **Do** define new colors in both themes; dark lifts the accent to night berry with ink text on it.
- **Do** open windows from their opener with the 300ms scale-and-blur grow, and fall back to opacity only under reduced motion.
- **Do** keep everything readable as a stacked column without JavaScript.
- **Do** draw icons as stroked SVG in the sprite (1.8 stroke, round caps).

### Don't:
- **Don't** set prose, headings or buttons in IBM Plex Mono.
- **Don't** put a focus outline on a whole window; focus is the deeper shadow and darker title.
- **Don't** use hard offset shadows or glows.
- **Don't** introduce a second accent hue; new decoration borrows wallpaper hues.
- **Don't** use solid gray borders; edges are translucent ink.
- **Don't** play sound unless the visitor switched it on.
