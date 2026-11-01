import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { faculty, seniorCouncil, juniorCouncil } from '@/data/team'
import { ADDRESS, EMAIL, GITHUB, INSTAGRAM } from '@/data/site'

export const metadata = {
  title: 'About the Council | FluxECS VESIT',
  description:
    'The official student branch council for Electronics & Computer Science at VESIT, Mumbai. Uniting hardware prototyping, competitive algorithms, and engineering mentorship.',
}

export default function AboutPage() {
  return (
    <Reveal>
      <div className="flex flex-col w-full bg-[#0D1014] text-[#EFF0F2] min-h-screen">
        {/* ==============================================================
            1. EDITORIAL HEADER & COUNCIL IDENTITY
           ============================================================== */}
        <header className="w-full px-6 lg:px-12 pt-32 pb-16 border-b border-white/10 bg-gradient-to-b from-[#12161C] to-[#0D1014]">
          <div className="max-w-7xl mx-auto flex flex-col space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B2026] border border-white/15 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#D94A5B]" />
              <span className="font-mono text-xs text-[#9EA6AF] uppercase tracking-wider">
                Department of Electronics &amp; Computer Science · VESIT
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05]">
              FROM CIRCUITS <br />
              <span className="text-[#9EA6AF] font-normal">TO CODE.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#9EA6AF] max-w-3xl leading-relaxed font-body">
              FLUX-ECS is the premier technical student council representing the Department of Electronics &amp; Computer Science at Vivekanand Education Society&apos;s Institute of Technology (VESIT), Chembur. We bridge the critical intersection between physical silicon and algorithmic software through competitive problem-solving, hands-on lab prototyping, and peer engineering mentorship.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D94A5B] hover:bg-[#e45a6b] text-white text-xs font-mono font-semibold uppercase tracking-wider rounded transition-all shadow-[0_4px_16px_rgba(217,74,91,0.3)]"
              >
                <span>View Event Docket</span>
                <span>→</span>
              </Link>
              <a
                href="#council"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B2026] hover:bg-[#252C35] border border-white/15 text-white text-xs font-mono font-semibold uppercase tracking-wider rounded transition-all"
              >
                <span>Meet the Team</span>
                <span>↓</span>
              </a>
            </div>
          </div>
        </header>

        {/* ==============================================================
            2. THREE CORE PILLARS (ENGINEERING DOMAINS)
           ============================================================== */}
        <section className="w-full bg-[#12161C] border-b border-white/10 py-16 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D94A5B] font-bold block mb-1">
                Technical Focus
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                Core Domains
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-7 bg-[#171C23] border border-white/10 rounded-xl flex flex-col justify-between space-y-4 hover:border-[#D94A5B]/60 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-[#D94A5B]/15 border border-[#D94A5B]/30 flex items-center justify-center text-[#D94A5B] font-mono text-sm font-bold">
                  01
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 font-display uppercase tracking-tight group-hover:text-[#D94A5B] transition-colors">
                    Hardware &amp; Embedded Systems
                  </h3>
                  <p className="text-sm text-[#9EA6AF] leading-relaxed">
                    Physical computing, microcontrollers (ESP32, STM32, Arduino), sensor instrumentation, and PCB design inside the department prototyping benches.
                  </p>
                </div>
              </div>

              <div className="p-7 bg-[#171C23] border border-white/10 rounded-xl flex flex-col justify-between space-y-4 hover:border-[#D94A5B]/60 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-[#D94A5B]/15 border border-[#D94A5B]/30 flex items-center justify-center text-[#D94A5B] font-mono text-sm font-bold">
                  02
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 font-display uppercase tracking-tight group-hover:text-[#D94A5B] transition-colors">
                    Competitive Algorithms &amp; Software
                  </h3>
                  <p className="text-sm text-[#9EA6AF] leading-relaxed">
                    Data structures, algorithmic auction mechanics, full-stack web applications, automation pipelines, and competitive coding sprints designed for modern engineers.
                  </p>
                </div>
              </div>

              <div className="p-7 bg-[#171C23] border border-white/10 rounded-xl flex flex-col justify-between space-y-4 hover:border-[#D94A5B]/60 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-[#D94A5B]/15 border border-[#D94A5B]/30 flex items-center justify-center text-[#D94A5B] font-mono text-sm font-bold">
                  03
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 font-display uppercase tracking-tight group-hover:text-[#D94A5B] transition-colors">
                    Mentorship &amp; Peer Community
                  </h3>
                  <p className="text-sm text-[#9EA6AF] leading-relaxed">
                    Bridging seniors with first and second year cohorts through practical workshops, hackathons, open lab sessions, and direct guidance for technical development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            3. FACULTY MENTORSHIP & GUIDANCE
           ============================================================== */}
        <section className="w-full px-6 lg:px-12 py-16 border-b border-white/10 bg-[#0D1014]">
          <div className="max-w-7xl mx-auto flex flex-col space-y-8">
            <div className="border-b border-white/10 pb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D94A5B] font-bold block mb-1">
                Academic Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                Faculty In-Charge
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {faculty.map((f) => (
                <div
                  key={f.name}
                  className="bg-[#12161C] border border-white/10 p-6 rounded-xl flex flex-col justify-between space-y-4 hover:border-white/20 transition-all shadow-lg"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                      {f.name}
                    </h3>
                    <p className="font-mono text-xs uppercase tracking-wider text-[#D94A5B] font-semibold mt-1">
                      {f.title}
                    </p>
                    <p className="text-sm text-[#9EA6AF] mt-2">
                      {f.dept}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================
            4. SENIOR COUNCIL (CORE LEADERSHIP)
           ============================================================== */}
        <section id="council" className="w-full px-6 lg:px-12 py-16 bg-[#12161C] border-b border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col space-y-8">
            <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#D94A5B] font-bold block mb-1">
                  Executive Steering
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  Senior Council
                </h2>
                <p className="text-xs text-[#9EA6AF] font-mono mt-1">
                  Third and Final Year student officers steering FLUX-ECS
                </p>
              </div>
              <span className="font-mono text-xs text-[#9EA6AF] uppercase">2026 - 2027</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {seniorCouncil.map((member) => (
                <article
                  key={member.id}
                  className="bg-[#171C23] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between group transition-all hover:border-[#D94A5B]/60 hover:-translate-y-1 shadow-md"
                >
                  <div className="relative w-full aspect-[4/5] bg-[#0D1014] overflow-hidden border-b border-white/10">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-white font-display uppercase tracking-tight">
                        {member.name}
                      </h3>
                      <p className="font-mono text-xs uppercase tracking-wider text-[#D94A5B] font-semibold mt-1">
                        {member.role}
                      </p>
                    </div>
                    {member.quote && (
                      <p className="italic text-xs text-[#9EA6AF]">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================
            5. JUNIOR COUNCIL (SECOND YEAR OFFICERS)
           ============================================================== */}
        <section className="w-full px-6 lg:px-12 py-16 bg-[#0D1014] border-b border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col space-y-8">
            <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#D94A5B] font-bold block mb-1">
                  Rising Technical Talent
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  Junior Council
                </h2>
                <p className="text-xs text-[#9EA6AF] font-mono mt-1">
                  Second Year student officers powering workshops, hardware experiments, and community operations
                </p>
              </div>
              <span className="font-mono text-xs text-[#9EA6AF] uppercase">2026 - 2027</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {juniorCouncil.map((officer) => (
                <article
                  key={officer.id}
                  className="bg-[#12161C] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between group transition-all hover:border-[#D94A5B]/60 hover:-translate-y-1 shadow-md"
                >
                  <div className="relative w-full aspect-[4/5] bg-[#0D1014] overflow-hidden border-b border-white/10">
                    <Image
                      src={officer.photo}
                      alt={officer.name}
                      fill
                      className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
                      sizes="(max-width: 768px) 100vw, 240px"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between space-y-2">
                    <div>
                      <h3 className="text-sm font-bold text-white font-display uppercase tracking-tight">
                        {officer.name}
                      </h3>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#D94A5B] font-semibold mt-0.5">
                        {officer.role}
                      </p>
                    </div>
                    {officer.quote && (
                      <p className="italic text-[11px] text-[#9EA6AF]">
                        &ldquo;{officer.quote}&rdquo;
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================
            6. CAMPUS LAB & REACH US
           ============================================================== */}
        <section className="w-full px-6 lg:px-12 py-16 bg-[#12161C]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Address & Direct Channels Card */}
            <div className="lg:col-span-6 bg-[#171C23] border border-white/10 rounded-xl p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D94A5B] font-bold block mb-1">
                  Department Headquarters
                </span>
                <h3 className="text-2xl font-bold text-white font-display uppercase tracking-tight">
                  IoTA Tinkerer&apos;s Lab · VESIT
                </h3>
                <p className="text-sm text-[#9EA6AF] leading-relaxed">
                  {ADDRESS}
                </p>

                <div className="pt-6 border-t border-white/10 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#9EA6AF] uppercase">Official Email:</span>
                    <a className="text-[#D94A5B] font-bold hover:underline" href={`mailto:${EMAIL}`}>
                      {EMAIL}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#9EA6AF] uppercase">GitHub Organization:</span>
                    <a
                      className="text-white hover:text-[#D94A5B] transition-colors flex items-center gap-1"
                      href={GITHUB}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>github.com/Flux-ECS-Club</span>
                      <span className="text-[12px]">↗</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#9EA6AF] uppercase">Instagram:</span>
                    <a
                      className="text-white hover:text-[#D94A5B] transition-colors flex items-center gap-1"
                      href={INSTAGRAM}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span>@flux.ecs</span>
                      <span className="text-[12px]">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Campus Map */}
            <div className="lg:col-span-6 bg-[#171C23] border border-white/10 rounded-xl p-5 flex flex-col justify-between space-y-3">
              <div className="w-full h-80 min-h-[300px] rounded-lg border border-white/10 overflow-hidden relative">
                <iframe
                  title="VESIT Chembur Location Map"
                  src="https://www.google.com/maps?q=VESIT+Chembur+Mumbai&output=embed"
                  className="w-full h-full border-0 filter grayscale contrast-125 invert-[0.9] hue-rotate-180"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Reveal>
  )
}
