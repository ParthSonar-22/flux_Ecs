import Image from 'next/image'
import Link from 'next/link'

export default function IotaGlimpse() {
  const labCards = [
    {
      lab: 'Lab 201',
      tag: 'Hardware & Electronics',
      image: '/photos/lab201/lab201-1.jpg',
      alt: 'Lab 201 hardware exhibition demonstrations at VESIT',
    },
    {
      lab: 'Lab 203',
      tag: 'Software Projects',
      image: '/photos/lab203/lab203-1.jpg',
      alt: 'Lab 203 software project demonstrations at VESIT',
    },
    {
      lab: 'Lab 215',
      tag: 'Interaction & Senior Talks',
      image: '/photos/lab215/lab215-1.jpg',
      alt: 'Lab 215 senior interactive session at VESIT',
    },
  ]

  return (
    <section className="w-full bg-paper border-b-2 border-ink py-space-xl px-4 lg:px-margin">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-md border-b-2 border-ink pb-3 gap-3">
          <div>
            <span className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-brick block mb-1 font-bold">
              Archival Retrospective
            </span>
            <h2 className="font-headline-md text-headline-md text-ink font-bold">
              IoTA Archives: 7th September 2026, Labs 201, 203 and 215
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-complexity-notation text-complexity-notation text-brick hover:underline font-bold"
          >
            <span>Read the full story</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <p className="font-body-lg text-body-lg text-muted max-w-3xl mb-space-md leading-relaxed">
          IoTA Archives was an exhibition organised by the ECS department at VESIT as part of the induction programme for newly admitted FE students. It gave the new batch a chance to see projects made by their seniors.
        </p>

        {/* Thumbnails Grid with Corrected Lab Captions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {labCards.map((card) => (
            <div
              key={card.lab}
              className="border-2 border-ink bg-card p-3 shadow-[4px_4px_0px_var(--ink)]"
            >
              <div className="h-56 border-2 border-ink overflow-hidden mb-3 relative bg-tan">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-ink text-paper px-2 py-0.5 font-complexity-notation text-[10px] uppercase font-bold">
                  {card.lab}
                </div>
              </div>
              <span className="font-complexity-notation text-sm font-bold text-ink block">
                {card.lab}
              </span>
              <span className="font-body-sm text-[13px] text-muted block mt-0.5">
                {card.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
