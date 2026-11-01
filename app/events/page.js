import { Suspense } from 'react'
import Reveal from '@/components/Reveal'
import EventsView from '@/components/EventsView'
import { getAllEvents } from '@/lib/events-store'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Events & Initiatives | FluxECS · VESIT',
  description:
    'Hands-on technical workshops, competitive algorithmic auctions, and hardware showcases organized by the Department of Electronics & Computer Science, VESIT.',
  openGraph: {
    title: "Algorithm's Auction & IoTA Archives | FLUX-ECS",
    description:
      'Explore upcoming and past department proceedings at the Department of Electronics & Computer Science, VESIT.',
    images: ['/posters/algorithms-auction.jpg'],
  },
}

export default async function EventsPage() {
  const events = await getAllEvents({ includeDrafts: false })

  return (
    <Reveal>
      <Suspense
        fallback={
          <div className="w-full min-h-[50vh] flex items-center justify-center p-12 bg-[#0D1014] text-white">
            <span className="font-mono text-xs text-gray-400 animate-pulse">
              Loading proceedings docket...
            </span>
          </div>
        }
      >
        <EventsView initialEvents={events} />
      </Suspense>
    </Reveal>
  )
}
