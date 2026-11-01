import { NextResponse } from 'next/server'
import { posts as defaultPosts } from '@/data/posts'

export async function GET(req, { params }) {
  const { id } = await params
  const post = defaultPosts.find((p) => p.id === id || p.slug === id)
  if (!post) {
    return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true, data: post })
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
  return NextResponse.json({ success: true, message: `Post ${id} removed` })
}
