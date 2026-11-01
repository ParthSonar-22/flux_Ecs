import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { verifyAdminToken } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'application/pdf',
]

const MAX_FILE_SIZE = 15 * 1024 * 1024 // 15MB limit

export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    if (!verifyAdminToken(token, 'media_editor')) {
      return NextResponse.json({ ok: false, error: 'Unauthorized admin access' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file')

    if (!file || typeof file === 'string') {
      return NextResponse.json({ ok: false, error: 'No media or document file uploaded' }, { status: 400 })
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid file format. Supported: JPG, PNG, WEBP, SVG, and PDF.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { ok: false, error: 'File size exceeds 15MB limit.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = path.extname(file.name) || (file.type === 'application/pdf' ? '.pdf' : '.jpg')
    const cleanBase = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .slice(0, 40)
    const filename = `${cleanBase}-${Date.now()}${ext}`

    // 1. If Supabase Storage is configured in environment, upload to bucket
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey)
        const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'media'
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(`uploads/${filename}`, buffer, {
            contentType: file.type,
            upsert: true,
          })

        if (!uploadError) {
          const { data: pubData } = supabase.storage.from(bucket).getPublicUrl(`uploads/${filename}`)
          return NextResponse.json({
            ok: true,
            url: pubData.publicUrl,
            persistent: true,
            provider: 'supabase',
          })
        }
        console.warn('Supabase storage upload failed, falling back to local disk:', uploadError.message)
      } catch (sbErr) {
        console.warn('Supabase upload exception:', sbErr.message)
      }
    }

    // 2. Local disk fallback (development & local testing)
    const uploadDir = path.join(process.cwd(), 'public', 'posters', 'uploads')
    await mkdir(uploadDir, { recursive: true })
    const targetPath = path.join(uploadDir, filename)

    await writeFile(targetPath, buffer)

    const publicUrl = `/posters/uploads/${filename}`
    return NextResponse.json({
      ok: true,
      url: publicUrl,
      persistent: false,
      provider: 'local',
    })
  } catch (error) {
    console.error('File upload failed:', error)
    return NextResponse.json({ ok: false, error: 'Failed to process media upload' }, { status: 500 })
  }
}
