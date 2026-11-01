import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getBlogBySlug, deleteBlog } from '@/lib/blogs-store'
import { verifyAdminToken } from '@/lib/auth'

export async function GET(request, { params }) {
  try {
    const { slug } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    const isAuthorized = verifyAdminToken(token, 'editor')

    const blog = await getBlogBySlug(slug, { includeDrafts: isAuthorized })
    if (!blog) {
      return NextResponse.json({ ok: false, error: 'Blog not found' }, { status: 404 })
    }
    return NextResponse.json({ ok: true, blog })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    if (!verifyAdminToken(token, 'admin')) {
      return NextResponse.json({ ok: false, error: 'Unauthorized: Admin role required to delete' }, { status: 401 })
    }

    const { slug } = await params
    const res = await deleteBlog(slug)
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: res.error || 'Failed to delete' }, { status: 404 })
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
