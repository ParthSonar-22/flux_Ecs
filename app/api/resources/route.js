import { NextResponse } from 'next/server'
import { getAllResources, saveResource, deleteResource } from '@/lib/resources-store'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || 'all'
    const search = searchParams.get('search') || ''

    const resources = await getAllResources({ category, search })
    return NextResponse.json({ ok: true, resources })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    if (!body.title) {
      return NextResponse.json({ ok: false, error: 'Title is required' }, { status: 400 })
    }

    const res = await saveResource(body)
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: 'Failed to save resource' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, resource: res.resource })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Resource ID required' }, { status: 400 })
    }

    const res = await deleteResource(id)
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: res.error || 'Failed to delete' }, { status: 404 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
