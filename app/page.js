import Image from 'next/image'
import Link from 'next/link'
import RacingHero from '@/components/home/racing-hero'
import ScrollStory from '@/components/home/scroll-story'
import { Arrow } from '@/components/ui/arrow'
import { events } from '@/data/events'

export const metadata = {
  title: 'FluxECS | Electronics & Computer Science Council · VESIT',
  description:
    'The official student branch council for Electronics & Computer Science at VESIT, Mumbai. Uniting hardware builders, software developers, and engineering innovators.',
}
export const dynamic = 'force-dynamic'

// Clean SVG icons for metadata
const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const LocationIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export default function HomePage() {
  const event = events[0]
  const upcoming = new Date(event.endDate) >= new Date()
  const formattedTime = (event.time || '').replace(/[—–]/g, '-')

  return (
    <div className="v2-home homepage-refined">
      {/* ==============================================================
          A. HERO SECTION: Official Institutional Identity
         ============================================================== */}
      <RacingHero />

      <ScrollStory>
        {/* ==============================================================
            B. FEATURED EVENT: One Real Published Event & Authentic Poster
           ============================================================== */}
        <section
          className="home-section event-section"
          id="featured-event"
          data-story
        >
          <div className="section-heading" data-reveal>
            <div>
              <span className="eyebrow orange">01 / FEATURED EVENT</span>
              <h2>{upcoming ? 'UPCOMING TOURNAMENT.' : 'EVENT ARCHIVE.'}</h2>
            </div>
            <Link href="/events" className="text-link">
              All events &amp; workshops <Arrow />
            </Link>
          </div>

          <div className="featured-event" data-reveal>
            {/* Poster Showcase Container: Authentic 3:4 aspect ratio */}
            <Link
              href={`/events/${event.slug || 'algorithms-auction'}`}
              className="event-poster relative aspect-[3/4] block overflow-hidden rounded-lg group shadow-xl"
            >
              <Image
                src={event.poster}
                alt={`${event.title} official event poster`}
                fill
                priority
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                sizes="(max-width: 700px) 100vw, 42vw"
              />
              <span className="absolute top-3 left-3 bg-[#D94A5B] text-white text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-1 rounded shadow-md">
                {upcoming ? 'Registration Live' : 'Archive'}
              </span>
            </Link>

            <div className="event-content">
              <span className="event-status mono">
                <span className="status-dot" />{' '}
                {upcoming ? '02 / 03 NOVEMBER 2026' : 'EVENT ARCHIVE'}
              </span>

              <div className="event-title">
                <h3>
                  ALGORITHM&apos;S
                  <br />
                  <span>AUCTION.</span>
                </h3>
                <p>
                  Two days of logic, strategic bidding, and competitive coding across all ECS years.
                </p>
              </div>

              {/* Minimal Meta Row */}
              <div className="flex flex-col gap-2 py-3 border-y border-white/10 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <CalendarIcon />
                  <span className="font-mono">02 - 03 November 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon />
                  <span className="font-mono">{formattedTime || '1:00 PM - 3:30 PM'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LocationIcon />
                  <span>{event.venue}</span>
                </div>
              </div>

              <div className="event-actions pt-2">
                <Link
                  href={`/events/${event.slug || 'algorithms-auction'}`}
                  className="button-primary"
                >
                  View event overview <Arrow />
                </Link>
                {upcoming && event.registerUrl && (
                  <a
                    href={event.registerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button-secondary"
                  >
                    Register now ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            C. ABOUT THE COUNCIL: One Authentic Photo & Factual Statement
           ============================================================== */}
        <section
          className="home-section community-section"
          id="community"
          data-story
        >
          <div className="community-layout">
            <div className="community-image" data-reveal>
              <Image
                src="/photos/iota-tinkerers-lab-cohort.jpg"
                alt="FluxECS students together in the Tinkerers' Lab"
                fill
                sizes="(max-width:700px) 100vw, 55vw"
              />
              <span className="mono">TINKERERS&apos; LAB / VESIT</span>
            </div>

            <div className="community-copy" data-reveal>
              <span className="eyebrow orange">02 / ABOUT FLUXECS</span>
              <h2>
                A COUNCIL
                <br />
                <span>THAT BUILDS.</span>
              </h2>
              <p>
                The official student branch council for the Department of Electronics &amp;
                Computer Science at VESIT, Mumbai. We run peer-led workshops, open-source
                hackathons, and hardware exhibitions uniting student innovators across all years.
              </p>
              <Link href="/about" className="text-link">
                About the Council &amp; Faculty Leadership <Arrow />
              </Link>
            </div>
          </div>
        </section>
      </ScrollStory>
    </div>
  )
}
