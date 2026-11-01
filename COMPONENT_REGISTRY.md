# Component registry

| Component | Source | Rights and dependencies | Adaptation / performance |
|---|---|---|---|
| Cinema Grain Preloader | https://21st.dev/@kedhareswer/components/cinema-grain-preloader and supplied full source in docs/briefs/cinema-grain-source.txt | User-supplied full source. MIT license verified on the 21st.dev component page on 2026-11-01. React only. | Preserve cube choreography and WebGL shader. Add poster, optional audio control, finite lifecycle, labeled visual sequence, session wrapper and skip. Loaded only for eligible homepage intro. |
| Sticky header study | https://preview.21st.dev/@diarmuradi/components/header-2 | Catalogue reference only, no source copied or unverified license asserted. | Original house implementation, conventional nav and native mobile dialog. Motion transition. |
| Offer Card study | https://21st.dev/@lavikatiyar/components/offer-card | Public preview and usage reviewed, component source account-gated. No source copied. | Original image-first editorial cards, visible titles and link focus instead of hover-only information. next/image only. |
| Image Showcase study | https://henrique_e110b868.21st.dev/@ravikatiyar162/components/image-showcase | Catalogue reference only, source account-gated. | Reject fanned motion for readability. Use ordered real lab photographs and stable aspect ratios. |

21st.dev was consulted repeatedly for intro, navigation and photography patterns. Do not claim inaccessible component source was integrated. Shared shadcn-compatible conventions: components/ui, @ aliases, lib/utils and components.json. Add individual shadcn primitives only when needed rather than installing an unused component library.

## Actual runtime use
- GSAP 3.15: dynamically imported hero parallax and SVG reading path, matchMedia cleanup.
- Anime.js 4.5.0: dynamically imported finite five-light stagger. MIT.
- Motion 14.9.0: native mobile dialog panel transitions, useReducedMotion. MIT, React 19 supported.
- Spline: design and export evaluated, bounded opt-in iframe slot implemented. No licensed scene supplied, no runtime installed or loaded.
- 21st.dev Cinema Grain: original shader, five cube keyframes, progress curve and timing engine retained. Original cinema preset and default cube size, speed 0.55 for approximately 7.6 seconds including exit. Added session gating, controls, error boundary, poster and production media protection.
- shadcn: components.json and components/ui conventions established, clsx and tailwind-merge utility. No unused shadcn components installed.
