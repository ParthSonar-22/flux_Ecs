import { NextResponse } from 'next/server'
import { galleryItems as defaultGallery } from '@/data/gallery'

let memoryGallery = [...defaultGallery]

export async function GET() {
  return NextResponse.json({ success: true, data: memoryGallery })
}

export async function POST(req) {
  try {
    const body = await req.json()
    if (!body.src) {
      return NextResponse.json({ success: false, error: 'Image source is required' }, { status: 400 })
    }

    const newItem = {
      id: body.id || `gallery-${Date.now()}`,
      title: body.title || 'Exhibition Photo',
      category: body.category || 'Exhibition',
      date: body.date || new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
      src: body.src,
      description: body.description || '',
      aspect: body.aspect || 'aspect-[4/3]',
    }

    memoryGallery = [newItem, ...memoryGallery]
    return NextResponse.json({ success: true, data: newItem }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
