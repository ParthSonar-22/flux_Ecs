import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken } from '@/lib/auth'
import { getAllAdmins, addAdmin, removeAdmin } from '@/lib/admins-store'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    const admins = await getAllAdmins()
    return NextResponse.json({ ok: true, data: admins })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { email, name, role } = await req.json()
    const newAdmin = await addAdmin({ email, name, role })
    return NextResponse.json({ ok: true, data: newAdmin })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 })
  }
}

export async function DELETE(req) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    await removeAdmin(email)
    return NextResponse.json({ ok: true, message: 'Admin removed successfully' })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 })
  }
}
