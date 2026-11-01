# Homepage implementation and verification

## Scope and result
Milestone A foundation and first Milestone B homepage slice. Latest user direction is homepage only. Further public pages and Supabase CMS remain deferred. Work stays on codex/fluxecs-v2-motorsport. No push, deployment or production configuration change.

The supplied Cinema Grain engine is retained with the original GLSL, five cube tumbles, progress curve and original cinema preset. FLUX, loop false and speed 0.55 produce approximately 7.6 seconds including exit. Saira Extra Condensed is hosted locally with its OFL license. Skip, replay, session dismissal, silent default, optional licensed audio configuration, reduced-motion bypass, poster, error boundary and independent safety timeout are added. The sequence percentage is explicitly labeled INTRO SEQUENCE, not asset-download progress. The YouTube clip is intro-only and starts at source 00:12.

Hero A is selected provisionally: a large wordmark, original engineering illustration and GSAP parallax, with a transition into real lab photos. Hero B at /design/hero-b is a development-only bounded stage study. A integrates more naturally into the actual council story; B has no licensed 3D scene and is not presented as finished Spline work. The hero visual is still awaiting user selection. Neither hero contains the racing video or its still.

## Checks completed
- Baseline npm ci installed the locked stack. Baseline lint found two existing state-in-effect errors and font warnings. Baseline build failed to fetch Google fonts. Locally hosted fonts remove the build dependency; existing tab/theme lint errors were repaired.
- npm run build: successful production compilation, TypeScript, page generation and route report.
- npm run lint: passes after source and existing lint repairs.
- npm run typecheck: passes.
- npm run format:check: passes for homepage, shared shell and introduced components.
- npm test: signed admin token regression checks pass, missing secrets fail closed and malformed tokens are rejected.
- Local GET checks: /, /events, /blog, /about, /contact, /admin, /design/hero-b return 200 in development.
- Local API checks without credentials: admin login returns 503, subscriber export returns 401, valid contact/newsletter requests return 503 with useful error copy, invalid input returns 400. No messages or subscriptions were delivered.
- Local clip byte-range request returns 206, bytes 0-1023/5253526, 1024 bytes. Full HD preview is 1920 x 804, the cinematic aspect ratio provided by the source. No 4K version was listed.
- Production server check: homepage 200 with no /api/preview-media reference; clip endpoint 404 and alternate hero prototype 404. Preview footage is outside public/, ignored by Git, excluded from production tracing and served only in development.
- In-app Chromium browser: homepage, replay, visible skip control, finite intro exit, mobile navigation, Escape dismissal, anchor navigation and real image loading inspected. After intro, DOM has zero videos and zero open dialogs. Mobile viewport 390 x 844 reports document width 385, no horizontal overflow and no broken completed images. Desktop reviewed at 1440 x 1000. Temporary viewport reset afterward.
- Original media comparison contact sheet at scratch/review/video-contact-sheet.jpg, with original source timestamps. YouTube samples 12, 16, 20, 24, 32, 40 seconds. Local Envato samples 0, 4, 8, 12, 15, 18 seconds. Watermarks are retained.

## Artifacts
Local, ignored screenshots in scratch/review: home-desktop.jpg, home-mobile.jpg, intro-mobile.jpg, mobile-menu.jpg, garage-mobile.jpg and hero-b-desktop.jpg. Review images may contain unapproved footage and are not public website assets.

## Honest limits
No Chrome/Firefox binaries are installed on the host. Browser validation used the available in-app Chromium browser. No Lighthouse score, real-device performance result or measured Core Web Vitals is claimed. Reduced-motion paths are implemented across the animation owners but preference emulation was not available in this browser tool, so that case still needs a manual browser/device check. Missing WebGL and media failures have code fallbacks but were not fault-injected in the browser. The newsletter modal and legacy secondary pages are retained, not a completed accessibility redesign. Source database persistence cannot be verified without credentials.

npm audit reports 16 moderate advisories, all in the existing ESLint development dependency chain. No high or critical advisory reported. Do not use a force upgrade as part of the homepage design change.

## Next homepage work
Select the hero art direction with the user, replace the temporary illustration with an original or licensed visual, tune the intro clip and timing after review, then do an accessibility and measured performance pass. Licensed racing footage and optional audio remain prerequisites for public use. Supabase credentials and a licensed Spline model are not required to continue homepage refinement.
