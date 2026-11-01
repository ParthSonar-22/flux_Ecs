# FluxECS Motorsport Engineering

Original house system. The user confirmed SpaceX is reference only. The generated reference is preserved in docs/references/spacex-DESIGN.md. Do not inherit its black-and-white-only rule or proprietary identity.

## Tokens
Carbon #0B0D11, elevated carbon #13171D, graphite #242B33, off-white #F2F2EE, velocity orange #FF603B, telemetry cyan #72D6D0, muted #A9AFB8. Orange actions carry carbon text. Cyan is reserved for small discipline labels. Borders are low contrast decoration, text retains readable contrast.

## Typography
Locally hosted OFL Barlow Condensed for monumental uppercase headings, Barlow for body, system monospace for metadata. Display is clamp-based, compact line height, slightly negative tracking. No official F1 font. Legacy font aliases map into the new families to preserve old pages.

## Layout
Maximum reading canvas 1440px. Gutters 20px mobile, 40px tablet, 64px wide. Eight-pixel spacing cadence, 88 to 128px section gaps. Breakpoints 640, 900, 1200px. Hero has one large wordmark, quiet institutional label, asymmetric supporting content and two clear actions. Sharp rectangular buttons, restrained corner cuts. No decorative dashboard statistics.

## Photography
Racing media is atmosphere, not council evidence. Actual lab photos, posters and portraits establish the council identity. Dark scrims protect text. Student images retain natural color. Media records require source, rights and alt text. Unlicensed previews must not become production assets.

## Motion
One cinematic owner per element. GSAP controls hero and scroll chapter transitions, Motion owns mobile menu and UI states, Anime.js owns five start lights only. Intro is optional once per session, skippable and silent. Reduced motion shows content directly. Content is visible before enhancement and without JavaScript. No scroll-jacking. Spline is user initiated and optional, with poster fallback.

## Components
components/ui contains portable TypeScript primitives and the supplied preloader. components/home contains homepage choreography and sections. Visible focus, semantic links, at least 44px controls, native dialog for focus management, labeled fields. Mobile grids collapse without horizontal scroll. Keep copy grounded in the real data files.
