import { NextResponse } from 'next/server'
import { posts as defaultPosts } from '@/data/posts'

let memoryPosts = [...defaultPosts]

export async function GET() {
  return NextResponse.json({ success: true, data: memoryPosts })
}

export async function POST(req) {
  try {
    const body = await req.json()
    if (!body.title) {
      return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 })
    }

    const newPost = {
      id: body.id || `post-${Date.now()}`,
      slug: body.slug || (body.title || 'post').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: body.title,
      subtitle: body.subtitle || '',
      date: body.date || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      category: body.category || 'Announcement',
      coverPhoto: body.coverPhoto || '/photos/iota-robotics-chassis-presentation.jpg',
      coverAspect: 'aspect-[1024/628]',
      intro: body.intro || '',
      sections: body.sections || [],
      gallery: body.gallery || [],
      createdAt: new Date().toISOString(),
    }

    memoryPosts = [newPost, ...memoryPosts]
    return NextResponse.json({ success: true, data: newPost }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
