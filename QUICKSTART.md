# Quick start

## Requirements

- Node.js 20 or newer
- npm

## Run the portfolio

```bash
cd frontend
npm ci
npm run dev
```

Open `http://localhost:3000`.

The Express backend is optional for local portfolio browsing. The current interface uses verified direct email, LinkedIn, GitHub, résumé, repository, and deployment links rather than a contact form.

## Verify a change

```bash
cd frontend
npm run lint
npm run build
```

Check the homepage at mobile, tablet, and desktop widths, then open every `/work/*` route directly to verify React Router fallback behavior.

## Update content

- Portfolio copy and links: `frontend/src/data/portfolio.js`
- Design tokens and layouts: `frontend/src/index.css`
- Project captures: `frontend/public/images/projects/`
- Product and evidence rules: `PRODUCT.md`
- Design-system rules: `DESIGN.md`

Only mark screenshot metadata as available after the corresponding authentic file exists. Preserve `frontend/public/resume.pdf` unless Muhammad intentionally supplies a replacement.
