import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import connectMongo from '@/lib/mongodb'
import Subscriber from '@/models/Subscriber'
import { verifyAdminToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value

    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let subscribers = []
    if (process.env.MONGODB_URI) {
      await connectMongo()
      subscribers = await Subscriber.find({}).sort({ createdAt: -1 }).lean()
    }

    const csvRows = ['Email,SubscribedAt']
    for (const sub of subscribers) {
      const date = sub.createdAt ? new Date(sub.createdAt).toISOString() : ''
      csvRows.push(`"${sub.email}","${date}"`)
    }

    const csvContent = csvRows.join('\n')

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="flux_ecs_subscribers.csv"',
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Failed to export subscribers' }, { status: 500 })
  }
}
