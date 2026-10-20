---
name: markOS
description: Mark Panolin's portfolio as a small personal desktop with windows, a taskbar and a hamster.
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
  icon-periwinkle: "#d3dbff"
  icon-pink: "#fbdcee"
  icon-butter-edge: "#8a6a12"
  light-close: "#ff5f57"
  light-min: "#febc2e"
  light-max: "#28c840"
  spotify-green: "#1ed760"
  spotify-ink: "#121212"
  boot-field: "#120f1a"
  hamster-fur: "#e8a46a"
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
    fontSize: "1.5rem"
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
  app-tile: "15px"
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
  window-maximized:
    rounded: "0px"
  window-titlebar:
    backgroundColor: "{colors.titlebar-lilac}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.data}"
    padding: "6px 8px 6px 16px"
    height: "40px"
  light-close:
    backgroundColor: "{colors.light-close}"
    rounded: "{rounded.round}"
    size: "12px"
  light-minimize:
    backgroundColor: "{colors.light-min}"
    rounded: "{rounded.round}"
    size: "12px"
  light-maximize:
    backgroundColor: "{colors.light-max}"
    rounded: "{rounded.round}"
    size: "12px"
  taskbar:
    height: "52px"
  taskbar-button:
    rounded: "{rounded.card}"
    size: "44px"
  taskbar-button-focused:
    backgroundColor: "{colors.lilac-tint}"
  search-field:
    backgroundColor: "{colors.lilac-tint}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "10px 14px"
    height: "44px"
  song-row:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "8px"
  song-row-current:
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
  hamster-bubble:
    backgroundColor: "{colors.window-white}"
    textColor: "{colors.ink}"
    padding: "8px 12px"
  app-tile:
    rounded: "{rounded.app-tile}"
    size: "54px"
  app-tile-music:
    backgroundColor: "{colors.spotify-green}"
    textColor: "{colors.spotify-ink}"
    rounded: "{rounded.app-tile}"
    size: "54px"
  boot-screen:
    backgroundColor: "{colors.boot-field}"
    textColor: "{colors.night-ink}"
---

# Design System: markOS

## Overview

**Creative North Star: "The Pastel Desktop"**

The whole site is a small personal computer. A soft printed wallpaper (periwinkle into bubblegum into butter, at 135 degrees, overlaid with fractal film grain) sits under crisp windows that behave like real ones: they open, focus, drag, resize, minimize to the taskbar, maximize and close. Sections are apps. Navigation is the computer's own: desktop icons down the right edge, a taskbar along the bottom, and hello.txt's two buttons. The chrome (menubar, traffic lights, titlebars, clock, taskbar, folder icons, a sticky note, a hamster) is the decoration. Nothing ornamental exists outside that computer metaphor.

Density is calm. At load only hello.txt is open; everything else waits behind an icon. One accent, generous window padding, few objects. Playfulness comes from the world (the hamster that lives in the menubar and runs the boot wheel, the todo note, the GIF portraits, the self-deprecating copy), not from effects. At night the same wallpaper hues deepen to indigo, plum and violet, windows turn ink, and the berry accent lightens to a pastel pink so it holds contrast.

Without JavaScript, or below 721px, the same markup reads as a plain stacked column of windows; on phones with JavaScript it becomes a home screen (status bar, hello widget, app grid) and opened apps take the full screen.

**Key Characteristics:**
- A desktop, not a web page: windows, menubar, taskbar, folder icons and a sticky note are the layout.
- Grainy pastel gradient wallpaper; flat white (or ink) windows above it.
- One accent, pressed berry, reserved for the primary action, the Projects star and the focused or current state.
- Two borrowed palettes, each confined to its object: mac traffic lights in titlebars, Spotify green on Spotify.
- Bricolage Grotesque for everything human; IBM Plex Mono only for machine data.
- Soft, diffuse window shadows; focus is shown by a deeper shadow, never a ring on the window.
- Motion is spatial and quick: windows grow out of whatever opened them and shrink into their taskbar icon.

## Colors

A pastel wallpaper world with near-white surfaces, violet-tinted ink neutrals, a single saturated berry accent, and two small borrowed palettes that belong to the objects they come from.

### Primary
- **Pressed Berry** (pressed-berry): the only accent. Primary button fill, the role line under the name, the Projects star, the lit taskbar dot of the focused app, "Open" links on project files, contact link hover, pressed menubar toggles, the phone "Home" control, the focus outline, text selection, the caret, and the outline of the custom cursor. In dark theme it becomes **Night Berry** (night-berry) with ink text on top.

### Secondary
- **Folder Blue** (folder-blue, with folder-edge stroke): the Projects folder, on the desktop and in the taskbar. It is the wallpaper's periwinkle deepened so folders read as objects on it.
- **Icon wallpaper hues**: the About ID card is icon-periwinkle with a folder-edge stroke; the Skills toolbox and the hello.txt home icon are butter-wall with an icon-butter-edge stroke; the Contact envelope is icon-pink with a pressed-berry stroke. Desktop icons and taskbar icons wear the same pairs.

### Tertiary (borrowed, object-bound)
- **Traffic lights** (light-close, light-min, light-max): the three 12px titlebar dots, in mac order. Their glyphs (×, −, +) are 9px, 700 weight, black at 55%, and appear only on titlebar hover or keyboard focus.
- **Spotify Green** (spotify-green) with **Spotify Ink** (spotify-ink): the Spotify mark (desktop icon, taskbar icon, "Listen on Spotify" link) and the playing equaliser on the Music taskbar button. The phone Music tile is flat Spotify Green with a Spotify Ink mark and white equaliser bars.

### Neutral
- **Wallpaper trio** (periwinkle-wall, bubblegum-wall, butter-wall): the 135-degree desktop gradient, stops at 0, 55% and 100%. Dark: night-wall-indigo, night-wall-plum, night-wall-violet.
- **Window White** (window-white): window bodies, menus, the hamster's speech bubble, the base of the secondary button. Dark: night-window.
- **Titlebar Lilac** (titlebar-lilac): window titlebars. Dark: night-titlebar.
- **Lilac Tint** (lilac-tint): every hover and selected background (menu items, song rows, file cards, skill chips, taskbar buttons) and the search field's fill. Dark: night-tint.
- **Ink** (ink) and **Ink Muted** (ink-muted): body text and secondary text (unfocused window titles, captions, meta, definition labels, song artists and durations, hello.txt's fact icons, the open-app taskbar dot). Dark: night-ink, night-ink-muted.
- **Edge** (edge): every 1px border and divider, as translucent ink so it works on any surface.
- **Sticky Butter** (sticky-butter) with **Sticky Ink** (sticky-ink): the sticky note only; it shares the wallpaper's butter.
- **Boot Field** (boot-field): the boot overlay only, in both themes, with night-ink for the name, night-ink-muted for the status line, and night-berry for the wheel and progress fill.
- **Hamster Fur** (hamster-fur): the mascot's coat, with night-berry inner ears and ink eyes. The hamster is the same drawing in the menubar and on the boot wheel.

### Named Rules
**The One Berry Rule.** Berry marks exactly one thing per context: the primary action, the Projects star, the focused or current state. If two berry items compete in one window, one of them is wrong.

**The Wallpaper Hue Rule.** Any new decorative color (icons, app tiles, folders, notes) is drawn from the wallpaper's own periwinkle, pink and butter. The phone's Projects tile is the one berry tile, because Projects is the starred destination.

**The Borrowed Palette Rule.** Traffic-light colors live only in the three titlebar dots, and Spotify Green only on Spotify's mark and its playing indicator. Neither is ever text, a hover, a border or a state color anywhere else.

**The Translucent Edge Rule.** Borders and dividers are ink at 14% (white at 12% at night), never a solid gray, so they sit correctly on white, lilac and tint alike.

## Typography

**Display Font:** Bricolage Grotesque (weights 400, 600, 800; with system-ui fallback)
**Data Font:** IBM Plex Mono (weights 400, 500; with ui-monospace fallback)

**Character:** Bricolage carries the voice: heavy, tightly tracked display at 800 against relaxed 400 body. Plex Mono is the operating system talking: filenames, the clock, song durations and the boot status line.

### Hierarchy
- **Display** (800, clamp(2.4rem, 4.4vw, 3.7rem), 0.95, -0.035em): the name in hello.txt only, balanced. On phones clamp(2rem, 9vw, 2.6rem). The "Hi, I'm" lead-in inside the same heading is 400 weight, muted, clamp(1rem, 1.8vw, 1.5rem).
- **Headline** (800, clamp(1.9rem, 3vw, 2.6rem), 1, -0.03em): the Contact window heading.
- **Title** (700-800, 1.3-1.5rem, -0.015 to -0.02em): System Info lead and the boot screen's "markOS" (1.5rem, 800), project file names (1.3rem, 700).
- **Body** (400, 1rem, 1.55): prose capped at 62ch in About; the hello line is 1.12rem at 36ch.
- **Label** (600, 0.85-0.95rem): buttons (600 at body size), song titles, the hamster's bubble (0.95rem), definition terms in muted ink, stack lines, desktop icon labels, menubar toggles. Phone app labels drop to 0.75rem.
- **Data** (Plex Mono 500, 0.8-0.85rem): window titles, the clock, song durations, the boot status line.

### Named Rules
**The Machine Voice Rule.** Mono is for data the computer would print (filenames, times, durations, boot status). Never set prose, headings or buttons in mono.

**The Heavy-or-Regular Rule.** Display and titles are 800 (700 for file names); body is 400; labels and buttons are 600. No light weights.

## Layout

Two layouts from one document. Base styles (no JS, or any width without the desktop query) are a single centered column, max 980px, 32px top and 64px bottom padding, windows stacked with a 28px gap.

**Desktop (721px and up, with JS):** the menubar is fixed at 36px across the top and the taskbar at 52px across the bottom; the desktop fills the space between and does not scroll. Windows are absolutely positioned in viewport units with min() widths (hello.txt up to 580px, about 46vw, at upper left; Music up to 440px at mid-right, closed at load). Each window caps its height at the desktop minus its own top minus 8px, so it always stops above the taskbar, and scrolls inside. Desktop icons (Music, Projects, About, Skills, Contact) run down the right edge, 20px from the top, 18px from the right, 6px apart. The sticky note sits lower left beneath every window.

**Small desktops (721-1100px wide, or 760px tall or less):** the note is dropped rather than buried, and hello.txt compacts (up to 640px at 58vw, a 96px photo with no caption, 20px body padding, tighter vertical rhythm).

**Window states:** maximize fills the whole desktop area between menubar and taskbar; minimize removes the window from the desk while its taskbar dot stays lit. Resizing uses eight handles: 6px edge strips inset 12px from the corners and 14px corner squares, all sitting just inside the window edge. Minimum size is 320×220.

**Phone (720px and below, with JS):** the bar grows to 48px and holds the hamster, clock and icon-only toggles. hello.txt becomes a borderless-titlebar widget with 22px corners, followed by a 5-column app grid (54px tiles, 22px row gap). There is no taskbar. Opened apps fill the screen under the bar, with a centered mono title and a berry "Home" control at left; traffic lights and resize handles are hidden. Touch targets grow to 44-48px.

Window bodies pad 24px (18px on phones). Inner grids pair a fixed media column with a fluid text column (148px photo in hello, 200px in About, 180px GIF in Contact) and collapse to one column on phones. Definition rows use a 120-170px label column with 12-14px vertical padding and edge dividers. Project files use auto-fill columns, min 250px. The Music window stacks search, a scrolling song list (min 140px) and the embed with a 12px gap.

## Elevation & Depth

Depth is the desktop's z-order. The wallpaper is the floor, the sticky note and desktop icons lie on it, windows float above, and the focused window floats highest. The menubar and taskbar are the two translucent surfaces (window color at 72%, 14px backdrop blur with 1.4 saturation), pinned above every window; the boot overlay covers everything while it runs. Shadows are soft and diffuse with a violet-tinted ink (pure black at night), two layers each: a tight contact shadow and a long negative-spread drop.

### Shadow Vocabulary
- **Window** (`0 2px 6px rgb(40 24 70 / 0.08), 0 22px 44px -20px rgb(40 24 70 / 0.38)`): every window at rest, menus, the hamster's speech bubble, and lifted project thumbnails on hover.
- **Focused window** (`0 2px 8px rgb(40 24 70 / 0.1), 0 30px 60px -22px rgb(40 24 70 / 0.5)`): the frontmost window, together with its title switching from muted to full ink.
- **Paper** (`0 2px 4px rgb(0 0 0 / 0.08), 0 16px 26px -16px rgb(0 0 0 / 0.45)`): the sticky note, rotated 3 degrees.
- **App tile** (`0 1px 2px rgb(0 0 0 / 0.12), 0 10px 18px -10px rgb(40 24 70 / 0.55)`): phone home-screen tiles.

### Named Rules
**The Focus Is Height Rule.** The focused window is shown by a deeper shadow, a darker title and a widened berry dot under its taskbar icon, never by an outline. Keyboard focus rings (2px berry, 2px offset) belong to controls inside windows.

**The Soft Shadow Rule.** Every shadow is a blurred, negative-spread drop. No hard offset shadows, no glows.

## Shapes

Rounded rectangles that nest: windows and the Spotify embed 12px; cards, buttons, photos, menus, the search field and taskbar buttons 10px; controls and song rows 8px; focus rings and menu items 6px; label backings 4px. The hamster's bubble is 12px with a 4px corner at lower left pointing back to the hamster. A maximized window drops to 0 radius. Phone widgets and app tiles soften to 22px and 15px, the phone's own idiom. Circles are reserved for the traffic lights, the round phone avatar and the boot wheel. The taskbar dot is a 3px-tall pill, 5px wide when open and 14px when focused. Opened phone apps drop to 0 radius and no border. The sticky note is the one square, rotated object. The "coming soon" project card uses a 1.5px dashed edge to read as a placeholder.

Icons are authored SVG in one sprite: 1.8 stroke, round caps and joins, 1.1em inline. Desktop icons are 52px with a 1.2 stroke and a wallpaper-hue fill; taskbar icons are 26px at 1.5 stroke with the same fills. The Spotify mark is the one filled glyph.

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
- **Titlebar:** 40px min, lilac bar with an edge divider. Traffic lights sit at the left (close, minimize, maximize; 12px dots 8px apart, each a real button with a 24px hit area and a hairline inner ring), then the mono filename in muted ink (full ink when focused). On desktop the bar is the drag handle (grab cursor); double-click or the green light toggles maximize.
- **Body:** 24px padding, scrolls internally with contained overscroll.
- **States:** maximized fills the desktop at 0 radius with dragging and resizing off; minimized leaves only the lit taskbar dot.
- **Motion:** opening grows the window out of the element that opened it, scale 0.55 to 1 and blur 8px to 0 over 300ms on cubic-bezier(0.16, 1, 0.3, 1); closing runs 170ms on an ease-in. Minimizing uses the same closing shrink aimed at the app's taskbar icon, and restoring grows back out of it. With reduced motion it is an opacity fade only (120ms in, 100ms out).

### Navigation
- **Menubar:** 36px translucent strip. Left: the hamster (34×27px) is the markOS menu button, opening a 180px dropdown of GitHub, Instagram and Email links. Right: the mono clock, then Dark and Sound toggles (icon plus label, 8px radius, tint on hover, berry when pressed). Sound is synthesized and off by default.
- **Taskbar:** 52px translucent strip, centered 44px buttons 6px apart: the hello.txt home icon, Music, Projects, About, Skills, Contact. Hover and the focused app get lilac tint. A 5×3px muted dot under a button means open; it widens to 14px and turns berry when that app is focused. Native title tooltips name each app.
- **Desktop icons:** 92px wide, 52px authored icons in their wallpaper hues, labels on a 55% window-colored backing with 4px corners; hover lays a 45% window wash behind the whole icon.

### Inputs / Fields
- **Search:** full-width, 44px, 10px 14px padding, lilac tint fill, 1px edge, 10px corners; the berry focus ring sits flush (0 offset).

### Music
The Music window: search field, then a scrolling song list, then Spotify's embed (12px corners). Song rows are a two-row grid (600 title over a 0.85rem muted artist, mono duration at right), 8px padding and radius, tint on hover; the current song keeps the tint. Without JS a plain "Listen on Spotify" link with the green mark stands in. While a song plays, three 2.5px Spotify-green bars pulse on the Music taskbar button (white bars on the phone tile).

### Cards / Containers
- **Project file:** 10px padding, 12px corners, no border, tint on hover. A 16:10 thumbnail with 8px corners and an edge border lifts 3px and gains the window shadow on hover. Below it: a 1.3rem title, muted description, a 600-weight stack line, and a berry "Open" link pinned to the bottom.
- **Skill chip:** tint row (10px corners) holding a 32px devicon on a white 7px-rounded plate (white in both themes, because the logos assume a light ground).

### Hamster Mascot
An authored SVG hamster in the menubar with idle CSS life: a 3.2s breath, a blink every 5s, an ear twitch every 7s. It speaks through a window-white bubble (8px 12px padding, 600 weight, 1px edge, window shadow) that fades and drops 4px into place over 180ms, its mouth moving while it talks.

### Boot Screen
A full-screen boot-field overlay, once per session: the hamster hopping inside a 132px night-berry wheel that turns every 1.1s, "markOS" in 800 below, a 180×4px track (white at 15%) filling with night-berry over 1.4s, and a mono status line in muted night ink. It fades out over 260ms; any input skips it.

### Sticky Note
196px butter square with sticky ink, 3-degree rotation, paper shadow, bold todo heading and stroke checkbox icons. It always sits beneath the windows.

### Phone App Tiles
54px tiles with 15px corners and wallpaper-hue gradients at 160 degrees (periwinkle for About, butter for Skills, pink for Contact, berry for Projects with a berry star on its label), 28px icons, labels on a translucent backing. Music is flat Spotify Green with a Spotify Ink mark. Tiles press to scale 0.94.

### Cursors
On fine pointers only: a white arrow with a 1.6px berry outline, and a matching white pointer hand on links, buttons and icons. Text fields keep the native I-beam, resize handles the native resize cursors; the native cursor is always the fallback.

## Do's and Don'ts

### Do:
- **Do** put every new section in a window: traffic lights and a mono filename in the titlebar, 12px corners, 1px edge, window shadow, 24px body.
- **Do** give every new app a desktop icon and a taskbar button in the same wallpaper-hue fill and stroke pair.
- **Do** use lilac tint as the single hover and selected background.
- **Do** keep berry to one meaning per context: primary action, Projects star, focused or current state.
- **Do** define new colors in both themes; dark lifts the accent to night berry with ink text on it.
- **Do** open windows from their opener with the 300ms scale-and-blur grow, minimize them into their taskbar icon, and fall back to opacity only under reduced motion.
- **Do** keep everything readable as a stacked column without JavaScript.
- **Do** draw icons as stroked SVG in the sprite (1.8 stroke, round caps).

### Don't:
- **Don't** set prose, headings or buttons in IBM Plex Mono.
- **Don't** put a focus outline on a whole window; focus is the deeper shadow, darker title and berry taskbar dot.
- **Don't** use hard offset shadows or glows.
- **Don't** introduce a second accent hue; new decoration borrows wallpaper hues.
- **Don't** use traffic-light colors or Spotify Green outside their own objects, and never for text.
- **Don't** use solid gray borders; edges are translucent ink.
- **Don't** play sound unless the visitor switched it on.
