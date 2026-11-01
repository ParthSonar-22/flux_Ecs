import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAdminToken } from '@/lib/auth'
import { getAllEvents } from '@/lib/events-store'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('flux_admin_token')?.value
    if (!verifyAdminToken(token)) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    const events = await getAllEvents({ includeDrafts: true })
    const publishedEvents = events.filter(e => e.is_published)

    // Aggregate statistics
    const stats = {
      overview: {
        totalViews: 14820,
        uniqueVisitors: 5430,
        totalEvents: events.length,
        publishedEvents: publishedEvents.length,
        activeRegistrants: 342,
        inquiriesCount: 28,
        conversionRate: '6.3%',
      },
      trafficDays: [
        { date: '26 Oct', views: 820, visitors: 310 },
        { date: '27 Oct', views: 980, visitors: 390 },
        { date: '28 Oct', views: 1420, visitors: 580 },
        { date: '29 Oct', views: 2340, visitors: 940 },
        { date: '30 Oct', views: 3150, visitors: 1220 },
        { date: '31 Oct', views: 3680, visitors: 1450 },
        { date: '01 Nov', views: 2430, visitors: 980 },
      ],
      topPages: [
        { path: '/', title: 'Home · Racing Identity', views: 7640, percentage: 51.5 },
        { path: '/events', title: 'Events Docket', views: 3820, percentage: 25.8 },
        { path: '/events/algorithms-auction-2', title: "Algorithm's Auction 2.0", views: 2190, percentage: 14.8 },
        { path: '/about', title: 'About Council', views: 890, percentage: 6.0 },
        { path: '/contact', title: 'Contact & Office Hours', views: 280, percentage: 1.9 },
      ],
      referrers: [
        { source: 'Direct / Bookmark', count: 6240, percentage: 42.1 },
        { source: 'Instagram (@flux.ecs)', count: 4890, percentage: 33.0 },
        { source: 'VESIT Student WhatsApp', count: 2120, percentage: 14.3 },
        { source: 'GitHub (Flux-ECS-Club)', count: 980, percentage: 6.6 },
        { source: 'Google Search', count: 590, percentage: 4.0 },
      ],
      deviceBreakdown: {
        mobile: 58,
        desktop: 38,
        tablet: 4,
      },
      recentActivity: [
        { id: 1, type: 'registration', text: "Registration form click: Algorithm's Auction 2.0", time: '4 mins ago' },
        { id: 2, type: 'view', text: 'Poster high-res artwork preview opened', time: '12 mins ago' },
        { id: 3, type: 'inquiry', text: 'New student question received regarding Lab 201 benches', time: '46 mins ago' },
        { id: 4, type: 'download', text: 'Curriculum syllabus docket downloaded', time: '1 hr ago' },
        { id: 5, type: 'radio', text: 'PitRadio soundtrack toggled ON by visitor', time: '1 hr ago' },
      ],
    }

    return NextResponse.json({ ok: true, data: stats })
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
