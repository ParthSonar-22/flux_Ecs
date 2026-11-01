import { NextResponse } from 'next/server'
import { getAllBlogs, saveBlog } from '@/lib/blogs-store'
import { dispatchBlogNotification } from '@/lib/newsletter'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || 'all'
    const search = searchParams.get('search') || ''
    const tag = searchParams.get('tag') || ''
    const includeDrafts = searchParams.get('includeDrafts') === 'true'

    const blogs = await getAllBlogs({ includeDrafts, category, search, tag })
    return NextResponse.json({ ok: true, blogs })
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

    const res = await saveBlog(body)
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: 'Failed to save blog' }, { status: 500 })
    }

    // If published, trigger newsletter dispatch
    if (res.blog.status === 'published') {
      try {
        await dispatchBlogNotification(res.blog)
      } catch (dispatchErr) {
        console.warn('Newsletter dispatch warning:', dispatchErr)
      }
    }

    return NextResponse.json({ ok: true, blog: res.blog })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
