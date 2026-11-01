import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import Subscriber from '@/models/Subscriber'
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
    const { email, hp } = body

    // Honeypot check
    if (hp) {
      return NextResponse.json({ ok: true })
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim()) || email.length > 200) {
      return NextResponse.json(
        { ok: false, error: 'Valid email address is required.' },
        { status: 400 }
      )
    }

    const cleanEmail = email.trim().toLowerCase()

    if (process.env.MONGODB_URI) {
      await connectMongo()
      // Upsert so re-subscribing doesn't throw a duplicate key error
      await Subscriber.findOneAndUpdate(
        { email: cleanEmail },
        { email: cleanEmail },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
    } else {
      return NextResponse.json({ ok: false, error: 'Newsletter signup is unavailable. Please try again later.' }, { status: 503 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { ok: false, error: 'Server error registering your subscription.' },
      { status: 500 }
    )
  }
}
