import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  const response = NextResponse.json({ ok: true, message: 'Logged out successfully' })
  response.cookies.delete('flux_admin_token')
  return response
}
