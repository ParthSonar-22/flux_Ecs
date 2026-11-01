// app/api/events/route.js
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken } from '@/lib/auth'
import { getAllEvents, createEvent, deleteEvent } from '@/lib/events-store'

// GET: Fetch events (public visitors only see published events)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const all = searchParams.get('all') === 'true'

    let includeDrafts = false
    if (all) {
      const cookieStore = await cookies()
      const token = cookieStore.get('flux_admin_token')?.value
      includeDrafts = verifyAdminToken(token)
    }

    const events = await getAllEvents({ includeDrafts })
    return NextResponse.json({ ok: true, events })
  } catch (error) {
    console.error('Failed to get events:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

// POST: Create a new event with poster (Admin only)
export async function POST(req) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ ok: false, error: 'Unauthorized admin access' }, { status: 401 })
    }

    const body = await req.json()
    const { title, date, description } = body

    if (!title || !date || !description) {
      return NextResponse.json(
        { ok: false, error: 'Title, date, and description are required.' },
        { status: 400 }
      )
    }

    const event = await createEvent(body)
    return NextResponse.json({ ok: true, event })
  } catch (error) {
    console.error('Failed to create event:', error)
    return NextResponse.json({ ok: false, error: error.message || 'Creation failed' }, { status: 500 })
  }
}

// DELETE: Delete an event (Admin only)
export async function DELETE(req) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ ok: false, error: 'Unauthorized admin access' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ ok: false, error: 'Event identifier required' }, { status: 400 })
    }

    await deleteEvent(id)
    return NextResponse.json({ ok: true, message: 'Event successfully removed' })
  } catch (error) {
    console.error('Failed to delete event:', error)
    return NextResponse.json({ ok: false, error: error.message || 'Deletion failed' }, { status: 500 })
  }
}
