# Vercel deployment

The repository is configured for deployment from its root. The root `vercel.json` builds both the preserved Express API and the Vite frontend.

## Deploy from GitHub

1. Push the intended commit to the repository's deployment branch.
2. Import the repository in Vercel.
3. Keep the Vercel project root at the repository root so `vercel.json` is applied.
4. Deploy. No frontend environment variables are required for the current portfolio experience.

The configuration provides:

- `/api/*` → `backend/server.js`
- `/assets/*` and extension-bearing files → the frontend build
- extensionless routes such as `/work/cace` → `frontend/index.html`

## Pre-deployment checks

```bash
cd frontend
npm ci
npm run lint
npm run build
npm audit --omit=dev
```

Do not use `npm audit fix --force`; major dependency changes should be reviewed and tested separately.

## Post-deployment checks

Verify each URL directly in a fresh browser tab:

- `/`
- `/work/cace`
- `/work/rag-evaluation`
- `/work/flan-t5-lab`
- `/work/palpath`
- `/resume.pdf`
- `/favicon.svg`

Also verify the external GitHub, LinkedIn, email, repository, and PalPath authentication-deployment links.

## Security

- Never commit `.env` files, service keys, test credentials, or private user data.
- Rotate any credential that has previously appeared in a public repository.
- The current portfolio frontend does not need email-service credentials.
- Preserve the authentication-only wording for the public PalPath deployment until protected workflows are independently verified.
