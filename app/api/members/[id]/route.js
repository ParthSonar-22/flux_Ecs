import { NextResponse } from 'next/server'

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
  return NextResponse.json({ success: true, message: `Member ${id} removed` })
}
