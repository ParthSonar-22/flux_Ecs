import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { writeFile } from 'fs/promises'
import path from 'path'
import { verifyAdminToken } from '@/lib/auth'

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ ok: false, error: 'Unauthorized admin access' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file')

    if (!file || typeof file === 'string') {
      return NextResponse.json({ ok: false, error: 'No image file uploaded' }, { status: 400 })
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid file format. Please upload JPG, PNG, WEBP, or SVG.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { ok: false, error: 'File size exceeds 10MB limit.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = path.extname(file.name) || '.jpg'
    const cleanBase = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 40)
    const filename = `${cleanBase}-${Date.now()}${ext}`
    const targetPath = path.join(process.cwd(), 'public', 'posters', 'uploads', filename)

    await writeFile(targetPath, buffer)

    const publicUrl = `/posters/uploads/${filename}`
    return NextResponse.json({ ok: true, url: publicUrl })
  } catch (error) {
    console.error('Poster upload failed:', error)
    return NextResponse.json({ ok: false, error: 'Failed to process poster upload' }, { status: 500 })
  }
}
