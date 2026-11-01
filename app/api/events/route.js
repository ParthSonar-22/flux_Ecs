import { NextResponse } from 'next/server'
import { events as defaultEvents } from '@/data/events'

// In-memory store for server lifetime
let memoryEvents = [...defaultEvents]

export async function GET() {
  return NextResponse.json({ success: true, data: memoryEvents })
}

export async function POST(req) {
  try {
    const body = await req.json()
    if (!body.title) {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      )
    }

    const newEvent = {
      id: body.id || `evt-${Date.now()}`,
      slug: body.slug || (body.title || 'event').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: body.title,
      posterLine: body.posterLine || '',
      shortLine: body.shortLine || '',
      status: body.status || 'upcoming',
      startDate: body.startDate || new Date().toISOString(),
      endDate: body.endDate || new Date().toISOString(),
      venue: body.venue || 'VESIT Campus',
      time: body.time || '10:00 AM – 4:00 PM',
      poster: body.poster || '/posters/algorithms-auction.jpg',
      registerUrl: body.registerUrl || '',
      intro: body.intro || '',
      createdAt: new Date().toISOString(),
    }

    memoryEvents = [newEvent, ...memoryEvents]
    return NextResponse.json({ success: true, data: newEvent }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
