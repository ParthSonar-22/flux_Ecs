import { NextResponse } from 'next/server'
import { generateAdminToken } from '@/lib/auth'
import { getAllAdmins, SUPER_ADMIN_EMAIL } from '@/lib/admins-store'

export async function POST(req) {
  try {
    const { email, password } = await req.json()
    const correctPassword = process.env.ADMIN_PASSWORD
    if (!correctPassword || !process.env.ADMIN_SECRET) {
      return NextResponse.json({ ok: false, error: 'Admin access is not configured.' }, { status: 503 })
    }

    if (password !== correctPassword) {
      return NextResponse.json({ ok: false, error: 'Invalid authentication key' }, { status: 401 })
    }

    let role = 'super_admin'
    let userEmail = SUPER_ADMIN_EMAIL
    let name = 'Aarya (Super Admin)'

    if (email && typeof email === 'string' && email.trim()) {
      const cleanEmail = email.trim().toLowerCase()
      if (cleanEmail !== SUPER_ADMIN_EMAIL.toLowerCase()) {
        const admins = await getAllAdmins()
        const found = admins.find(a => a.email.toLowerCase() === cleanEmail)
        if (!found) {
          return NextResponse.json(
            { ok: false, error: 'No administrator registered with this email address' },
            { status: 403 }
          )
        }
        if (found.status === 'inactive') {
          return NextResponse.json(
            { ok: false, error: 'Administrator account is deactivated' },
            { status: 403 }
          )
        }
        role = found.role || 'admin'
        userEmail = found.email
        name = found.name || found.email.split('@')[0]
      }
    }

    const token = generateAdminToken({ email: userEmail, role, name })
    const response = NextResponse.json({
      ok: true,
      session: { email: userEmail, role, name },
    })

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
