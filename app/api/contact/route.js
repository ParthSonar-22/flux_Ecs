import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Message from '@/models/Message'
import { rateLimit } from '@/app/api/_rateLimit'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1'

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Rate limit exceeded. Please wait a minute.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { name, email, year, category, message, hp } = body

    // Honeypot check — ignore if bot filled it out
    if (hp) {
      return NextResponse.json({ ok: true })
    }

    // Input validation
    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 120) {
      return NextResponse.json(
        { ok: false, error: 'Valid name is required (max 120 chars).' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim()) || email.length > 200) {
      return NextResponse.json(
        { ok: false, error: 'Valid email address is required.' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0 || message.length > 3000) {
      return NextResponse.json(
        { ok: false, error: 'Message is required (max 3000 chars).' },
        { status: 400 }
      )
    }

    const cleanYear = year ? String(year).slice(0, 10) : 'FE'
    const cleanCategory = category ? String(category).slice(0, 80) : 'General question'

    // Connect DB & Save (graceful fallback if MongoDB is not configured locally)
    if (process.env.MONGODB_URI) {
      await connectMongo()
      await Message.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        year: cleanYear,
        category: cleanCategory,
        message: message.trim(),
        isRead: false,
      })
    } else {
      return NextResponse.json({ ok: false, error: 'Message delivery is unavailable. Please email flux.ecs@ves.ac.in.' }, { status: 503 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { ok: false, error: 'Server error processing your dispatch.' },
      { status: 500 }
    )
  }
}
