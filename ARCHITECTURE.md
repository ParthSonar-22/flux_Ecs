# Architecture and repository audit

Audit date: 2026-11-01. Baseline commit 82e200d, clean starting tree on redesign/frontend-v2. Work branch codex/fluxecs-v2-motorsport.

## Existing system
Next.js 16.4.3 App Router, React 19.3, JavaScript, npm lockfile, Tailwind 3.4, GSAP 3.15 and @gsap/react. No TypeScript config or shadcn components.json initially. next.config.mjs enables strict mode and limits build CPUs to two. No deployment config or test suite. ESLint uses Next core web vitals. Google fonts were requested at build time. Static reference HTML and Python logo-generation scripts are retained as history.

Existing routes: /, /events, /blog, /about, /contact, /admin. Event and blog views are large client components with tabs and inline detail experiences, not standalone slug routes. About includes actual senior and junior council portraits and faculty. Contact and newsletter submit to API routes. Admin reads MongoDB and exports subscribers. Data lives in data/events.js, posts.js, team.js and site.js. Dates and registration links are preserved.

Assets: real Algorithm's Auction posters, IoTA lab photos (including duplicate iota/photos directories), official logo variants and council portraits. Preserve originals. No licensed racing model, soundtrack or scene supplied. Local Downloads/f1 reveal vid.mp4 is 19.03 seconds, 1080p30, silent, with a central Envato preview watermark. YouTube candidate xImMTsU-MCE is a 47-second CG cinematic by Post Processed. Public reuse rights are unverified.

## Reuse and risks
Keep routes, data, media, validated forms, Mongoose models and cached connection until a reviewed migration. Existing contact and subscription APIs report success without persistence if MongoDB is missing. Repair to return a clear unavailable response. Existing admin has fallback credentials. Remove insecure fallback credentials while preserving configured admin use. In-memory rate limits are per instance, not a distributed production limit. Supabase migration and role-based CMS are future milestones, not configured.

## Organization
app: server routes and metadata. components/home: cinematic home and media controls. components/ui: reusable primitives and selected Cinema Grain source. lib: utilities and animation registration. data: editable council content and media config. public/media: original fallback illustration. scratch/media: ignored local review footage, served only through a development-only route and excluded from production tracing. docs/briefs: supplied specifications. docs/references: external reference, not house rules.

TypeScript is adopted incrementally with allowJs and checkJs false. Existing JS pages stay intact. Tailwind 3 stays installed, no framework rewrite. Spline scene integration is bounded and disabled until a licensed scene exists. No new hosted service is provisioned.

## Milestones
A: audit, design tokens, shared shell, TypeScript conventions. B: selected intro and homepage vertical slice, hero comparison, scroll storytelling and validation. C: standalone projects, gallery, stories, council and detail routes with content migration. D: reviewed Supabase migrations, RLS, auth and publishing CMS. E: full accessibility, performance and administrator handover. Initial session prioritizes A and B.
