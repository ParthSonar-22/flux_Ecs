import Image from 'next/image'
import Link from 'next/link'

export default function IotaGlimpse() {
  const labCards = [
    {
      lab: 'Lab 201 (Embedded Systems)',
      tag: 'Hardware & Robotics',
      image: '/photos/iota-robotics-chassis-presentation.jpg',
      alt: 'Live robotics demonstration at IoTA Archives, VESIT',
      note: 'Chassis demonstration',
    },
    {
      lab: 'Lab 203 (Electrical Lab)',
      tag: 'Circuits & Software',
      image: '/photos/iota-robot-floor-test.jpg',
      alt: 'Senior-fresher technical discussion at IoTA Archives, VESIT',
      note: 'Bench mentoring & Q&A',
    },
    {
      lab: "Lab 215 (Tinkerers' Lab)",
      tag: 'Hardware Showcase',
      image: '/photos/iota-electrical-lab-discussion.png',
      alt: "Ultrasonic chassis demo at IoTA Archives, VESIT",
      note: 'Hardware & mentoring track',
    },
  ]

  return (
    <section className="w-full bg-paper border-b-2 border-ink py-space-xl px-4 lg:px-margin">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-md pb-3 gap-3 border-b border-ink/30">
          <div>
            <span className="handwritten-eyebrow text-2xl sm:text-3xl font-bold text-brick mb-1">
              Induction Retrospective
            </span>
            <h2 className="font-headline-md text-headline-md text-ink font-bold">
              IoTA Archives — 7th September 2026
            </h2>
            <p className="font-body-sm text-body-sm text-muted mt-1">Labs 201, 203 and Tinkerers&apos; Lab, VESIT</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-body-sm text-sm text-brick hover:underline font-bold"
          >
            <span>Read the full write-up</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <p className="font-body-lg text-body-lg text-muted max-w-3xl mb-space-md leading-relaxed">
          IoTA Archives was an exhibition where senior ECS students showed their projects to the newly admitted first-year batch. Three labs ran simultaneously — hardware, software, and a space for senior talks.
        </p>

        {/* Photo grid — clean photo cards with student handwritten notes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {labCards.map((card) => (
            <div key={card.lab} className="bg-card border border-ink/30 p-3 shadow-sm hover:-translate-y-0.5 transition-transform">
              <div className="relative w-full aspect-[16/10] overflow-hidden border border-ink/20 bg-tan">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover object-center"
                />
              </div>
              <div className="pt-3 px-1 flex items-baseline justify-between">
                <div>
                  <span className="font-complexity-notation text-sm font-bold text-ink block">
                    {card.lab}
                  </span>
                  <span className="font-body-sm text-[13px] text-muted block">
                    {card.tag}
                  </span>
                </div>
                <span className="font-handwritten text-sm text-brick font-medium">
                  {card.note}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
