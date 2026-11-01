# Assets and configuration still required

1. Racing footage: clean licensed master of the selected cinematic, with web reuse permission. YouTube https://youtu.be/xImMTsU-MCE is a creative candidate, not proof of a license. Local f1 reveal vid.mp4 has an Envato watermark; never remove it to imply a licensed asset. Preview extracts start at 12 seconds, remain in ignored scratch/media, served only by /api/preview-media in development and excluded from production file tracing. Production uses the original engineering illustration until media is approved.
2. Audio: licensed original cinematic track or engine recording, source and permission. Sound stays off, no soundtrack is fabricated or ripped.
3. Spline: original or licensed formula-style .splinecode URL, author and license, plus poster. No unrelated public scene will be substituted. Scene slot keeps a static fallback.
4. Supabase: project URL, publishable key, server-side credentials via environment, authorized admin/editor accounts and approved storage policies. Not needed for local homepage work. Keep existing MongoDB credentials if retaining forms during migration.
5. Content: approved hero copy, publishable project case studies with owners/repository links, gallery captions and credits, verified council year and media rights, recruitment state.
6. Confirm canonical production domain and official social/contact values before release. Existing repository values are preserved.

Never commit private credentials. Do not push or deploy without user approval.

## Swapping the intro
Edit data/media.ts. previewClip selects youtube or studio for development only. approvedIntro holds the production video, poster and optional audio. The preloader receives videoSrc from this configuration. introSettings.speed controls the entire cube choreography, currently 0.55 for roughly 7.6 seconds including exit. This clip is intro-only. A new original or licensed homepage hero visual is still to be selected with the user.

## Current direction update
Spline is no longer required. No paid scene, plan or watermark is accepted. The Engineering Lab now uses the self-hosted CC0 model, Three.js, React Three Fiber, Drei and Anime.js. The earlier Spline request is superseded.

Audio reference requested: Don Toliver, Lose My Mind (feat. Doja Cat), from F1 The Movie, https://youtu.be/WWEs82u37Mw. Public web-use rights and an approved audio master are still required before this commercial recording can be enabled. introMedia.audioSrc stays empty and sound defaults off. No audio has been ripped from the link. A licensed replacement can use the existing explicit-click sound control.
