---
name: "Muhammad Sayyedain Portfolio"
description: "An editorial mobile product workshop for a Flutter developer."
colors:
  canvas: "#F7F5EF"
  surface: "#FFFFFF"
  ink: "#171A1D"
  ink-muted: "#4B5158"
  rule: "#CDD3D6"
  flutter: "#0866C6"
  flutter-deep: "#064A91"
  aqua: "#1CBFB1"
  aqua-deep: "#007A74"
  night: "#121920"
  night-surface: "#1C252D"
  night-text: "#F7F8F7"
  night-muted: "#BEC8CE"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, Arial Narrow, sans-serif"
    fontSize: "clamp(3.5rem, 7.5vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque Variable, Arial Narrow, sans-serif"
    fontSize: "clamp(2.25rem, 4.8vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Bricolage Grotesque Variable, Arial Narrow, sans-serif"
    fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Source Sans 3 Variable, Segoe UI, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "IBM Plex Mono, Consolas, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.02em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  device: "20px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  2xl: "64px"
  3xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.flutter}"
    textColor: "{colors.surface}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "12px 18px"
  button-primary-hover:
    backgroundColor: "{colors.flutter-deep}"
    textColor: "{colors.surface}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "12px 18px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: "11px 17px"
  technical-label:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0"
  screenshot-frame:
    backgroundColor: "{colors.night-surface}"
    textColor: "{colors.night-text}"
    rounded: "{rounded.device}"
    padding: "0"
---

# Design System: Muhammad Sayyedain Portfolio

## Overview

**Creative North Star: "The Mobile Product Workbench"**

A recruiter is reviewing Muhammad's work in daylight on a laptop, then reopening a case study on a phone before an interview. The interface should feel like a well-organized product workshop: large working screens, concise annotations, precise dividers, and implementation notes placed where they help someone understand a decision. The light canvas is practical and calm; dark sections appear only when they improve screenshot contrast or mark a deliberate change in project atmosphere.

This is editorial in pacing, not in magazine costume. The system uses a twelve-column layout and strong typography, but avoids the saturated “display serif + italic + mono captions” aesthetic. Bricolage Grotesque gives the portfolio a compact, engineered voice; Source Sans 3 carries long explanations; IBM Plex Mono is restricted to short technical metadata.

The home page moves through compact navigation, a split hero, three individually art-directed project previews, a capability matrix, build notes, experience and education, a personal introduction, and a contact footer. Dedicated case-study routes deepen each selected project without changing the framework. The current React/Vite/Tailwind foundation and Vercel deployment remain the implementation base.

**Key Characteristics:**

- Warm off-white canvas with charcoal type and a restrained Flutter-blue signal.
- Asymmetric twelve-column compositions with obvious reading order.
- Real Flutter screens at meaningful sizes; no illustrative substitutes.
- Thin rules, square-ended spacing rhythm, moderate radii, and very little elevation.
- Mobile-interface transitions used to explain sequence, not decorate text.
- Truthful content centralized in one data model and reused across preview and case-study routes.

## Colors

The palette is restrained: neutrals carry the page, Flutter blue marks primary action and navigation, and aqua appears briefly for active or transitional states. The hex values in the frontmatter are normative.

### Primary

- **Flutter Signal** (`flutter`): primary CTA fills, selected navigation, important inline links, and the one high-salience annotation in a project section.
- **Flutter Deep** (`flutter-deep`): hover/pressed states and accessible blue text when a stronger contrast is required.

### Secondary

- **Aqua Interaction** (`aqua`): active screenshot indicators, dark-section focus accents, and short-lived transition feedback. It is never body text on the light canvas.
- **Aqua Deep** (`aqua-deep`): accessible aqua-family text on the light canvas.

### Neutral

- **Workshop Canvas** (`canvas`): the primary page background.
- **Clean Surface** (`surface`): selective screenshot mats, menus, and utility surfaces; it does not create a page full of white cards.
- **Charcoal Ink** (`ink`): headings and body text.
- **Quiet Ink** (`ink-muted`): supporting prose and metadata; it maintains a 7.36:1 contrast ratio on the canvas.
- **Rule** (`rule`): dividers, screenshot rails, and structural borders.
- **Night** (`night`): the single dark project section and the contact footer.
- **Night Surface** (`night-surface`): selective structure inside dark sections, used without turning content into nested cards.
- **Night Text** (`night-text`): headings and primary copy on dark sections.
- **Night Muted** (`night-muted`): supporting copy and metadata on dark sections.

**The Ten-Percent Signal Rule.** Flutter blue and aqua together occupy no more than roughly ten percent of a viewport. Their rarity makes active states legible.

**The Aqua Context Rule.** Bright aqua is interactive on dark surfaces or non-textual on light surfaces. Use `aqua-deep` for normal-size text on the canvas.

**The No-Gradient Rule.** Color changes by section, state, or solid block—not through decorative gradients or gradient text.

## Typography

**Display Font:** Bricolage Grotesque Variable (with Arial Narrow and sans-serif fallbacks)  
**Body Font:** Source Sans 3 Variable (with Segoe UI and sans-serif fallbacks)  
**Label/Mono Font:** IBM Plex Mono (with Consolas and monospace fallbacks)

**Character:** The display face is compact, slightly idiosyncratic, and product-minded. The body face is open and highly readable. The mono face behaves like a measured annotation on an engineering drawing and never becomes the page's default voice.

The implementation should self-host a minimal set of WOFF2 variable font files, preload only the critical display/body faces, use `font-display: swap`, and provide metrically compatible fallbacks to reduce layout shift.

### Hierarchy

- **Display** (600 weight, 0.96 line height): `clamp(3.5rem, 7.5vw, 6rem)` for the hero statement only; maximum size is 96px and tracking never exceeds `-0.035em`.
- **Headline** (600 weight, 1 line height): `clamp(2.25rem, 4.8vw, 4.25rem)` for major project and section headings.
- **Title** (600 weight, 1.1 line height): `clamp(1.5rem, 2.4vw, 2.25rem)` for project subheads, decisions, and timeline roles.
- **Body** (400 weight, 1.6 line height): `clamp(1rem, 0.96rem + 0.2vw, 1.125rem)` for explanations, capped at 68ch and set with `text-wrap: pretty`.
- **Label** (500, 0.75rem, `0.02em`, sentence case by default): technology, dates, route labels, and short metadata. Uppercase is allowed only for compact technical codes, never as repeated section eyebrows.

**The Two-Voice Rule.** Bricolage speaks; Source Sans explains. IBM Plex Mono only annotates.

**The One-Display Rule.** Each viewport gets one dominant heading. Supporting headings step down clearly instead of competing at hero scale.

## Elevation

The system is flat by default. Separation comes from canvas changes, thin rules, overlap, and scale. Buttons, notes, capability rows, and timeline items do not receive ambient drop shadows.

Phone/screenshot stacks are the single exception: a screen that visibly overlaps another may use a soft structural shadow without also adding a decorative border. Static screenshots elsewhere use either a one-pixel rule or a shadow, never both.

### Shadow Vocabulary

- **Device lift** (`0 18px 44px rgba(18, 25, 32, 0.14)`): the frontmost hero or project screen only, with no border.
- **Pressed control** (`0 2px 0 rgba(18, 25, 32, 0.18)`): optional active-state feedback for a filled button; it disappears at rest.

**The Flat-by-Default Rule.** If a surface is understandable with spacing and a rule, adding a shadow is prohibited.

**The One-Lift Rule.** No viewport contains more than one visibly elevated screenshot group.

## Components

### Navigation

- A compact sticky header uses Muhammad's name as a real home link, four section links, and one contact action.
- Desktop active state is a short Flutter-blue underline or rule aligned to the label; mobile active state is text color plus the same rule. Use `aria-current="location"`.
- The mobile menu is a simple opaque panel, not glass. The trigger has an accessible name, `aria-expanded`, Escape handling, focus management, and a 44px minimum target.
- A visible skip link precedes the header.

### Buttons and Links

- Primary and secondary actions use gently squared corners (6px), minimum 44px height, sentence-case labels, and no magnetic behavior.
- Primary hover shifts from Flutter Signal to Flutter Deep over 180ms; active feedback moves no more than 1px.
- Secondary actions use a one-pixel charcoal rule and transparent fill. Inline links use an underline that remains visible without hover.
- Every external link that opens a new tab communicates that behavior in its accessible name; internal navigation stays in the same tab.

### Hero and Phone Stack

- The hero is a two-part composition, not a centered billboard. At desktop, copy occupies columns 1–6 and the screen stack occupies columns 7–12; tablet uses a 5/7 split; mobile stacks copy above imagery.
- The copy order is fixed: “Flutter Developer · Lahore, Pakistan,” the supplied statement, one concise capability paragraph, primary/secondary actions, then the availability line. That paragraph must name Flutter, Firebase, REST APIs, Supabase, and offline storage explicitly.
- The visual uses two or three real project captures with intrinsic dimensions. Screens overlap by no more than 18% and remain individually readable. Decorative device chrome stays thin and neutral.
- The front screen may move 12–20px across the hero's scroll range. Reduced motion renders the final stack without translation.

### Selected Project Features

- The three previews are not instances of one identical card. They share content fields but receive different compositions:
  - **Property Management:** light, wide listing/detail sequence with check-in/check-out, unavailable-date, favourites, booking-status, Firebase, and current-brief Hive-cache decisions in a narrow side column.
  - **PawPal:** the single dark project section; owner/adopter roles, browsing, favourites, adoption requests, and realtime chat are presented as a left-to-right mobile-page sequence.
  - **PalPath:** light clinical workflow with patient/case/appointment/treatment/quiz screens; image analysis appears as one supporting integration panel.
- Each preview contains Problem, Role, Main technical decisions, Important features, Technology, real screenshots, and only the links that exist. GitHub and portfolio-local case-study links are present for all three; PalPath may link to its verified public web deployment, labeled as authentication-only until authenticated workflows are verified.
- Dedicated routes are `/work/property-management`, `/work/pawpal`, and `/work/palpath`. A shared `CaseStudyPage` reads the same project data as the homepage preview, preventing copy or link drift.
- Screens transition like a mobile page change: 8–16px horizontal movement plus opacity over 220–320ms with an ease-out curve. Content is visible by default and no route transition delays reading.

### Capability Matrix

- Capabilities are rule-separated rows, not cards, pills, or percentage bars.
- Four groups organize evidence: Mobile product flows; Data, state, and offline behavior; Connected services; Tools and engineering foundations.
- Each row pairs a capability statement with the technologies or project evidence that support it. Technology names remain plain text and never float independently as decoration.

### Build Notes

- Three compact notes explain one implementation choice each: booking availability/status logic, realtime role/chat data, and the Flutter-to-service boundary in PalPath.
- Notes use a mono metadata line, a short Bricolage title, and no more than 55ch of body text. Code snippets appear only if the source materially clarifies a decision.
- Notes never claim performance improvements, concurrency safety, offline behavior, or production scale without evidence.

### Experience, Education, About, and Contact

- Experience and education use a single ruled timeline with dates aligned in a narrow column; there are no floating cards or invented statistics.
- The about section is a short first-person explanation of Muhammad's mobile product scope. It does not invent hobbies, clients, or a personal-photo narrative.
- The footer is a dark, decisive contact surface: availability, email, LinkedIn, GitHub, résumé, and a compact navigation repeat. It replaces a separate contact-card grid and does not require a backend form.

### Component Architecture

- `src/data/portfolio.js`: one canonical export for identity, contact links, capabilities, build notes, timeline, and project objects. Each project owns `slug`, `problem`, `role`, `decisions`, `features`, `technology`, `repositoryUrl`, optional external link metadata (`url`, `label`, `verificationScope`), `caseStudyPath`, and screenshot metadata (`src`, `alt`, `width`, `height`).
- `src/pages/Home.jsx` and `src/pages/CaseStudy.jsx`: route-level composition only.
- `src/sections/`: `Hero`, `SelectedWork`, `Capabilities`, `BuildNotes`, `ExperienceEducation`, `About`, and `ContactFooter`.
- `src/components/projects/`: `ProjectFeature`, `PhoneStack`, `ScreenshotSequence`, `ProjectMetadata`, and `CaseStudyLinks`.
- `src/components/ui/`: `SiteHeader`, `ButtonLink`, `SectionHeading`, `TechnicalLabel`, `SkipLink`, and `FocusRing` conventions.
- `src/hooks/useActiveSection.js`: IntersectionObserver-based active navigation. Framer Motion's reduced-motion support may be used for screenshot sequences; GSAP, Three/Rapier, Lenis, WebGL backgrounds, magnetic elements, and dormant animation components should be removed if no longer used.

### Responsive and Media Behavior

- Mobile: 4-column conceptual grid, 20px page gutters, 16px gaps, single-column project narratives, horizontally scrollable screenshot sequences with scroll snap only when every screen remains keyboard reachable.
- Tablet: 8-column conceptual grid, 32px gutters, 20px gaps; hero and project media may split 5/3 or 3/5 depending on reading order.
- Desktop: 12 columns, 48px gutters, 24px gaps, max content width 1440px. Sections intentionally use different spans rather than one repeated centered container.
- All screenshots use local AVIF/WebP derivatives, intrinsic width/height, `srcset`/`sizes`, meaningful alt text, and `decoding="async"`. The first hero screen may load eagerly; all later project media lazy-loads. No image area renders as an empty placeholder.

### Motion and Focus

- Default state feedback lasts 160–220ms; screenshot sequences last 220–320ms. Use ease-out-quart/expo curves with translation under 20px.
- Only phone/screenshots receive scroll-linked movement. Text, counters, backgrounds, and every repeated row remain static.
- `prefers-reduced-motion` disables scroll transforms, page slides, smooth scrolling, and nonessential opacity transitions.
- `:focus-visible` uses a 2px Flutter-blue outline with a 3px offset on light surfaces and a 2px aqua outline on dark surfaces. Overflow containers must not clip it.

## Do's and Don'ts

### Do:

- **Do** let real Flutter screens be the largest proof on the page and capture them from the actual running projects or Muhammad's supplied devices.
- **Do** use the twelve-column grid asymmetrically while preserving a clear mobile reading order.
- **Do** keep body copy within 68ch, headings balanced, and technical labels short.
- **Do** keep Flutter blue and aqua controlled, verify contrast, and use `aqua-deep` when aqua-family text appears on the light canvas.
- **Do** use thin rules, 6–16px interface radii, deliberate whitespace, and flat surfaces.
- **Do** preserve `/resume.pdf`, canonical contact links, verified repositories, the authentication-only PalPath web deployment, React/Vite/Tailwind, and Vercel deployment behavior.
- **Do** provide semantic HTML, keyboard navigation, stable accessible names, visible focus, descriptive alt text, intrinsic image dimensions, and reduced-motion fallbacks.
- **Do** omit a link, image, metric, role, or feature when it cannot be verified.

### Don't:

- **Don't** use giant gradient headings, purple-to-blue gradients, gradient text, glassmorphism, glowing borders, random background particles, decorative grid backgrounds, or empty grey project-image placeholders.
- **Don't** build a huge centered SaaS hero, hero-metric template, fake statistics, “24/7 learning” counters, skill percentage bars, proficiency dots, fabricated testimonials, clients, achievements, or performance claims.
- **Don't** use floating technology pills, repeated identical card grids, cards nested inside cards, excessive rounded cards, or large icon tiles above every heading.
- **Don't** repeat tiny uppercase tracked eyebrows or numbered section markers as page scaffolding.
- **Don't** use generic rocket, sparkle, brain, or lightning icons, hand-drawn SVG scenes, decorative stripes, or stock illustrations as substitutes for app evidence.
- **Don't** overuse IBM Plex Mono; it is reserved for technical labels and metadata.
- **Don't** use constant parallax, magnetic interactions, bounce or elastic easing, continuous WebGL/canvas effects, or animate every text element.
- **Don't** use generic copy such as “turning ideas into reality,” the title “Aspiring Software Engineer,” or position Muhammad as a generic full-stack, Node.js, backend, AI, or GenAI engineer.
- **Don't** pair a one-pixel border with a wide decorative shadow, exceed 16px radii on ordinary cards/sections, hide content until an animation fires, clip focus rings, or allow horizontal overflow.
