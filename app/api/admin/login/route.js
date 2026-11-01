import { NextResponse } from 'next/server'
import { generateAdminToken } from '@/lib/auth'

export async function POST(req) {
  try {
    const { password } = await req.json()
    const correctPassword = process.env.ADMIN_PASSWORD || 'flux2026'

    if (password !== correctPassword) {
      return NextResponse.json(
        { success: false, ok: false, error: 'Invalid administrative key' },
        { status: 401 }
      )
    }

    const token = generateAdminToken()
    const user = {
      role: 'admin',
      name: 'FLUX-ECS Secretariat',
      email: 'flux.ecs@ves.ac.in',
    }

    const response = NextResponse.json({
      success: true,
      ok: true,
      token,
      user,
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
    return NextResponse.json(
      { success: false, ok: false, error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
