/** Local references are excluded from builds. Public audio requires recorded web rights. */
export const radioTrack = process.env.NODE_ENV === 'development'
  ? { title: 'Local soundtrack preview', artist: 'Private reference', src: '/api/preview-media/f1-soundtrack.mp3' }
  : { title: 'PitRadio', artist: '', src: '' }
