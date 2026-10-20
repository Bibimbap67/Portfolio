# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Classmates and friends:** people who know Mark and come for the fun and the personality. They browse casually, often on a phone, and enjoy poking at things.
- **Potential freelance clients:** people deciding whether Mark can build their small website. They need to see real, working projects fast and find a way to contact him.

Recruiters and professors are not the primary audience right now, but they will see the same site.

## Product Purpose

The personal portfolio of Mark Panolin, a 3rd-year BS Information Technology student at National University (MOA campus) in Parañaque City, Philippines, who works on web and app development. It shows who he is, what he works with, and what he has built, and it makes contacting him easy.

Success: a visitor's first reaction is "this is simple but unique", not "this is it??". A prospective client reaches the live projects and the contact details without hunting.

## Positioning

The site is itself a demonstration of Mark's front-end craft and personality. It's built as **markOS**, a small desktop where his portfolio sections are apps and windows, and navigation is an album, *Simple, Complicated*. The interface is the proof that he can build interactive, polished web experiences.

## Operating Context

- Visitors arrive by a shared link, from social media, school or direct messages, on phones as often as on desktops.
- Each project links out to its own live deployment or repository. Evaluating Mark means clicking through to those.
- Contact is by email, GitHub and Instagram. There's no contact form.

## Capabilities and Constraints

- Static HTML, CSS and vanilla JavaScript, deployed on Vercel (`cleanUrls`). No framework, no build step, no runtime dependencies.
- Vercel Analytics is installed. Per-section analytics are not needed.
- All content must stay readable without JavaScript.
- Design spec: `docs/superpowers/specs/2026-10-20-markos-redesign-design.md`.

## Brand Commitments

- **Name:** Mark Panolin. The site's in-world name is markOS.
- **Voice:** casual, playful and self-deprecating. Signature line: "I love making simple things complicated, and complicated things simple, lol." Project descriptions joke about themselves ("Basically, Netflix… but made by me."). Keep this voice and don't make it corporate.
- **Identity:** K-pop (aespa and others) is part of who he is and shows up in his projects.
- **Assets:** project screenshots in `img/projects/`; GIFs from Giphy and Tenor used as his photos.

## Evidence on Hand

- Six projects with live links and screenshots: NotFlix, How fast can you click, Capitally, Aespa fandom site, Who's your bias?, Social Profile. There's also one joke "coming soon" card.
- Skills grouped as Languages, Web Technologies, Database, and Tools/Frameworks.
- Education: BS Information Technology, National University (MOA campus).
- **Absent:** testimonials, clients, employers, metrics and awards. Never invent any of these.

## Product Principles

1. **Personality is the proof.** The site should feel unmistakably like Mark, and its craft is the portfolio piece.
2. **Simple before clever.** Few objects, calm space. Every playful element must still get the visitor to the content quickly.
3. **Projects within reach.** A prospective client is never more than one or two actions away from live projects and contact.
4. **Opt-in delight.** Sound and playful extras never ambush the visitor. They are discovered or switched on.

## Accessibility & Inclusion

WCAG 2.1 AA: contrast in both light and dark themes, full keyboard access (dragging is never required), respect for `prefers-reduced-motion`, and sound off by default.
