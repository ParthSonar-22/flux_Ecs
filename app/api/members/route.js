import { NextResponse } from 'next/server'
import { seniorCouncil, juniorCouncil, faculty } from '@/data/team'

let memoryMembers = [
  ...faculty.map((f, i) => ({ ...f, id: `fac-${i}`, tier: 'faculty' })),
  ...seniorCouncil.map((m) => ({ ...m, tier: 'senior' })),
  ...juniorCouncil.map((m) => ({ ...m, tier: 'junior' })),
]

export async function GET() {
  return NextResponse.json({ success: true, data: memoryMembers })
}

export async function POST(req) {
  try {
    const body = await req.json()
    if (!body.name) {
      return NextResponse.json({ success: false, error: 'Name is required' }, { status: 400 })
    }

    const newMember = {
      id: body.id || `member-${Date.now()}`,
      name: body.name,
      displayName: body.displayName || body.name,
      role: body.role || 'Officer',
      post: body.post || body.role || 'Officer',
      badge: body.badge || body.role || 'Officer',
      tier: body.tier || 'junior',
      department: body.department || 'ECS Department',
      phone: body.phone || '',
      photo: body.photo || '/team/parth-sonar.jpg',
      quote: body.quote || '',
      bio: body.bio || '',
      linkedin: body.linkedin || '',
      instagram: body.instagram || '',
      github: body.github || '',
      createdAt: new Date().toISOString(),
    }

    memoryMembers = [...memoryMembers, newMember]
    return NextResponse.json({ success: true, data: newMember }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
