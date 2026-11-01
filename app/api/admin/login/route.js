import { NextResponse } from 'next/server'
import { generateAdminToken } from '@/lib/auth'

export async function POST(req) {
  try {
    const { password } = await req.json()
    const correctPassword = process.env.ADMIN_PASSWORD
    if (!correctPassword || !process.env.ADMIN_SECRET) {
      return NextResponse.json({ ok: false, error: 'Admin access is not configured.' }, { status: 503 })
    }

    if (password !== correctPassword) {
      return NextResponse.json({ ok: false, error: 'Invalid authentication key' }, { status: 401 })
    }

    const token = generateAdminToken()
    const response = NextResponse.json({ ok: true })

    response.cookies.set('flux_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Authentication failed' }, { status: 500 })
  }
}
