/** Change this one selection to compare intro clips locally. Hero media is separate. */
const previewClip: 'youtube' | 'studio' = 'youtube'
const preview = process.env.NODE_ENV === 'development'
const previewClips = {
  youtube: {
    src: '/api/preview-media/racing-hd.mp4',
    poster: '/api/preview-media/racing-poster.jpg',
    source: 'https://youtu.be/xImMTsU-MCE',
    originalStartSeconds: 12,
  },
  studio: {
    src: '/api/preview-media/studio-hd.mp4',
    poster: '/api/preview-media/studio-poster.jpg',
    source: 'User Downloads/f1 reveal vid.mp4, watermarked Envato preview',
    originalStartSeconds: 2,
  },
}
/** Fill only after web rights are confirmed. Empty video gives a safe fallback. */
const approvedIntro = {
  src: '', // e.g. /media/intro-approved.mp4
  poster: '/media/flux-emblem.svg',
  audioSrc: process.env.NEXT_PUBLIC_RADIO_URL || '/media/f1-soundtrack.mp3',
  source: '',
  originalStartSeconds: 0,
}
export const introMedia = {
  ...approvedIntro,
  audioSrc: process.env.NEXT_PUBLIC_RADIO_URL || '/media/f1-soundtrack.mp3',
  ...(preview
    ? {
        ...previewClips[previewClip],
      }
    : {}),
}
// Original preloader choreography runs more slowly, with every letter retained.
export const introSettings = { speed: 0.48, safetyTimeoutMs: 11000 }
export const splineScene = { url: '', credit: '', license: '' }
