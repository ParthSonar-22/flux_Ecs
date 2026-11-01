import { NextResponse } from 'next/server'

export async function DELETE(req, { params }) {
  const { id } = await params
  return NextResponse.json({ success: true, message: `Gallery item ${id} deleted` })
}
