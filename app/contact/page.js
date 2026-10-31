import Reveal from '@/components/Reveal'
import ContactForm from '@/components/ContactForm'
import { EMAIL, GITHUB, INSTAGRAM, ADDRESS, WHATSAPP_URL } from '@/data/site'
import { coreExec } from '@/data/team'

export const metadata = {
  title: 'Contact the Council',
  description:
    'Contact the Department Secretariat of Electronics & Computer Science, VESIT.',
}

export default function ContactPage() {
  return (
    <Reveal>
      <div className="flex flex-col w-full">
        {/* Top Archival Meta Ribbon */}
        <section className="w-full bg-tan border-b-2 border-ink py-2 px-4 lg:px-margin">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="inline-block w-2.5 h-2.5 bg-brick"></span>
              <span className="font-complexity-notation text-complexity-notation uppercase tracking-widest text-ink font-bold">
                DISPATCH REGISTRY // DOC ID: FLUX-SEC-2026-C
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-complexity-notation text-[11px] uppercase tracking-wider text-muted font-bold">
                TELEGRAPH STATUS: ACTIVE
              </span>
              <span className="font-complexity-notation text-[11px] font-bold px-2 py-0.5 bg-paper text-brick border border-ink">
                O(1) TRANSMISSION
              </span>
            </div>
          </div>
        </section>

        {/* Editorial Poster Header Section */}
        <section className="w-full bg-paper border-b-2 border-ink px-4 lg:px-margin py-space-lg lg:py-space-xl relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-end">
            <div className="lg:col-span-8 flex flex-col space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-complexity-notation text-xs uppercase px-2 py-1 bg-tan border border-ink text-brick font-bold tracking-widest">
                  ARCHIVAL DISPATCH &numero; 084
                </span>
                <span className="font-complexity-notation text-xs text-muted uppercase tracking-wider font-bold">
                  VESIT ECS SECRETARIAT
                </span>
              </div>
              <p className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-brick font-bold">
                INQUIRY DISPATCH &amp; SECRETARIAT // VESIT ECS GUILD
              </p>
              <h1 className="font-display-hero text-display-hero text-ink leading-[0.95] tracking-tight font-bold">
                Contact the{' '}
                <span className="italic underline decoration-brick decoration-4 underline-offset-8">
                  Council
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-muted max-w-2xl pt-2">
                Questions regarding competitive events, laboratory access, workshop seats, or project collaborations? Transmit a dispatch directly to our stewards or inspect canonical departmental coordinates below.
              </p>
            </div>

            {/* Quick Index Stamp Card */}
            <div className="lg:col-span-4 bg-card border-2 border-ink p-space-md shadow-[6px_6px_0px_var(--brick)] rounded-none relative">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-ink/20 pb-2">
                  <span className="font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold">
                    Department
                  </span>
                  <span className="font-complexity-notation text-xs font-bold text-brick">
                    ECS &bull; VESIT
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-ink/20 pb-2">
                  <span className="font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold">
                    Operating Floor
                  </span>
                  <span className="font-complexity-notation text-xs font-bold text-ink">
                    2ND FLOOR, VESIT
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold">
                    Assembly Labs
                  </span>
                  <span className="font-complexity-notation text-xs font-bold text-muted">
                    LABS 201, 203, 215
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Body: Two-Column Broadsheet Grid */}
        <section className="w-full px-4 lg:px-margin py-space-xl bg-paper">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* LEFT: Coordinates & Stewards Phone Ledger */}
            <div className="lg:col-span-5 flex flex-col space-y-space-lg">
              <article className="bg-card border-2 border-ink shadow-[6px_6px_0px_var(--brick)] p-space-md lg:p-space-lg relative flex flex-col justify-between">
                <div className="space-y-space-md pt-2">
                  <div className="border-b-2 border-ink pb-space-sm">
                    <span className="font-complexity-notation text-[11px] text-muted uppercase tracking-widest block font-bold">
                      DEPT. OF ELECTRONICS &amp; COMPUTER SCIENCE
                    </span>
                    <h2 className="font-headline-sm text-headline-sm uppercase text-ink mt-1 font-bold">
                      Secretariat Coordinates
                    </h2>
                  </div>

                  {/* Fast Link CTAs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      className="flex items-center justify-between p-3 bg-paper border-2 border-ink shadow-[3px_3px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_var(--ink)] transition-all group"
                      href={`mailto:${EMAIL}`}
                    >
                      <div className="flex flex-col">
                        <span className="font-label-smallcaps text-[11px] uppercase tracking-wider text-muted font-bold">
                          Council Email
                        </span>
                        <span className="font-complexity-notation text-xs font-bold text-brick truncate">
                          {EMAIL}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-[18px] text-brick group-hover:translate-x-0.5 transition-transform">
                        mail
                      </span>
                    </a>
                    <a
                      className="flex items-center justify-between p-3 bg-paper border-2 border-ink shadow-[3px_3px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_var(--ink)] transition-all group"
                      href={GITHUB}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <div className="flex flex-col">
                        <span className="font-label-smallcaps text-[11px] uppercase tracking-wider text-muted font-bold">
                          Code Base
                        </span>
                        <span className="font-complexity-notation text-xs font-bold text-ink truncate">
                          Flux-ECS-Club
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-[18px] text-ink group-hover:translate-x-0.5 transition-transform">
                        terminal
                      </span>
                    </a>
                  </div>

                  {/* Instagram Handle Ledger */}
                  <div className="bg-tan border border-ink p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-complexity-notation text-brick font-bold text-sm">✦</span>
                      <span className="font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold">
                        Exhibitions &amp; Dispatch:
                      </span>
                    </div>
                    <a
                      className="font-complexity-notation text-xs font-bold text-brick hover:underline"
                      href={INSTAGRAM}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      @flux.ecs.vesit
                    </a>
                  </div>

                  {/* Physical Geographic Block */}
                  <div className="space-y-2 border-t border-ink/20 pt-space-sm">
                    <span className="font-label-smallcaps text-xs uppercase tracking-widest text-muted flex items-center gap-1.5 font-bold">
                      <span className="material-symbols-outlined text-[16px] text-brick">
                        location_on
                      </span>
                      Physical Campus Secretariat
                    </span>
                    <p className="font-body-md text-body-md text-ink leading-snug">
                      {ADDRESS}
                    </p>
                  </div>

                  {/* Council Stewards Phone Registry with real numbers */}
                  <div className="space-y-2 border-t-2 border-ink pt-space-sm">
                    <div className="flex items-center justify-between pb-1">
                      <h3 className="font-label-smallcaps text-xs uppercase tracking-widest text-ink font-bold">
                        Stewards Telephone Ledger
                      </h3>
                      <span className="font-complexity-notation text-[10px] text-muted uppercase font-bold">
                        [Voice &amp; WhatsApp]
                      </span>
                    </div>
                    <div className="divide-y divide-ink/20 bg-paper border border-ink">
                      {coreExec.map((c) => (
                        <div key={c.name} className="p-2.5 flex items-center justify-between">
                          <div>
                            <p className="font-title-editorial text-sm font-bold text-ink">
                              {c.name}
                            </p>
                            <span className="font-complexity-notation text-[10px] uppercase text-brick font-bold">
                              {c.role}
                            </span>
                          </div>
                          <a
                            className="font-complexity-notation text-xs text-ink hover:text-brick hover:underline font-bold"
                            href={`tel:${c.phone.replace(/\s+/g, '')}`}
                          >
                            {c.phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-space-md pt-2 border-t border-ink/30 flex justify-between items-center text-[10px] font-complexity-notation text-muted uppercase">
                  <span>VESIT ECS CHARTER // SEC-2026</span>
                  <span>VERIFIED RECORD</span>
                </div>
              </article>
            </div>

            {/* RIGHT: Editorial Transmission Form */}
            <div className="lg:col-span-7 flex flex-col space-y-space-lg">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* WhatsApp Community Quick Access Banner */}
        <section className="w-full px-4 lg:px-margin py-space-lg bg-paper">
          <div className="max-w-7xl mx-auto">
            <div className="bg-brick text-paper border-2 border-ink shadow-[6px_6px_0px_var(--ink)] p-space-md lg:p-space-lg relative overflow-hidden">
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-paper text-ink font-complexity-notation text-[11px] font-bold uppercase tracking-wider">
                      RAPID RESPONSE NODE
                    </span>
                    <span className="font-complexity-notation text-xs tracking-wider uppercase text-paper/80 font-bold">
                      REAL-TIME CONTEST WIRE
                    </span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-paper tracking-tight font-bold">
                    Algorithm’s Auction Official Dispatch Group
                  </h3>
                  <p className="font-body-md text-body-md text-paper/90 max-w-2xl leading-relaxed">
                    Need instant problem statement clarifications, teammate pairings, or round-timing broadcasts? Join the verified tournament broadcast channel managed in real time by the council.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <a
                    className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-paper text-ink border-2 border-ink font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[4px_4px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all font-bold group"
                    href={WHATSAPP_URL}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>Join WhatsApp Group</span>
                    <span className="material-symbols-outlined text-[20px] text-brick group-hover:rotate-45 transition-transform">
                      arrow_outward
                    </span>
                  </a>
                </div>
              </div>
              <div className="relative z-10 mt-space-md pt-space-xs border-t border-paper/30 flex flex-wrap items-center justify-between text-[11px] font-complexity-notation text-paper/80">
                <span>CANONICAL LINK: {WHATSAPP_URL}</span>
                <span className="uppercase font-bold">MODERATED BY FLUX-ECS STEWARDS</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Reveal>
  )
}
