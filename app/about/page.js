import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { faculty, coreExec, juniorOfficers } from '@/data/team'
import { ADDRESS, EMAIL, GITHUB } from '@/data/site'

export const metadata = {
  title: 'About the Council',
  description:
    'The official departmental technical collective of Electronics & Computer Science at VESIT, Mumbai.',
}

export default function AboutPage() {
  return (
    <Reveal>
      <div className="flex flex-col w-full">
        {/* Top Archival Strip */}
        <div className="w-full bg-ink text-paper px-4 lg:px-margin py-2 border-b-2 border-ink flex flex-wrap items-center justify-between gap-3 font-complexity-notation text-[11px] tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-brick"></span>
            <span>GAZETTE SPECIAL REGISTER // FOLIO EDITION NO. XXIV</span>
          </div>
          <div className="flex items-center gap-4">
            <span>REF: VESIT-ECS-ARCHIVE</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">CYCLE 2026</span>
            <span className="bg-brick text-paper px-2 py-0.5 font-bold">STATUS: DEPLOYED</span>
          </div>
        </div>

        {/* Editorial Masthead / Header Section */}
        <section className="w-full px-4 lg:px-margin py-space-lg lg:py-space-xl bg-paper border-b-2 border-ink">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            {/* Left Column: Title & Overline */}
            <div className="lg:col-span-8 flex flex-col space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-tan border-2 border-ink text-ink font-complexity-notation text-xs tracking-wider uppercase shadow-[2px_2px_0px_var(--ink)] w-fit font-bold">
                <span className="text-brick">&sect;</span>
                <span>CHARTER &amp; ARCHIVAL MANDATE // DEPT. OF ELECTRONICS &amp; COMPUTER SCIENCE &bull; VESIT</span>
              </div>
              <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-ink leading-none tracking-tight font-bold">
                Where Ideas Flow <br className="hidden sm:block" />
                <span className="italic font-title-editorial text-brick underline decoration-ink decoration-2 underline-offset-8">
                  into Innovation.
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-ink max-w-3xl leading-relaxed pt-2">
                We are the official departmental technical collective of Electronics &amp; Computer Science at Vivekanand Education Society&apos;s Institute of Technology (VESIT), Chembur. Founded to bridge theoretical curricula with hands-on silicon crafting, embedded systems, algorithmic problem solving, and software development. We organize practical workshops, competitive auctions, hardware exhibitions, and senior-fresher mentorships.
              </p>
            </div>

            {/* Right Column: Department Docket */}
            <div className="lg:col-span-4 flex flex-col space-y-3 bg-card p-5 border-2 border-ink shadow-[6px_6px_0px_var(--brick)]">
              <div className="flex items-center justify-between border-b-2 border-ink pb-2">
                <span className="font-label-smallcaps text-label-smallcaps uppercase tracking-wider text-ink font-bold">
                  Department Docket
                </span>
                <span className="font-complexity-notation text-xs bg-ink text-paper px-1.5 py-0.5 font-bold">
                  ECS-CHARTER
                </span>
              </div>
              <div className="font-body-sm text-body-sm text-ink space-y-2 leading-snug">
                <p className="flex items-start gap-2">
                  <span className="font-complexity-notation text-brick font-bold">01.</span>
                  <span><strong>Jurisdiction:</strong> Department of Electronics &amp; Computer Science, VESIT.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-complexity-notation text-brick font-bold">02.</span>
                  <span><strong>Core Focus:</strong> Hardware prototyping, embedded systems, algorithms, and practical software projects.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-complexity-notation text-brick font-bold">03.</span>
                  <span><strong>Council:</strong> Student-administered under faculty stewardship.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Three Foundational Pillars */}
        <section className="w-full bg-card border-b-2 border-ink">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink">
            {/* Pillar 1 */}
            <div className="p-6 lg:p-8 flex flex-col justify-between space-y-4 hover:bg-paper transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-complexity-notation text-brick font-bold text-sm tracking-widest">
                    [ PILLAR // 01 ]
                  </span>
                  <span className="material-symbols-outlined text-ink">memory</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-ink leading-snug font-bold">
                  Hardware and software, side by side.
                </h2>
                <p className="font-body-md text-body-md text-muted">
                  Our events bridge physical embedded hardware with algorithmic software — from lab testing benches to full-stack applications.
                </p>
              </div>
              <div className="pt-3 border-t border-ink/20 flex items-center gap-2 font-complexity-notation text-xs text-ink font-bold">
                <span className="w-2 h-2 bg-brick"></span>
                <span>SILICON + RUNTIMES</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 lg:p-8 flex flex-col justify-between space-y-4 hover:bg-paper transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-complexity-notation text-brick font-bold text-sm tracking-widest">
                    [ PILLAR // 02 ]
                  </span>
                  <span className="material-symbols-outlined text-ink">terminal</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-ink leading-snug font-bold">
                  Built by students.
                </h2>
                <p className="font-body-md text-body-md text-muted">
                  FLUX-ECS is run by students of the ECS department at VESIT, organizing competitive events, practical workshops, and exhibitions.
                </p>
              </div>
              <div className="pt-3 border-t border-ink/20 flex items-center gap-2 font-complexity-notation text-xs text-ink font-bold">
                <span className="w-2 h-2 bg-brick"></span>
                <span>STUDENT RUN</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 lg:p-8 flex flex-col justify-between space-y-4 hover:bg-paper transition-colors">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-complexity-notation text-brick font-bold text-sm tracking-widest">
                    [ PILLAR // 03 ]
                  </span>
                  <span className="material-symbols-outlined text-ink">diversity_3</span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-ink leading-snug font-bold">
                  Open to every year.
                </h2>
                <p className="font-body-md text-body-md text-muted">
                  Beginners and seniors gather in the same labs. Novices learn alongside senior project builders without hesitation.
                </p>
              </div>
              <div className="pt-3 border-t border-ink/20 flex items-center gap-2 font-complexity-notation text-xs text-ink font-bold">
                <span className="w-2 h-2 bg-brick"></span>
                <span>ALL YEARS WELCOME</span>
              </div>
            </div>
          </div>
        </section>

        {/* Council In-Charge & Core Secretariat Section */}
        <section className="w-full px-4 lg:px-margin py-space-xl bg-paper border-b-2 border-ink">
          <div className="flex flex-col space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-ink pb-4">
              <div>
                <span className="font-complexity-notation text-xs text-brick uppercase tracking-widest font-bold">
                  SECTION 02 // FACULTY &amp; CORE LEADERSHIP
                </span>
                <h2 className="font-headline-lg text-headline-lg text-ink leading-tight font-bold">
                  Secretariat &amp; Council In-Charge
                </h2>
              </div>
              <div className="font-body-sm text-body-sm text-muted max-w-sm">
                Stewards of departmental charter and student coordination at VESIT ECS.
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
              {/* Faculty Card (Factual, no fabricated quotes) */}
              <div className="lg:col-span-5 bg-card border-2 border-ink p-6 lg:p-8 shadow-[6px_6px_0px_var(--brick)] flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-ink pb-3">
                    <span className="font-complexity-notation text-xs uppercase text-brick font-bold tracking-widest">
                      FACULTY STEWARDSHIP
                    </span>
                    <span className="font-complexity-notation text-xs bg-ink text-paper px-2 py-0.5 font-bold">
                      COUNCIL IN-CHARGE
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-headline-md text-headline-md text-ink leading-snug font-bold">
                      {faculty.name}
                    </h3>
                    <p className="font-label-smallcaps text-label-smallcaps uppercase tracking-wider text-brick font-bold">
                      {faculty.title}
                    </p>
                    <p className="font-complexity-notation text-xs text-muted">
                      {faculty.dept}
                    </p>
                  </div>
                </div>
                <div className="mt-8 pt-4 border-t-2 border-ink flex items-center justify-between font-complexity-notation text-xs text-muted">
                  <span>DEPT. OF ELECTRONICS &amp; COMPUTER SCIENCE</span>
                  <span className="font-bold text-ink">VESIT</span>
                </div>
              </div>

              {/* Core Leadership Officers Grid (Role titles only, real phone numbers) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div className="bg-tan border-2 border-ink p-4 font-complexity-notation text-xs text-ink flex items-center justify-between">
                  <span className="font-bold tracking-wider uppercase">CORE EXECUTIVE BENCH</span>
                  <span className="font-bold">5 APPOINTMENTS</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {coreExec.map((exec) => (
                    <div
                      key={exec.name}
                      className={`bg-card border-2 border-ink p-4 shadow-[4px_4px_0px_var(--ink)] flex flex-col justify-between space-y-2 ${
                        exec.office === '05' ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-ink pb-1.5 mb-2">
                          <span className="font-complexity-notation text-[11px] text-brick font-bold">
                            OFFICE {exec.office}
                          </span>
                          <span className="font-complexity-notation text-[11px] bg-ink text-paper px-1.5 font-bold">
                            {exec.badge}
                          </span>
                        </div>
                        <h4 className="font-headline-sm text-headline-sm text-ink leading-none font-bold">
                          {exec.name}
                        </h4>
                        <p className="font-label-smallcaps text-label-smallcaps uppercase tracking-wider text-brick font-bold mt-1">
                          {exec.role}
                        </p>
                      </div>
                      {exec.phone && (
                        <div className="pt-1 flex items-center gap-1 font-complexity-notation text-xs text-ink font-bold">
                          <span className="material-symbols-outlined text-[14px]">call</span>
                          <a href={`tel:${exec.phone.replace(/\s+/g, '')}`} className="hover:underline">
                            {exec.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Junior Officers Gallery Section (Lithographic Cards) */}
        <section className="w-full px-4 lg:px-margin py-space-xl bg-card border-b-2 border-ink">
          <div className="flex flex-col space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-ink pb-4">
              <div>
                <div className="inline-flex items-center gap-2 font-complexity-notation text-xs text-brick font-bold tracking-widest uppercase">
                  <span>OFFICIAL REGISTER // FOLIO 03</span>
                  <span>&bull;</span>
                  <span>RATIFIED PERSONNEL</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-ink leading-tight font-bold">
                  Council Members &amp; Junior Officers
                </h2>
              </div>
              <div className="font-body-sm text-body-sm text-muted max-w-sm">
                Archival dossier featuring attested portraits, designated callsigns, unit badges, and personal mandates.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {juniorOfficers.map((officer) => (
                <article
                  key={officer.name}
                  className="bg-card rounded-[14px] border-2 border-ink shadow-[6px_6px_0px_var(--brick)] overflow-hidden flex flex-col justify-between group transition-transform hover:-translate-y-1"
                >
                  <div className="p-3 bg-paper border-b-2 border-ink flex items-center justify-between">
                    <span className="font-complexity-notation text-xs font-bold text-ink">
                      ARCHIVE // {officer.archive}
                    </span>
                    <span className="inline-block px-2 py-0.5 bg-brick text-paper font-complexity-notation text-[11px] font-bold">
                      {officer.badge}
                    </span>
                  </div>

                  <div className="p-3 bg-card">
                    <div className="relative w-full aspect-[4/5] border-2 border-ink overflow-hidden bg-tan flex items-center justify-center">
                      <Image
                        src={officer.photo}
                        alt={officer.name}
                        fill
                        className="object-cover object-top"
                      />
                      {/* Clean Initials Avatar Fallback */}
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <span className="font-headline-lg text-3xl font-bold text-ink">
                          {officer.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                        <span className="font-complexity-notation text-[10px] text-muted mt-1 uppercase font-bold">
                          {officer.role}
                        </span>
                      </div>
                      <div className="absolute bottom-0 inset-x-0 bg-ink/85 text-paper px-2 py-1 flex items-center justify-between font-complexity-notation text-[10px]">
                        <span>ID: {officer.id}</span>
                        <span>STATUS: ACTIVE</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-ink leading-none font-bold">
                        {officer.name}
                      </h3>
                      <p className="font-label-smallcaps text-label-smallcaps uppercase tracking-wider text-brick font-bold mt-1">
                        {officer.role}
                      </p>
                    </div>
                    <div className="p-2.5 bg-paper border border-ink border-dashed">
                      <span className="font-complexity-notation text-[10px] text-muted block uppercase tracking-wider mb-0.5 font-bold">
                        Callsign Mandate:
                      </span>
                      <p className="font-title-editorial italic text-body-md text-ink">
                        &ldquo;{officer.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Department Coordinates & Cartographic Registry Section (With real Google Maps iframe) */}
        <section className="w-full px-4 lg:px-margin py-space-xl bg-paper">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
            {/* Geographic & Institutional Coordinates Card */}
            <div className="lg:col-span-6 bg-card border-2 border-ink p-6 lg:p-8 shadow-[6px_6px_0px_var(--brick)] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-ink pb-2">
                  <span className="font-label-smallcaps text-label-smallcaps uppercase tracking-wider text-ink font-bold">
                    Geographic Coordinates
                  </span>
                  <span className="font-complexity-notation text-xs bg-brick text-paper px-1.5 py-0.5 font-bold">
                    SECTOR VESIT
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-ink leading-snug font-bold">
                  Department Secretariat
                </h3>
                <div className="space-y-3 font-body-md text-body-md text-ink">
                  <p className="leading-relaxed">
                    <strong>VESIT Campus:</strong> {ADDRESS}
                  </p>
                  <p className="leading-relaxed text-muted">
                    Department laboratories, embedded systems workbenches, and technical review councils operate in the Department of Electronics &amp; Computer Science.
                  </p>
                </div>
                <div className="pt-4 border-t-2 border-ink space-y-3 font-complexity-notation text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted uppercase font-bold">Official Inquiry Dispatch:</span>
                    <a className="text-brick font-bold hover:underline" href={`mailto:${EMAIL}`}>
                      {EMAIL}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted uppercase font-bold">Public Git Registry:</span>
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
                    <span className="text-muted uppercase font-bold">Academic Charter:</span>
                    <span className="text-ink font-bold">VESIT ECS // 2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Display Frame with real Google Maps iframe */}
            <div className="lg:col-span-6 bg-card border-2 border-ink p-4 shadow-[6px_6px_0px_var(--brick)] flex flex-col justify-between">
              <div className="border-b-2 border-ink pb-2 mb-3 flex items-center justify-between font-complexity-notation text-xs">
                <span className="text-ink font-bold">CARTOGRAPHIC PLOT // VESIT CAMPUS</span>
                <span className="bg-ink text-paper px-1.5 py-0.5 font-bold">CHEMBUR 400074</span>
              </div>
              <div className="w-full h-80 min-h-[300px] border-2 border-ink overflow-hidden relative">
                <iframe
                  title="VESIT Chembur Location Map"
                  src="https://www.google.com/maps?q=VESIT+Chembur+Mumbai&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="pt-3 mt-3 border-t border-ink flex flex-wrap items-center justify-between gap-2 font-complexity-notation text-xs text-muted">
                <span>ACCESSIBLE VIA CHEMBUR MONORAIL &amp; HARBOUR LINE</span>
                <a
                  className="text-brick font-bold hover:underline"
                  href={GITHUB}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  EXPLORE OPEN CODEBASE &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Reveal>
  )
}
