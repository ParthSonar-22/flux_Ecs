import { notFound } from 'next/navigation'
import RacingHero from '@/components/home/racing-hero'
import SplineStage from '@/components/home/spline-stage'
export const metadata = {
  title: 'Hero B design study',
  robots: { index: false, follow: false },
}
export default function HeroPrototype() {
  if (process.env.NODE_ENV !== 'development') notFound()
  return (
    <div className="v2-home">
      <RacingHero concept="b" />
      <section className="home-section">
        <span className="eyebrow orange">
          LOCAL DESIGN COMPARISON / CONCEPT B
        </span>
        <h2>BOUNDED ENGINEERING STAGE.</h2>
        <p className="section-intro">
          Original static illustration. An interactive Spline scene will be
          added only after a licensed model is available.
        </p>
        <SplineStage />
      </section>
    </div>
  )
}
