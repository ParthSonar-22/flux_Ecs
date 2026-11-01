import { notFound } from 'next/navigation'
import { getEventBySlug, getAllEvents } from '@/lib/events-store'
import EventDetailClient from '@/components/EventDetailClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    return {
      title: 'Event Not Found | FluxECS',
    }
  }

  return {
    title: `${event.title} | FluxECS Events · VESIT`,
    description: event.summary || event.description?.slice(0, 160) || 'Official FluxECS event',
    openGraph: {
      title: `${event.title} | FluxECS · VESIT`,
      description: event.summary || event.description?.slice(0, 160),
      images: event.poster_url || event.poster ? [event.poster_url || event.poster] : [],
    },
  }
}

export async function generateStaticParams() {
  const events = await getAllEvents()
  return events.map((e) => ({ slug: e.slug }))
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  return <EventDetailClient event={event} />
}
