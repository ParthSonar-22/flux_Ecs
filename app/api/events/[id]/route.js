import { NextResponse } from 'next/server'
import { events as defaultEvents } from '@/data/events'

export async function GET(req, { params }) {
  const { id } = await params
  const event = defaultEvents.find((e) => e.id === id || e.slug === id)
  if (!event) {
    return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true, data: event })
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params
    const updates = await req.json()
    return NextResponse.json({ success: true, data: { id, ...updates } })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params
  return NextResponse.json({ success: true, message: `Event ${id} removed` })
}
