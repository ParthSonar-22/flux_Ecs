import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'

const allowed = new Set([
  'f1-soundtrack.mp3',
  'intro-reference.m4a',
  'racing.mp4',
  'studio-hd.mp4',
  'studio-poster.jpg',
  'racing-hd.mp4',
  'racing-poster.jpg',
  'video-contact-sheet.jpg',
])
export const dynamic = 'force-dynamic'
/** Review media never enters public/ and is never served in production. */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  if (process.env.NODE_ENV !== 'development')
    return new Response(null, { status: 404 })
  const { file } = await params
  if (!allowed.has(file)) return new Response(null, { status: 404 })
  try {
    const target = path.join(process.cwd(), 'scratch/media', file)
    const info = await stat(target)
    const headers = new Headers({
      'Content-Type': file.endsWith('.mp4')
        ? 'video/mp4'
        : file.endsWith('.mp3')
          ? 'audio/mpeg'
        : file.endsWith('.m4a')
          ? 'audio/mp4'
          : 'image/jpeg',
      'Cache-Control': 'private, no-store',
      'Accept-Ranges': 'bytes',
    })
    const range = request.headers.get('range')
    const bytes = await readFile(target)
    if (range) {
      const match = /^bytes=(\d+)-(\d*)$/.exec(range)
      if (!match)
        return new Response(null, {
          status: 416,
          headers: { 'Content-Range': `bytes */${info.size}` },
        })
      const start = Number(match[1])
      const end = match[2]
        ? Math.min(Number(match[2]), info.size - 1)
        : info.size - 1
      if (start >= info.size || start > end)
        return new Response(null, {
          status: 416,
          headers: { 'Content-Range': `bytes */${info.size}` },
        })
      headers.set('Content-Range', `bytes ${start}-${end}/${info.size}`)
      headers.set('Content-Length', String(end - start + 1))
      return new Response(new Uint8Array(bytes.subarray(start, end + 1)), {
        status: 206,
        headers,
      })
    }
    headers.set('Content-Length', String(info.size))
    return new Response(new Uint8Array(bytes), { headers })
  } catch {
    return new Response(null, { status: 404 })
  }
}
