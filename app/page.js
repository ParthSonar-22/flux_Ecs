import Image from 'next/image'
import Link from 'next/link'
import RacingHero from '@/components/home/racing-hero'
import ScrollStory from '@/components/home/scroll-story'
import { Arrow } from '@/components/ui/arrow'
import { getAllEvents } from '@/lib/events-store'
import { eventPhase, eventDate, publicPoster, registrationState } from '@/lib/event-presentation'
import { getSiteContent } from '@/lib/site-content'

export const metadata = {
  title: 'FluxECS | Electronics & Computer Science, VESIT',
  description: 'From circuits to code. Meet the Electronics & Computer Science council at VESIT, Mumbai. Explore our events, workshops and student community.',
}
export const dynamic = 'force-dynamic'

export default async function HomePage({ searchParams }) {
  const query = await searchParams
  const palette = process.env.NODE_ENV === 'development' ? query?.palette : undefined
  const [events, siteContent] = await Promise.all([
    getAllEvents({ includeDrafts: false }),
    getSiteContent(),
  ])
  const event = events.find(e => e.is_featured) || events.find(e => eventPhase(e) !== 'past') || events[0]
  const registration = event ? registrationState(event) : null

  return (
    <div className="v2-home" data-palette={palette}>
      <RacingHero
        slides={siteContent.heroSlides}
        content={siteContent.hero}
      />
      <ScrollStory>

        {/* ── Featured event (dark, on-brand) ─────────────────────────── */}
        <section className="fx-section fx-section--event" id="featured-event" data-story>
          <div className="fx-container">
            <div className="fx-section-top">
              <span className="fx-eyebrow">On the calendar</span>
              <Link className="fx-link" href="/events">All events <Arrow /></Link>
            </div>
            {event ? (
              <div className="fx-feature-grid" data-reveal>
                <div className="fx-feature-copy">
                  <span className="fx-status">
                    {eventPhase(event) === 'past' ? 'From the archive' : eventPhase(event) === 'ongoing' ? 'Happening now' : 'Coming up'}
                    {' · '}{eventDate(event)}
                  </span>
                  <h2 className="fx-heading">{event.title}</h2>
                  <p className="fx-text">{event.summary || event.description}</p>
                  <dl className="fx-event-facts">
                    <div>
                      <dt>When</dt>
                      <dd>{event.time || 'Time to be announced'}<small>India Standard Time</small></dd>
                    </div>
                    <div>
                      <dt>Where</dt>
                      <dd>{event.venue || 'Venue to be announced'}</dd>
                    </div>
                  </dl>
                  <div className="fx-actions">
                    <Link className="fx-button" href={`/events/${event.slug}`}>Explore the event <Arrow /></Link>
                    {registration?.href && (
                      <a className="fx-link" href={registration.href} target="_blank" rel="noreferrer">
                        {registration.label} ↗
                      </a>
                    )}
                  </div>
                </div>
                <Link href={`/events/${event.slug}`} className="fx-feature-poster" aria-label={`View ${event.title}`}>
                  {publicPoster(event)
                    ? <Image src={publicPoster(event)} alt={`${event.title} event artwork`} width={723} height={1024} sizes="(max-width:700px) 90vw, 33vw" />
                    : <span>{event.title}</span>
                  }
                  <span className="fx-poster-caption">Official event artwork <Arrow /></span>
                </Link>
              </div>
            ) : (
              <div className="fx-empty">
                <h2 className="fx-heading">More to come.</h2>
                <p>New events will be announced here.</p>
                <Link className="fx-link" href="/events">Explore events <Arrow /></Link>
              </div>
            )}
          </div>
        </section>

        {/* ── Lab photo band ────────────────────────────────────────────── */}
        <section className="fx-section--lab-band" data-story aria-hidden="false">
          <figure style={{ margin: 0, position: 'relative', height: 'clamp(240px,32vw,460px)', overflow: 'hidden' }}>
            <Image
              src="/photos/iota-electrical-lab-discussion.png"
              alt="Students and faculty in the IoTA lab at VESIT"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center 35%', filter: 'saturate(.75)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,#0d1014d0 0%,#0d101450 50%,transparent)' }} />
            <figcaption style={{ position: 'absolute', bottom: '28px', left: 'var(--page-gutter)', zIndex: 1 }}>
              <div className="fx-container" style={{ width: 'auto', margin: 0 }}>
                <span className="fx-eyebrow" style={{ color: 'var(--titanium)' }}>Inside the lab</span>
                <h2 className="fx-heading" style={{ fontSize: 'clamp(36px,4.5vw,64px)', margin: '10px 0 18px', maxWidth: '12ch' }}>
                  Student-led.<br />Built together.
                </h2>
                <Link className="fx-button" href="/about">Meet FluxECS <Arrow /></Link>
              </div>
            </figcaption>
          </figure>
        </section>

      </ScrollStory>
    </div>
  )
}
