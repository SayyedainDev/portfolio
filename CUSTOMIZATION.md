# Portfolio content guide

This portfolio is deliberately specific to Muhammad Sayyedain's AI / GenAI direction. Flutter remains supporting product-delivery evidence; changes should not make it the primary identity again. Preserve the evidence rules in `PRODUCT.md`.

## Canonical content

Edit `frontend/src/data/portfolio.js` for:

- Identity, availability, email, GitHub, LinkedIn, and résumé links
- Hero and navigation copy
- Project status, problem, role, decisions, features, workflow, technology, and evidence boundaries
- Capabilities, engineering principles, Crewlogix training, timeline, about, and contact content

Homepage previews and case-study pages share this data. Do not duplicate project claims inside components.

## Publishing project repositories

CACE, Production RAG, and FLAN-T5 currently omit repository links. When a repository is actually public:

1. Add `repositoryUrl` to its project object.
2. Add a real external entry to `links`.
3. Replace “code soon” or “repository publishing” status copy.
4. Review `evidenceBoundary` so it describes what the public snapshot genuinely proves.
5. Test both the homepage action and `/work/:slug` case study.

Never use `#`, an empty URL, or Muhammad's GitHub profile as a fake project-repository link.

## Visual system

- Normative design rules: `DESIGN.md`
- Runtime tokens and responsive layouts: `frontend/src/index.css`
- Tailwind token mirror: `frontend/tailwind.config.js`
- Self-hosted fonts: `frontend/public/fonts/`

Keep the graphite inspection-table canvas, lime system signal, coral human-review marks, cyan retrieval paths, warm-white document surfaces, moderate radii, and project-specific architecture artifacts. Avoid purple-blue AI gradients, gradient text, generic neural imagery, random particles, glass cards, fake metrics, and motion unrelated to system structure.

## Adding a project

1. Confirm the project, role, status, features, and links from primary evidence.
2. Add one project object to `projects` in `portfolio.js`.
3. Give it a meaningful workflow and a project-specific artifact rather than duplicating another diagram.
4. Make source availability and team/academic context visible.
5. Test the generated `/work/:slug` route, keyboard navigation, reduced motion, direct Vercel routing, and mobile overflow.
