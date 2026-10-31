import { Suspense } from 'react'
import Reveal from '@/components/Reveal'
import EventsView from '@/components/EventsView'

export const metadata = {
  title: 'Events & Exhibitions',
  description:
    'Competitive hackathons, algorithmic auctions, and hands-on hardware showcases at VESIT ECS.',
  openGraph: {
    title: "Algorithm's Auction & IoTA Archives | FLUX-ECS",
    description:
      'Explore upcoming and past department proceedings at the Department of Electronics & Computer Science, VESIT.',
    images: ['/posters/algorithms-auction.jpg'],
  },
}

export default function EventsPage() {
  return (
    <Reveal>
      <Suspense
        fallback={
          <div className="w-full min-h-[50vh] flex items-center justify-center p-12">
            <span className="font-complexity-notation text-sm text-ink animate-pulse">
              Loading proceedings docket...
            </span>
          </div>
        }
      >
        <EventsView />
      </Suspense>
    </Reveal>
  )
}
