// app/api/events/[slug]/route.js
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken } from '@/lib/auth'
import { getEventBySlug, updateEvent, deleteEvent } from '@/lib/events-store'

export async function GET(req, { params }) {
  try {
    const { slug } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    const isAuthorized = verifyAdminToken(token)

    const event = await getEventBySlug(slug, { includeDrafts: isAuthorized })
    if (!event) {
      return NextResponse.json({ ok: false, error: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json({ ok: true, event })
  } catch (error) {
    console.error('Failed to get event by slug:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req, { params }) {
  try {
    const { slug } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ ok: false, error: 'Unauthorized admin access' }, { status: 401 })
    }

    const updates = await req.json()
    const updated = await updateEvent(slug, updates)
    if (!updated) {
      return NextResponse.json({ ok: false, error: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json({ ok: true, event: updated })
  } catch (error) {
    console.error('Failed to update event:', error)
    return NextResponse.json({ ok: false, error: error.message || 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { slug } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ ok: false, error: 'Unauthorized admin access' }, { status: 401 })
    }

    await deleteEvent(slug)
    return NextResponse.json({ ok: true, message: 'Event removed' })
  } catch (error) {
    console.error('Failed to delete event:', error)
    return NextResponse.json({ ok: false, error: error.message || 'Delete failed' }, { status: 500 })
  }
}
