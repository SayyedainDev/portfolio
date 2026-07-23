# Muhammad Sayyedain — AI / GenAI Engineer Portfolio

A dark, dimensional portfolio centered on Muhammad's applied AI work: CACE, a production RAG and evaluation pipeline, a FLAN-T5 fine-tuning/quantization lab, and PalPath as the bridge from earlier Flutter delivery into AI-enabled product workflows.

The strategic direction is documented in [`PRODUCT.md`](PRODUCT.md) and the visual system in [`DESIGN.md`](DESIGN.md).

## Stack

- React 19 and React Router
- Vite 7
- Tailwind CSS 3 plus a project-specific OKLCH design system
- Framer Motion for lightweight pointer tilt, orbiting, and scroll progress
- CSS 3D architecture artifacts; no WebGL dependency
- Express backend preserved for existing `/api/*` deployment behavior
- Vercel deployment from the repository root

## Local development

```bash
cd frontend
npm ci
npm run dev
```

The frontend runs at `http://localhost:3000` by default. Direct email/contact links are used, so the backend is not required for normal portfolio browsing.

Quality checks:

```bash
npm run lint
npm run build
npm audit --omit=dev
```

## Content architecture

`frontend/src/data/portfolio.js` is the canonical source for identity, links, projects, capabilities, Crewlogix training, experience, education, about, and contact content. Homepage previews and case-study routes read from the same project objects.

Routes:

- `/`
- `/work/cace`
- `/work/rag-evaluation`
- `/work/flan-t5-lab`
- `/work/palpath`

The first three projects intentionally omit repository links until Muhammad publishes the code. Add a URL only when it is live and update the matching status/evidence copy at the same time.

## Deployment

The root `vercel.json` builds the existing Express API and Vite frontend, preserves static files such as `/resume.pdf`, and routes extensionless paths to React Router. See [`DEPLOYMENT.md`](DEPLOYMENT.md) for the deployment checklist.

## Accessibility and performance

The implementation includes semantic landmarks, one page-level heading per route, a skip link, keyboard-safe mobile navigation, visible focus states, local WOFF2 fonts, reduced-motion behavior, and responsive layouts. Three-dimensional effects use transforms rather than canvas/WebGL and degrade to static diagrams under `prefers-reduced-motion`.

The current July 2026 résumé is served from `frontend/public/resume.pdf`.
