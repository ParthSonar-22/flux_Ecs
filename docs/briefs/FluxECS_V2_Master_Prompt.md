FLUXECS V2: MOTORSPORT ENGINEERING WEBSITE
Master implementation brief for a local coding agent
You are the lead frontend engineer, creative developer, UX designer, full-stack architect, accessibility reviewer and QA engineer responsible for rebuilding the existing FluxECS council website. You have access to the local Linux project, its source files, terminal and browser preview if available.

Your job is to turn the existing work into a distinctive, production-quality website and a maintainable publishing ecosystem. Actually inspect, implement, run and test the code. Do not respond with a generic mockup or an implementation proposal only.
0. Project context
- Project: FluxECS, the Electronics and Computer Science branch council at Vivekanand Education Society's Institute of Technology (VESIT).
- Existing public site: https://flux-ecs.vercel.app/
- Existing work was started by another developer. Preserve usable functionality, real content, media and history. Do not wipe the repo or rebuild blindly.
- Target: a cinematic F1-inspired motorsport engineering identity, borrowing the restraint and narrative impact of SpaceX, with some editorial clarity from The Verge. This is an original FluxECS brand, not an official Formula 1 website or a racing fan site.
- Hardware plus software is the core message. Motorsport is the visual language. FluxECS is the actual subject.
- Initial infrastructure preference: React, TypeScript, Tailwind CSS, shadcn/ui, Supabase PostgreSQL/Auth/Storage, Vercel. Audit the current stack before changing it. Keep useful existing infrastructure if justified.
- Work in the current repository on a new feature branch, such as feature/fluxecs-v2-motorsport. Check git status first and never overwrite uncommitted work.
- The user has also attached a full 21st.dev component prompt containing cinema-grain-preloader.tsx and its demo. Treat that attachment as source material. Read it completely and integrate or adapt it, do not invent a different component and claim it is the same one. The relevant 21st.dev component is https://21st.dev/community/components?q=cinematic&preview=%2F%40kedhareswer%2Fcomponents%2Fcinema-grain-preloader
1. Working rules and communication
1. Begin with a real source audit: file tree, package manager, package.json, routing, TypeScript, Tailwind, shadcn conventions, assets, content, database/API dependencies, broken pages, current build and deploy configuration. List what is reusable, what needs replacing and what is missing.
2. Provide a compact implementation roadmap and immediately proceed with foundation and homepage work. Do not stop after a plan unless credentials, authorization or critical missing files genuinely prevent a particular step. Continue with work that is not blocked.
3. Commit logical stages on the feature branch. Do not push, deploy to production or change remote settings without explicit approval.
4. Preserve existing real events, posters, image credits, council details, project links, registration links and announcements. Never invent a college achievement, person, event date, live statistic or functional database result.
5. Write natural, precise, human copy. Avoid generic AI startup slogans, filler, exaggerated promises and decorative buzzwords. Do not use em dashes in site copy or documentation. Use short sentences, commas and periods. Keep language suitable for an official engineering student council.
6. If an asset, content item, Supabase credential, brand decision or license is missing, record it in ASSET_REQUESTS.md or BLOCKERS.md and use a clearly identified, legal temporary fallback where appropriate. Never claim that a placeholder is real council content.
7. Do not dump huge one-time generated components without an architecture. Prefer readable, reusable components, consistent tokens, tests and meaningful file names.
2. Visual identity
Theme name for internal creative direction: FluxECS Motorsport Engineering.

Guiding words: fast, precise, technical, cinematic, disciplined, engineered. Do not turn the whole site into a game or a Formula 1 copy.

Visual system:
- Near-black carbon surfaces, dark graphite, crisp off-white typography.
- One main action accent: velocity orange, provisionally #FF603B.
- One limited technical accent: telemetry cyan, provisionally #72D6D0.
- Provisional base tokens: carbon #0B0D11, graphite #242B33, white #F2F2EE.
- These are starting tokens, not immutable brand rules. Put them in a maintainable system, review accessibility contrast, and keep the palette easy to adjust.
- Bold, condensed, legally usable display typography, paired with a highly readable body face and restrained monospace labels for technical metadata. Do not use official F1 proprietary fonts or copy team branding.
- Cinematic media, strong section hierarchy, split editorial layouts, photographic cards, subtle timing and generous negative space.
- Avoid neon overload, fake holograms on every page, endless gradients, glitch everywhere, full-screen loaders on every route, and generic AI-looking UI cards.
- Real FluxECS event posters and project photographs should become the primary visual personality outside the hero.
Create and maintain:
- DESIGN.md for colors, typography, grids, spacing, breakpoints, motion principles, photo treatment and component standards.
- ARCHITECTURE.md for stack, routes, data, component structure and security.
- CONTENT_MODEL.md for entity fields and CMS publishing behavior.
- ASSET_REQUESTS.md for the exact visuals, logos, racing video, sound, 3D scene and real content still needed.
Use the SpaceX and The Verge references from https://github.com/VoltAgent/awesome-design-md only as inspiration, not copied skins. Our own DESIGN.md is the source of truth.
3. Intro sequence: implement the actual Cinema Grain Preloader
The user chose the 21st.dev Cinema Grain Preloader and provided its full React source. Read the attached source carefully. It already exposes word, videoSrc, shaderPreset, grade, loop, durationMs, speed, height, onComplete, children and className.

Required behavior:
- On the first eligible homepage visit in a browser session, show an optional fullscreen cinematic intro with approved motorsport footage and the tumbling word FLUX.
- Use loop={false} in the production page gate. The provided demo uses loop, which never reveals the children. Do not accidentally ship an infinite intro.
- Use the existing videoSrc prop for a locally served, optimized, licensed racing clip. Do not hardcode the demo clip as the final footage.
- Preserve or improve the preloader's graceful handling of WebGL2 failure, video failure, CORS failure and reduced motion.
- The percentage in the supplied component is choreographed, not real asset download progress. Do not misrepresent it as real loading progress. Consider displaying it as a clearly visual sequence indicator or removing it if it feels deceptive.
- Include a visible, keyboard-accessible Skip Intro control that works at any point, and a way to replay the intro later if desired.
- Do not replay the intro on every page navigation. Record dismissal for the session, not permanent mandatory blocking.
- Provide a no-video poster fallback, reduced-motion skip, error boundary or safe fallback, and no white flash between the intro and homepage.
- Sound starts OFF by default. Add a clear sound toggle. Only load and play music on explicit interaction, respecting browser autoplay rules and audio permissions.
- The user mentioned using music from the F1 movie and real Formula 1 footage. Those are creative references only unless the user supplies clear public website rights. Do not download, rip, embed or publish movie soundtrack recordings, official broadcast footage, logos or protected racing assets without required permission. Use licensed motorsport stock and appropriately licensed original cinematic music or a silent fallback. Record source, license and attribution details.
- Optimize intro duration, avoid needlessly large video assets and do not hide the meaningful homepage content from assistive technology.
4. Hero: the most important design decision
Build and compare two responsive hero concepts within the same design system. Default to Concept A unless local testing strongly favors B.

Concept A: Cinematic scroll reveal, recommended
- A dramatic original formula-style racing vehicle visual or properly licensed photo, positioned with ample space for FLUXECS branding.
- Main headline: FLUXECS. Supporting copy should explain that this is VESIT's ECS council and that the community builds across hardware and software. Sample temporary line: From circuits to code. Built at VESIT. Use real council-approved copy before production.
- Clear CTAs: Explore Projects and Upcoming Events.
- A deliberate GSAP ScrollTrigger sequence: a subtle vehicle/camera reveal or mask, followed by a transition from motorsport imagery into real student engineering projects. Do not animate everything at once.
- One brief original race-track-inspired SVG progress indicator in the hero or navigation. Do not copy a real protected circuit outline without rights. The indicator reflects page progress, not fake racing results.
- Restrained telemetry labels may introduce actual hardware and software areas, but must not show imaginary live speed, laps, results or student statistics.
Concept B: Interactive 3D hero
- A low-poly, original, properly licensed formula-style model built or exported using Spline, placed in a clearly bounded hero stage.
- Interaction limited to subtle pointer camera movement, controlled rotation or selected hotspots. Avoid a distracting forever-spinning model.
- Lazy-load the Spline runtime after meaningful page content or on interaction. Supply a high-quality poster fallback for phones, slow connections and reduced motion.
- If the selected Spline scene is not legally available or no model has been supplied, implement the well-designed fallback first and leave a documented integration point. Never silently replace it with someone else's robot model or claim that the custom car was built.
Choose a single primary hero treatment for shipping. A full video intro, autoplaying hero video, high-fidelity 3D car and multiple heavy WebGL backgrounds must not all load together.
5. Navigation and site-wide motifs
- Sticky, sharp, responsive navbar, initially transparent over the intro/hero and legible after scrolling.
- Logo/wordmark: FluxECS, followed by useful nav items: Home, Events, Projects, Gallery, Stories, Council, About, Contact. Mobile menu must work with keyboard and screen readers.
- Add a minimal race-track-shaped reading progress indicator or controlled line accent as a motif, not as a replacement for conventional navigation.
- Respect current location, active links, reduced motion and proper contrast on video.
- Footer with actual VESIT affiliation, approved council contact/social details, quick links and credits as required.
6. Public page map and page flow
Build a complete, coherent public website with these paths. Integrate real existing content where found. All pages require loading, empty and error states where relevant.
/ Home
Intro, hero, a restrained real-data metrics band if records exist, About FluxECS, featured event, featured projects, recent stories, council preview, participation CTA and footer. Sections flow like a cinematic story but stay readable without animations.
/events Events
Featured event, upcoming events, past event archive, filters, clear dates and registration states. Editorial poster-first layout. Motorsport season-calendar motif can appear in small accents.
/events/[slug] Event detail
Actual poster, date/time/venue, overview, rules, eligibility, rounds, schedule, registration link if valid, organizers, status and photo highlights for completed events. Never show a fake registration backend. If registration uses an approved external form, link clearly to it.
/projects Projects
Engineering Garage, featured build, categories for embedded systems, electronics, robotics, software, IoT and AI where supported by actual projects, filters, real project cards and responsive layout.
/projects/[slug] Project detail
Case-study style: problem, design, hardware, software, architecture, team, build process, images, demo and GitHub links. Optional lazy 3D model for selected projects with explicit scene metadata.
/gallery and /gallery/[slug]
Event albums, filter by year or event, responsive photo layout, proper image lightbox, caption/credit fields and image optimization.
/stories and /stories/[slug]
More editorial like The Verge, but much calmer. Announcements, competition results, student technical articles, event recaps, readable article pages, authors, dates and related stories.
/council
A clear team page styled like a premium motorsport engineering team profile, not a cosplay racing team. Leadership, committees, faculty mentors and archived council years. Driver-card-inspired framing is fine; use actual photos, verified names and titles. Smooth, restrained hover reveals. Easy to maintain yearly updates.
/about
Who FluxECS is, its role at VESIT, hardware and software disciplines, mission, real milestones, faculty information and participation routes. More institutional, less cinematic.
/contact
Official contact and socials, accessible inquiry form, validation, spam mitigation, reliable success/error states and visible privacy messaging.
/join (only when needed)
Applications and volunteer interest, enabled or disabled from admin. Never claim recruitment is open if it is not.

SEO-friendly page metadata, slugs, accessible landmarks, mobile-first page layouts and sensible 404 behavior are required.
7. Admin CMS and content ecosystem
Build the admin as a reliable control center, not as a visually heavy racing game. Theme can appear in branding accents only.

Required admin routes and functions:
- /admin/login: Supabase Auth, authorized users only.
- /admin: overview, drafts, upcoming events, recent edits, inquiries.
- /admin/homepage: edit hero content, media references, CTAs, featured sections, featured event/project and section order within supported layouts.
- /admin/events: create, edit, schedule, publish, archive events; status, rules, posters, registration URLs and highlights.
- /admin/projects: edit case studies, team members, technologies, images and demo links.
- /admin/gallery and /admin/media: upload images, create albums, set covers, captions, accessibility alt text and media credits.
- /admin/stories: rich-text authoring, preview, drafts, scheduling, publishing and archiving.
- /admin/council: add members, roles and portraits, reorder display, archive council years.
- /admin/inquiries: view, filter, mark handled, manage user inquiry records securely.
- /admin/settings: approved social links, site information and role management for authorized administrators.
Content workflow: draft -> preview -> submit for review -> publish/schedule -> archive. Editors cannot silently gain publisher or admin rights. Track created_at, updated_at, created_by, publish state and relevant change history. Support image replacements without code edits.
8. Data and security
Use Supabase PostgreSQL, Auth and Storage if not already solved by the existing stack. First document a schema and relationships for site settings, home sections, events, event assets, projects, project members, stories, authors, categories, gallery albums/images, council years/members, inquiries, user profiles, roles and publish history.
- Prefer clear migrations, foreign keys, indexes and constraints rather than manual dashboard-only schema changes.
- Enforce Row Level Security on every relevant table. Public users can read only published public content; write access requires appropriate roles.
- Validate all inputs, secure file types and sizes, sanitize rich content and prevent arbitrary script/HTML injection.
- Never expose Supabase service-role keys to client code. Use environment variables correctly. Provide .env.example with safe names, never actual secrets.
- Avoid unnecessary collection of student personal data. Have a retention and deletion approach for inquiries.
- Do not pretend a simulated login, localStorage users or mock counts are production-ready.
- Keep asset and data access modular so moving to another database later is not a complete rewrite.
- Vercel deployment must use least-privilege settings and proper environment separation. Do not deploy production without approval.
9. The exact tool stack and how it must be used
These are the user's selected research and implementation references. Evaluate and use each where it delivers value, but do not make several libraries animate the same DOM element or install packages just to satisfy a checklist.
1. Awesome DESIGN.md, https://github.com/voltagent/awesome-design-md
   Study SpaceX and The Verge analysis and author our original DESIGN.md.
2. 21st.dev, https://21st.dev/
   Treat as the recurring React component catalogue across the site, including heroes, cards, nav, galleries, forms and admin. For every selected component, log source URL, license, dependencies, adaptation and performance in COMPONENT_REGISTRY.md. Adapt to the repo's shadcn/Tailwind/TypeScript conventions, don't indiscriminately paste code.
3. MotionSites, https://motionsites.ai/
   Use for visual reference, pacing and motion studies. Record a small set of specific decisions in MOTION_REFERENCES.md. Do not copy proprietary designs/assets or install this as a package.
4. GSAP, https://gsap.com/
   Use as primary cinematic choreography library for the homepage hero and carefully chosen ScrollTrigger moments. Clean up triggers and event listeners on unmount.
5. Anime.js, https://animejs.com/
   Use selectively for the original racing start-light motif, SVG telemetry/race-track path or one other precise staged effect, where it adds something different from GSAP.
6. Motion, https://motion.dev/
   Use for React component-level interactions such as menus, cards, dialogs and state transitions. Avoid overlap with GSAP responsibilities.
7. Spline, https://spline.design/
   Use for a bounded interactive 3D feature with a licensed scene/model, lazy loading, fallback and performance measurements. Do not load heavy scenes on every page.
Audit package versions, React compatibility, bundle cost and licenses before installing. For shadcn, detect project structure through components.json and aliases. Establish components/ui or the configured equivalent, lib/utils, Tailwind and TypeScript only if missing. Follow existing routing conventions. Use lucide-react icons selectively. Avoid random stock photos for student project proof or council portraits.
10. Assets, legal rights and accessibility
- The user will review racing video candidates online. Build a configurable media interface so the final clip can be swapped easily; include a poster fallback.
- Recommended legal footage research: https://www.pexels.com/search/videos/racing%20car/ and https://mixkit.co/free-stock-video/racing/ . Verify the specific clip license and depicted trademarks before using it.
- Recommend licensed music from an appropriate library or user-owned audio. Never copy the F1 movie soundtrack or rip broadcast footage without rights.
- Do not embed official F1 logos, team marks, track maps, fonts, liveries or copyrighted imagery without permission. Draw an original track-shaped progress SVG instead.
- Keep audio disabled by default; sound is user-controlled and never prevents navigation.
- Provide alt text for meaningful images, visible keyboard focus, form labels, readable contrast, reduced-motion fallbacks and appropriate mobile behavior.
- Honor prefers-reduced-motion across GSAP, Anime.js, Motion, Spline and the preloader. Make a high-fidelity version and a lightweight fallback rather than breaking on slow devices.
11. Performance and quality standards
- Prioritize actual content paint, responsiveness and smooth scrolling over visual effects.
- Use modern compressed images, responsive sizes, lazy loading, video posters and carefully encoded web video.
- Avoid multiple simultaneous WebGL canvases, unbounded requestAnimationFrame loops, scroll-jacking, giant initial JavaScript bundles and autoplay audio.
- Test desktop and mobile, at least Chrome and Firefox if installed. Verify reduced-motion, keyboard navigation, touch interactions, forms and broken media fallbacks.
- Run formatter, lint, TypeScript checking, tests and build commands supported by the repo. Report actual results rather than claiming they pass.
- Use Lighthouse and browser performance tools when available. Record key loading, layout stability and accessibility observations. Optimize any major regressions.
- Keep the site functional without the 3D experience, and do not block a production release over an optional animation.
12. Execution plan and deliverables
Implement in practical milestones:

Milestone A: Repo audit and design foundation
Inspect current site, produce a route/content/asset/dependency audit, create the feature branch, write DESIGN.md, ARCHITECTURE.md, CONTENT_MODEL.md, ASSET_REQUESTS.md and COMPONENT_REGISTRY.md. Establish shared layout, fonts, tokens, navbar and footer. Verify the existing app still builds.

Milestone B: Homepage vertical slice
Integrate the supplied Cinema Grain Preloader, proper skip/replay/sound controls and asset fallback. Implement a cinematic, accessible responsive homepage. Build and compare two hero prototypes and select the better default. Add GSAP storytelling, one small Anime.js motif, Motion micro-interactions and a bounded Spline slot with fallback. Keep all content meaningful and editable later.

Milestone C: Public pages
Build Events, Event Details, Projects, Project Details, Gallery, Stories, Council, About and Contact using consistent 21st.dev-inspired components adapted into the house design system. Preserve and migrate real content.

Milestone D: Supabase and admin CMS
Create reviewed SQL migrations, RLS policies, Auth, Storage and real CRUD/publish workflows. Connect public pages to published content, handle drafts and approval, and implement safe image management.

Milestone E: Quality, optimization and handover
Run tests, repair broken flows, mobile audit, SEO, accessibility and performance pass, prepare deployment instructions, document administrator workflows and list any unresolved permissions or licensed-asset needs.

At each milestone report: files changed, commands run, screenshot or browser result when possible, known issues, next concrete step and exact missing user-supplied assets. Avoid claiming any task is complete without checking the relevant route.
13. Start right now
1. Print your current working directory and git status, inspect the existing repository and identify its actual framework and component structure.
2. Find and read the attached cinema-grain-preloader source. If it is not mounted locally, explain what is missing and continue with the other work.
3. Produce a compact audit and proposed file organization.
4. Make a safe feature branch and start Milestone A, then Milestone B within the same working session as far as possible.
5. Do not ask broad questions already answered here. Make sensible reversible defaults and document them. Ask only for a truly blocking repository URL, credentials, permissions or licensed media file.
6. Do not deploy, push to the main branch, or claim that missing assets and Supabase credentials are configured.
The quality bar is a real, sophisticated college council website: cinematic where appropriate, fast and practical everywhere else, original in identity, maintainable by future council members, and visibly built with care.