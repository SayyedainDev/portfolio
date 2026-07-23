---
name: "Muhammad Sayyedain AI Portfolio"
description: "A daylight examination workshop for an applied AI and GenAI engineer — porcelain canvas, amber instruments, petrol counterpoint."
colors:
  background: "oklch(100% 0 0)"
  surface: "oklch(96.6% 0.006 45)"
  surfaceDeep: "oklch(93.2% 0.009 45)"
  ink: "oklch(23.5% 0.015 40)"
  inkSoft: "oklch(34% 0.018 40)"
  muted: "oklch(45% 0.02 40)"
  line: "oklch(88.5% 0.009 45)"
  lineStrong: "oklch(76% 0.014 45)"
  amber: "oklch(62% 0.185 40)"
  amberFill: "oklch(50% 0.16 38)"
  amberTint: "oklch(95.5% 0.024 45)"
  amberBright: "oklch(78% 0.14 45)"
  petrol: "oklch(42% 0.115 235)"
  petrolDeep: "oklch(24% 0.05 240)"
  petrolTint: "oklch(94.5% 0.02 235)"
  onColor: "oklch(100% 0 0)"
typography:
  display:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(2.8rem, 9.5vw, 4.9rem)"
    fontWeight: 660
    fontStretch: "118%"
    lineHeight: 1.03
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 3.3rem)"
    fontWeight: 640
    fontStretch: "115%"
    lineHeight: 1.06
    letterSpacing: "-0.022em"
  title:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "clamp(1.45rem, 3.4vw, 2.1rem)"
    fontWeight: 620
    fontStretch: "112%"
    lineHeight: 1.12
    letterSpacing: "-0.016em"
  body:
    fontFamily: "Source Sans 3, Segoe UI, sans-serif"
    fontSize: "clamp(1.02rem, 1rem + 0.18vw, 1.15rem)"
    fontWeight: 400
    lineHeight: 1.66
  label:
    fontFamily: "Archivo, Arial Narrow, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 640
    fontStretch: "105%"
    lineHeight: 1.4
    letterSpacing: "0.012em"
rounded:
  control: "10px"
  panel: "18px"
  chip: "999px"
spacing:
  gutterMobile: "20px"
  gutterTablet: "34px"
  gutterDesktop: "48px"
  section: "clamp(5rem, 9vw, 8.5rem)"
components:
  buttonPrimary:
    backgroundColor: "{colors.amberFill}"
    textColor: "{colors.onColor}"
    rounded: "{rounded.control}"
    minHeight: "48px"
  buttonSecondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    borderColor: "{colors.lineStrong}"
    rounded: "{rounded.control}"
    minHeight: "48px"
  panel:
    backgroundColor: "{colors.background}"
    borderColor: "{colors.line}"
    rounded: "{rounded.panel}"
  statusPill:
    backgroundColor: "{colors.background}"
    borderColor: "{colors.lineStrong}"
    rounded: "{rounded.chip}"
---

# Design System: Muhammad Sayyedain AI Portfolio

## Creative North Star

**"The Daylight Workshop."**

A recruiter opens the portfolio at 11am between two interviews and finds a sunlit
examination workshop: a white museum table, amber-glass instruments, precise soft
shadows. The examination metaphor comes from CACE — a real export invoice is read,
checked against policy, and stamped for human review — but the lights are on. The
drama comes from dimensional porcelain planes and honest architecture, not from a
dark terminal costume.

The interface is warm, precise, and forward-looking. Futurism is carried by CSS 3D
depth, engineered wide-stance type, and one choreographed entrance — never by
glow, particles, or mono-annotation fog.

## Visual Strategy

- **Committed light palette:** pure white carries the site. Amber is the identity
  color (flagged fields, review stamps, primary actions, the drenched contact
  close). Petrol blue is the cool structural counterpoint (retrieval, evaluation,
  the dark training panel). Nothing else.
- **One dominant hero effect:** the CACE examination scene — table plane, invoice
  sheet with a flagged row, three plain-language process chips, and a REVIEW stamp
  that physically stamps in on load. Pointer tilt ≤8°.
- **Emphasis follows importance:** CACE gets the flagship full-width panel;
  Production RAG a split composition; FLAN-T5 and PalPath compact panels. The
  loudest moments (hero scene, amber close) belong to the work and the contact,
  not to coursework.
- **No fake UI, no fake numbers:** diagrams explain verified architecture with
  readable labels (nothing below 0.68rem). No invented metrics or bar charts.
- **Status is structural:** every project carries a status pill (dot + words) and
  an evidence-boundary note. Honesty is the differentiator; keep it visible.

## Color Roles

- **White canvas:** the workshop under daylight. Porcelain surfaces (96.6%, 93.2%)
  are panels, scene floors, and the capability/training chapters.
- **Warm ink ramp:** body text at 16.7:1; ink-soft and muted for supporting copy
  (both ≥ 4.5:1 on white and on porcelain).
- **Amber (62%):** large display accents, dots, flags — 3:1, large/graphic use only.
- **Amber-fill (50%):** buttons, links, stamps, the drenched footer — always with
  white text (6.4:1).
- **Petrol (42%):** retrieval/evaluation accents and labels; white text on fills.
- **Petrol-deep (24%):** the one dark panel (training phases) and the PalPath
  X-ray stage — an honest dark environment, not a theme.

Gradient text is prohibited. Text on saturated fills is white, never dark.

## Typography

Archivo Variable (weight 100–900, width 62–125%) speaks in a confident, slightly
expanded voice: display and headings at 115–118% width, small labels at 104–106%.
Source Sans 3 explains, at a base of ~1.05rem with 1.66 line-height. There is no
monospace font: machine flavor is carried by content (CASE 024, field rows,
pipeline steps), not by a costume typeface.

- Display tops out at ~4.9rem, tracking never tighter than -0.028em, line-height ≥ 1.02.
- Section headings top out at ~3.3–4.2rem.
- Body stays under 65ch; headings use `text-wrap: balance`, prose `text-wrap: pretty`.
- Absolute floor for readable text: 0.74rem (`--fs-micro`), used only inside diagram chrome.

Every font-size in the codebase comes from the tokenized scale in `:root` —
never a literal. The steps: `--fs-micro` 0.74rem · `--fs-caption` 0.8rem ·
`--fs-meta` 0.86rem · `--fs-small` 0.92rem · `--fs-control` 0.98rem ·
`--fs-lead` 1.12rem · `--fs-body` / `--fs-body-lg` (fluid) · `--fs-title-sm` ·
`--fs-title` · `--fs-subhead` · `--fs-headline` · `--fs-statement` ·
`--fs-display`, plus `--fs-menu`, `--fs-email`, `--fs-numeral` one-offs.
Radii likewise: `--r-xs` 4px · `--r-sm` 8px · `--r-control` 10px ·
`--r-inner` 12px · `--r-panel` 18px · `--r-chip` pill.

## Layout and Rhythm

- Mobile: single reading column, 20px gutters, full-width CTAs, the "currently
  building CACE" line stays visible.
- 760px introduces the split hero and project compositions; 1120px widens gutters
  to 48px inside a 1400px canvas.
- Section openers vary deliberately: hero statement → oversized work statement +
  honesty aside → capability ledger with sticky side heading → working-notes list
  → training chapter with kicker → journey year-spine → about pull-quote → amber
  drench. No repeated eyebrow-label scaffolding.
- Numbers appear only where order is information: pipeline steps, training weeks,
  case-study decision lists.

## Components

### Header

Sticky white header with the amber MS mark, five section links (active = amber
underline), and an always-available amber "Let's talk" action from 760px. The
mobile menu is an opaque white sheet with large Archivo links and a full-width
amber contact button; focus is trapped, Escape closes.

### Hero Examination Scene

CSS 3D only. A porcelain table plane (rotateX 58°), a white invoice sheet with an
amber-flagged Net weight row and a stamped REVIEW, and three plain-language chips
(Read the documents / Check against policy / A person decides). Entrance
choreography moves elements (y/scale/rotate) but never hides them — content is
fully visible even if no animation frame is ever delivered.

### Project Panels

A shared white panel frame (1px line border, 18px radius) with three deliberate
scales: flagship (CACE), split (Production RAG), compact pair (FLAN-T5, PalPath).
Artifacts sit on porcelain with readable toplines, five-step numbered pipelines,
and status footers. Scene pieces float with soft shadows (shadow OR border, never
a 1px border plus a wide blur). Pointer tilt ≤5°.

### Capability Ledger

A sticky side heading and four rule-separated groups; evidence tools are quiet
petrol labels. No icon cards, no bars, no numbering.

### Training Chapter

Porcelain section with a petrol kicker; the 13-week path is one deep-petrol
rounded panel with amber-bright week numbers — the site's single contained dark
moment, at conversational volume.

### Contact Close

The footer drenches in amber-fill with white text: availability line, a decisive
heading, and an oversized email row. This is the loudest color moment on the site.

## Motion

- One orchestrated hero entrance: table settles, sheet rises, chips stagger in,
  stamp springs (stiffness 320, damping 19). ~1.4s total.
- Pointer tilt: spring-based, ≤8° hero, ≤5° artifacts, disabled for touch.
- One measured scan line inside the PalPath X-ray stage.
- Controls: 160–200ms ease-out; no bounce outside the single stamp spring.
- Scroll progress: a 2px amber bar.
- Entrances animate transform only — nothing is opacity-gated; all content is
  present in the first render.
- `prefers-reduced-motion` disables tilt, entrance choreography, the stamp
  spring, scanning, and smooth scrolling.

## Accessibility and Performance

- Semantic landmarks, one route-level `h1`, ordered headings, skip link, visible
  focus (amber-fill outline; white on color surfaces), 44px targets.
- Status never relies on color alone — every dot has words next to it.
- 3D uses CSS transforms only; scenes carry `role="img"` with a descriptive label
  and decorative internals are `aria-hidden`.
- Self-hosted variable fonts (`archivo-variable-latin.woff2`,
  `source-sans-3-latin.woff2`) with `font-display: swap`; both preloaded.
- Body ink 16.7:1, muted 7.5:1, white-on-amber-fill 6.4:1, white-on-petrol 8:1,
  white-on-petrol-deep 16.4:1 — verified.
- No horizontal overflow; stable at 200% zoom.

## Do Not

- Do not reintroduce IBM Plex Mono or any monospace label system, tiny (<0.68rem)
  annotations, or the label-above-every-heading eyebrow grammar.
- Do not number things that are not sequences.
- Do not add gradient text, glassmorphism, particles, glowing borders, orbiting
  decorations, neural-network imagery, brains, robots, sparkles, or rockets.
- Do not put dark text on amber or petrol fills; use white.
- Do not invent repository links, metrics, benchmark bars, testimonials, clients,
  or production claims; keep every status and evidence boundary truthful.
- Do not pair a 1px border with a wide blurred shadow, or exceed 18px radius on
  ordinary panels.
- Do not gate any content's visibility behind an animation.
