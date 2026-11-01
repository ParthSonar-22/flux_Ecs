import { NextResponse } from 'next/server'
import { getBlogBySlug, deleteBlog } from '@/lib/blogs-store'

export async function GET(request, { params }) {
  try {
    const { slug } = await params
    const blog = await getBlogBySlug(slug)
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
