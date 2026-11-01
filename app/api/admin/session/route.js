import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAdminSession } from '@/lib/auth'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    const session = getAdminSession(token)

    if (!session.valid) {
      return NextResponse.json({ ok: false, error: session.reason || 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({
      ok: true,
      session: {
        email: session.email,
        role: session.role,
        name: session.name,
      },
    })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
