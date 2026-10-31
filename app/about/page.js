import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { faculty, seniorCouncil, juniorCouncil } from '@/data/team'
import { ADDRESS, EMAIL, GITHUB, INSTAGRAM } from '@/data/site'

export const metadata = {
  title: 'Who we are',
  description:
    'The technical club of the Department of Electronics & Computer Science at VESIT, Mumbai.',
}

export default function AboutPage() {
  return (
    <Reveal>
      <div className="flex flex-col w-full">
        {/* Page header */}
        <section className="w-full px-4 lg:px-margin py-space-lg lg:py-space-xl bg-paper border-b-2 border-ink">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            {/* Left: Title */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-ink leading-none tracking-tight font-bold">
                Who we are
              </h1>
              <p className="font-body-lg text-body-lg text-ink max-w-3xl leading-relaxed">
                FLUX-ECS is the technical club of the Department of Electronics &amp; Computer Science at VESIT, Chembur. We run competitions, hardware exhibitions, and senior–fresher sessions throughout the academic year.
              </p>
            </div>

            {/* Right: Quick facts — simple border, no heavy fake labels */}
            <div className="lg:col-span-4 flex flex-col space-y-3 bg-card p-5 border border-ink/30">
              <div className="font-body-sm text-body-sm text-ink space-y-2 leading-snug">
                <p className="flex items-start gap-2">
                  <span className="font-complexity-notation text-brick font-bold">01.</span>
                  <span><strong>Department:</strong> Electronics &amp; Computer Science, VESIT.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-complexity-notation text-brick font-bold">02.</span>
                  <span><strong>What we do:</strong> Hardware prototyping, algorithms, software projects, and workshops.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-complexity-notation text-brick font-bold">03.</span>
                  <span><strong>Eligibility:</strong> Events are open to all ECS students across all years. Council membership is open to 2nd year and above.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Three pillars — clean hairline dividers */}
        <section className="w-full bg-card border-b-2 border-ink">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink">
            {[
              {
                icon: 'memory',
                title: 'Hardware and software, side by side.',
                body: 'Our events bridge physical embedded hardware with algorithmic software — from lab testing benches to full-stack applications.',
              },
              {
                icon: 'terminal',
                title: 'Built by students.',
                body: 'FLUX-ECS is run by students of the ECS department at VESIT, organizing competitive events, practical workshops, and exhibitions.',
              },
              {
                icon: 'diversity_3',
                title: 'Open to every year.',
                body: 'Events and workshops are open to all ECS batches (FE to BE). Council membership is open from second year onwards.',
              },
            ].map((pillar) => (
              <div key={pillar.title} className="p-6 lg:p-8 flex flex-col space-y-3 hover:bg-paper transition-colors">
                <span className="material-symbols-outlined text-ink">{pillar.icon}</span>
                <h2 className="font-headline-sm text-headline-sm text-ink leading-snug font-bold">
                  {pillar.title}
                </h2>
                <p className="font-body-md text-body-md text-muted">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 1. Faculty in-charge (Yogesh Pandit Sir and Abhishek Chaudhari Sir at the top) */}
        <section className="w-full px-4 lg:px-margin py-space-xl bg-paper border-b-2 border-ink">
          <div className="max-w-7xl mx-auto flex flex-col space-y-8">
            <div className="border-b border-ink/30 pb-4">
              <span className="handwritten-eyebrow text-2xl sm:text-3xl font-bold text-brick mb-1">
                Mentorship &amp; Guidance
              </span>
              <h2 className="font-headline-lg text-headline-lg text-ink leading-tight font-bold">
                Faculty in-charge
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {faculty.map((f) => (
                <div
                  key={f.name}
                  className="bg-card border-2 border-ink p-6 flex flex-col justify-between space-y-3 shadow-[4px_4px_0px_var(--tan)]"
                >
                  <div>
                    <h3 className="font-headline-md text-headline-md text-ink leading-snug font-bold">
                      {f.name}
                    </h3>
                    <p className="font-label-smallcaps text-label-smallcaps uppercase tracking-wider text-brick font-bold mt-1">
                      {f.title}
                    </p>
                    <p className="font-body-sm text-body-sm text-muted mt-2">
                      {f.dept}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Senior Council (Core Leadership & Senior Officers) */}
        <section className="w-full px-4 lg:px-margin py-space-xl bg-card border-b-2 border-ink">
          <div className="max-w-7xl mx-auto flex flex-col space-y-8">
            <div className="border-b border-ink/30 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="handwritten-eyebrow text-2xl sm:text-3xl font-bold text-brick mb-1">
                  Core Leadership
                </span>
                <h2 className="font-headline-lg text-headline-lg text-ink leading-tight font-bold">
                  Senior Council
                </h2>
                <p className="font-body-sm text-body-sm text-muted mt-1">
                  Third and Final Year student leads steering FLUX-ECS
                </p>
              </div>
              <span className="font-complexity-notation text-xs text-muted uppercase">2026–2027</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {seniorCouncil.map((member) => (
                <article
                  key={member.id}
                  className="bg-paper border-2 border-ink shadow-[4px_4px_0px_var(--tan)] overflow-hidden flex flex-col justify-between group transition-transform hover:-translate-y-1"
                >
                  <div className="relative w-full aspect-[4/5] bg-tan flex items-center justify-center overflow-hidden border-b-2 border-ink">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-ink leading-none font-bold">
                        {member.name}
                      </h3>
                      <p className="font-label-smallcaps text-label-smallcaps uppercase tracking-wider text-brick font-bold mt-1">
                        {member.role}
                      </p>
                    </div>
                    {member.quote && (
                      <p className="font-title-editorial italic text-sm text-muted">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    )}
                    {member.phone && (
                      <div className="pt-2 border-t border-ink/20 flex items-center gap-1.5 font-complexity-notation text-xs text-ink font-bold">
                        <span className="material-symbols-outlined text-[15px] text-brick">call</span>
                        <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="hover:underline">
                          {member.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Junior Council (Second Year Officers) */}
        <section className="w-full px-4 lg:px-margin py-space-xl bg-paper border-b-2 border-ink">
          <div className="max-w-7xl mx-auto flex flex-col space-y-8">
            <div className="border-b border-ink/30 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="handwritten-eyebrow text-2xl sm:text-3xl font-bold text-brick mb-1">
                  Rising Talent
                </span>
                <h2 className="font-headline-lg text-headline-lg text-ink leading-tight font-bold">
                  Junior Council
                </h2>
                <p className="font-body-sm text-body-sm text-muted mt-1">
                  Second Year student officers powering operations, technical workshops, and media
                </p>
              </div>
              <span className="font-complexity-notation text-xs text-muted uppercase">2026–2027</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {juniorCouncil.map((officer) => (
                <article
                  key={officer.id}
                  className="bg-card border-2 border-ink shadow-[4px_4px_0px_var(--tan)] overflow-hidden flex flex-col justify-between group transition-transform hover:-translate-y-1"
                >
                  <div className="relative w-full aspect-[4/5] bg-tan flex items-center justify-center overflow-hidden border-b-2 border-ink">
                    <Image
                      src={officer.photo}
                      alt={officer.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 240px"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between space-y-2">
                    <div>
                      <h3 className="font-headline-sm text-base text-ink leading-tight font-bold">
                        {officer.name}
                      </h3>
                      <p className="font-label-smallcaps text-xs uppercase tracking-wider text-brick font-bold mt-1">
                        {officer.role}
                      </p>
                    </div>
                    {officer.quote && (
                      <p className="font-title-editorial italic text-xs text-muted">
                        &ldquo;{officer.quote}&rdquo;
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Where we are */}
        <section className="w-full px-4 lg:px-margin py-space-xl bg-card">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
            {/* Address card */}
            <div className="lg:col-span-6 bg-paper border border-ink/30 p-6 lg:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="handwritten-eyebrow text-2xl sm:text-3xl font-bold text-brick mb-1">
                  Campus Location
                </span>
                <h3 className="font-headline-md text-headline-md text-ink leading-snug font-bold">
                  Find us at VESIT
                </h3>
                <p className="font-body-md text-body-md text-ink leading-relaxed">
                  {ADDRESS}
                </p>
                <div className="pt-4 border-t border-ink/20 space-y-3 font-complexity-notation text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted uppercase font-bold">Email:</span>
                    <a className="text-brick font-bold hover:underline" href={`mailto:${EMAIL}`}>
                      {EMAIL}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted uppercase font-bold">GitHub:</span>
                    <a
                      className="text-brick font-bold hover:underline flex items-center gap-1"
                      href={GITHUB}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>github.com/Flux-ECS-Club</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted uppercase font-bold">Instagram:</span>
                    <a
                      className="text-brick font-bold hover:underline flex items-center gap-1"
                      href={INSTAGRAM}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>@flux.ecs</span>
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-6 bg-paper border border-ink/30 p-4 flex flex-col justify-between">
              <div className="w-full h-80 min-h-[300px] border border-ink/30 overflow-hidden relative">
                <iframe
                  title="VESIT Chembur Location"
                  src="https://www.google.com/maps?q=VESIT+Chembur+Mumbai&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="pt-2 font-complexity-notation text-xs text-muted">
                Accessible via Chembur Monorail &amp; Harbour Line
              </p>
            </div>
          </div>
        </section>
      </div>
    </Reveal>
  )
}
