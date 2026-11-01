import { NextResponse } from 'next/server'
import { subscribeNewsletter } from '@/lib/newsletter'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email } = body
    const res = await subscribeNewsletter(email)
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: res.error }, { status: 400 })
    }
    return NextResponse.json({ ok: true, message: res.message })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
