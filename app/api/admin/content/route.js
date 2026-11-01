import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken } from '@/lib/auth'
import { getSiteContent, updateSiteContent } from '@/lib/site-content'

export async function GET() {
  const content = await getSiteContent()
  return NextResponse.json({ ok: true, data: content })
}

export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    if (!verifyAdminToken(token, 'admin')) {
      return NextResponse.json({ ok: false, error: 'Unauthorized: Admin or Super Admin role required to update site content' }, { status: 403 })
    }

    const body = await req.json()
    const result = await updateSiteContent(body)
    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({ ok: true, data: result.data })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
