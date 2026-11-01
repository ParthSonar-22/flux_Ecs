import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getAllBlogs, saveBlog } from '@/lib/blogs-store'
import { dispatchBlogNotification } from '@/lib/newsletter'
import { verifyAdminToken } from '@/lib/auth'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || 'all'
    const search = searchParams.get('search') || ''
    const tag = searchParams.get('tag') || ''
    const requestedDrafts = searchParams.get('includeDrafts') === 'true'

    let includeDrafts = false
    if (requestedDrafts) {
      const cookieStore = await cookies()
      const token = cookieStore.get('flux_admin_token')?.value
      includeDrafts = verifyAdminToken(token, 'editor')
    }

    const blogs = await getAllBlogs({ includeDrafts, category, search, tag })
    return NextResponse.json({ ok: true, blogs })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    if (!verifyAdminToken(token, 'editor')) {
      return NextResponse.json({ ok: false, error: 'Unauthorized: Editor role required' }, { status: 401 })
    }

    const body = await request.json()
    if (!body.title) {
      return NextResponse.json({ ok: false, error: 'Title is required' }, { status: 400 })
    }

    // Role check: Only admin or super_admin can publish directly
    if (body.status === 'published' && !verifyAdminToken(token, 'admin')) {
      return NextResponse.json({ ok: false, error: 'Unauthorized: Admin role required to publish' }, { status: 403 })
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
