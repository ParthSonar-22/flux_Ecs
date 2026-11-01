import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { getSiteContent } from '@/lib/site-content'
import { ADDRESS, EMAIL, GITHUB, INSTAGRAM, LINKEDIN } from '@/data/site'

export const metadata = {
  title: 'About the Council | FluxECS',
  description:
    'The official student branch council for Electronics & Computer Science at VESIT, Mumbai. Uniting hardware prototyping, competitive algorithms, and engineering mentorship.',
}

function getInitials(name) {
  const clean = (name || '').replace(/\b(Sir|Prof\.?|Dr\.?)\b/gi, '').trim()
  const parts = clean.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return parts[0] ? parts[0].slice(0, 2).toUpperCase() : 'FX'
}

export default async function AboutPage() {
  const content = await getSiteContent()
  const faculty = content.faculty || []
  const seniorCouncil = content.seniorCouncil || []
  const juniorCouncil = content.juniorCouncil || []
  const aboutPage = content.aboutPage || {}
  const socials = content.socials || {}

  const currentEmail = socials.email || EMAIL
  const currentGithub = socials.github || GITHUB
  const currentInstagram = socials.instagram || INSTAGRAM
  const currentLinkedin = socials.linkedin || LINKEDIN

  return (
    <Reveal>
      <div className="flex flex-col w-full bg-transparent text-[#EFF0F2] min-h-screen">
        {/* ==============================================================
            1. EDITORIAL HEADER & COUNCIL IDENTITY
           ============================================================== */}
        <header className="w-full px-6 lg:px-12 pt-36 lg:pt-40 pb-16 border-b border-white/10 bg-gradient-to-b from-[#12161C] to-[#0D1014] relative overflow-hidden">
          {/* Subtle engineering grid background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #d94a5b 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="max-w-7xl mx-auto flex flex-col space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B2026] border border-white/15 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#D94A5B]" />
              <span className="font-mono text-xs text-[#9EA6AF] uppercase tracking-wider">
                {aboutPage.badge || 'Council Overview · Department of ECS'}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05]">
              {aboutPage.headline || 'THE PEOPLE BEHIND FLUXECS.'}
            </h1>

            <p className="text-base sm:text-lg text-[#9EA6AF] max-w-3xl leading-relaxed font-body">
              {aboutPage.introParagraph || "FluxECS is the technical student council representing the Department of Electronics & Computer Science at Vivekanand Education Society's Institute of Technology (VESIT), Chembur. We bridge the intersection between physical silicon and algorithmic software through competitive problem-solving, hands-on lab prototyping, and peer engineering mentorship."}
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
                href="#faculty"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B2026] hover:bg-[#252C35] border border-white/15 text-white text-xs font-mono font-semibold uppercase tracking-wider rounded transition-all"
              >
                <span>Faculty Leadership</span>
                <span>↓</span>
              </a>
              <a
                href="#council"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B2026] hover:bg-[#252C35] border border-white/15 text-white text-xs font-mono font-semibold uppercase tracking-wider rounded transition-all"
              >
                <span>Meet the Council</span>
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
            3. FACULTY LEADERSHIP (WITH INITIALS PLACEHOLDER & F1 FRAMING)
           ============================================================== */}
        <section id="faculty" className="w-full px-6 lg:px-12 py-16 border-b border-white/10 bg-[#0D1014]">
          <div className="max-w-7xl mx-auto flex flex-col space-y-8">
            <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#D94A5B] font-bold block mb-1">
                  Academic Leadership
                </span>
                <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
                  Faculty In-Charge
                </h2>
                <p className="text-xs text-[#9EA6AF] font-mono mt-1">
                  Faculty mentorship steering curriculum alignment and department initiatives
                </p>
              </div>
              <span className="font-mono text-xs text-[#9EA6AF] uppercase">VESIT · ECS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl">
              {faculty.map((f, index) => {
                const initials = getInitials(f.name)
                return (
                  <article
                    key={f.name}
                    className="relative bg-[#161B22] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#D94A5B]/60 shadow-lg"
                  >
                    {/* F1 Corner Tag */}
                    <div className="absolute top-3 right-3 z-10 font-mono text-[10px] text-[#D94A5B] bg-[#0D1014]/90 border border-[#D94A5B]/30 px-2 py-0.5 rounded tracking-widest backdrop-blur-sm">
                      {`FAC // 0${index + 1}`}
                    </div>

                    {/* Photo slot / Initials Avatar space */}
                    {f.photo ? (
                      <div className="relative w-full aspect-[4/3] bg-[#0D1014] overflow-hidden border-b border-white/10">
                        <Image
                          src={f.photo}
                          alt={f.name}
                          fill
                          className="object-cover object-top filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#1B222C] to-[#11151A] border-b border-white/10 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#D94A5B]/60 bg-[#D94A5B]/10 flex items-center justify-center text-white font-display text-3xl font-bold tracking-wider mb-3 shadow-[0_0_20px_rgba(217,74,91,0.2)] group-hover:scale-105 transition-transform duration-300">
                          {initials}
                        </div>
                        <span className="font-mono text-[11px] text-[#9EA6AF] uppercase tracking-wider">
                          Official portrait pending
                        </span>
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="p-6 flex flex-col flex-1 justify-between space-y-3">
                      <div>
                        <span className="font-mono text-xs uppercase tracking-widest text-[#D94A5B] font-semibold block mb-1">
                          {f.title}
                        </span>
                        <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                          {f.name}
                        </h3>
                        <p className="text-sm text-[#9EA6AF] mt-1.5 leading-relaxed">
                          {f.dept}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-[#9EA6AF]">
                        <span>DEPARTMENT MENTOR</span>
                        <span className="text-[#D94A5B]">ACTIVE</span>
                      </div>
                    </div>

                    {/* F1 bottom racing line */}
                    <div className="h-0.5 w-0 bg-[#D94A5B] group-hover:w-full transition-all duration-500 ease-out" />
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ==============================================================
            4. SENIOR COUNCIL (CORE LEADERSHIP) — F1 FRAMED, VIBRANT COLOR
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
                  Third and Final Year student officers steering FluxECS operations and initiatives
                </p>
              </div>
              <span className="font-mono text-xs text-[#9EA6AF] uppercase">2026 - 2027</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {seniorCouncil.map((member, i) => (
                <article
                  key={member.id}
                  className="relative bg-[#161B22] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#D94A5B]/60 hover:-translate-y-1 shadow-md"
                >
                  {/* F1 Driver Number Tag */}
                  <div className="absolute top-3 left-3 z-10 font-mono text-[10px] text-[#D94A5B] bg-[#0D1014]/90 border border-[#D94A5B]/30 px-2 py-0.5 rounded tracking-widest backdrop-blur-sm">
                    {`// 0${i + 1}`}
                  </div>

                  {/* Photo: Natural full vibrant color (NOT grayscale) */}
                  {member.photo ? (
                    <div className="relative w-full aspect-[4/5] bg-[#0D1014] overflow-hidden border-b border-white/10">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover object-top filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#1B222C] to-[#11151A] border-b border-white/10 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#D94A5B]/60 bg-[#D94A5B]/10 flex items-center justify-center text-white font-display text-2xl font-bold tracking-wider mb-2 shadow-[0_0_20px_rgba(217,74,91,0.2)] group-hover:scale-105 transition-transform duration-300">
                        {getInitials(member.name)}
                      </div>
                      <span className="font-mono text-[11px] text-[#9EA6AF] uppercase tracking-wider">
                        Portrait pending
                      </span>
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-[#D94A5B] font-semibold mb-1">
                        {member.role}
                      </p>
                      <h3 className="text-base font-bold text-white font-display uppercase tracking-tight">
                        {member.name}
                      </h3>
                    </div>
                    {member.quote && (
                      <p className="italic text-xs text-[#9EA6AF] leading-relaxed">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* F1 bottom racing accent bar */}
                  <div className="h-0.5 w-0 bg-[#D94A5B] group-hover:w-full transition-all duration-500 ease-out" />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==============================================================
            5. JUNIOR COUNCIL (SECOND YEAR OFFICERS) — F1 FRAMED, VIBRANT COLOR
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
              {juniorCouncil.map((officer, i) => (
                <article
                  key={officer.id}
                  className="relative bg-[#161B22] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#D94A5B]/60 hover:-translate-y-1 shadow-md"
                >
                  {/* F1 Junior Tag */}
                  <div className="absolute top-2.5 left-2.5 z-10 font-mono text-[9px] text-[#D94A5B] bg-[#0D1014]/90 border border-[#D94A5B]/30 px-1.5 py-0.5 rounded tracking-widest backdrop-blur-sm">
                    {`// J0${i + 1}`}
                  </div>

                  {/* Photo: Natural vibrant full color (NOT grayscale) */}
                  {officer.photo ? (
                    <div className="relative w-full aspect-[4/5] bg-[#0D1014] overflow-hidden border-b border-white/10">
                      <Image
                        src={officer.photo}
                        alt={officer.name}
                        fill
                        className="object-cover object-top filter brightness-95 group-hover:brightness-105 group-hover:scale-105 transition-all duration-500"
                        sizes="(max-width: 768px) 100vw, 240px"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#1B222C] to-[#11151A] border-b border-white/10 flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#D94A5B]/60 bg-[#D94A5B]/10 flex items-center justify-center text-white font-display text-xl font-bold tracking-wider mb-2 shadow-[0_0_20px_rgba(217,74,91,0.2)] group-hover:scale-105 transition-transform duration-300">
                        {getInitials(officer.name)}
                      </div>
                      <span className="font-mono text-[10px] text-[#9EA6AF] uppercase tracking-wider">
                        Portrait pending
                      </span>
                    </div>
                  )}

                  <div className="p-4 flex flex-col flex-1 justify-between space-y-2">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#D94A5B] font-semibold mb-0.5">
                        {officer.role}
                      </p>
                      <h3 className="text-sm font-bold text-white font-display uppercase tracking-tight">
                        {officer.name}
                      </h3>
                    </div>
                    {officer.quote && (
                      <p className="italic text-[11px] text-[#9EA6AF] leading-relaxed">
                        &ldquo;{officer.quote}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* F1 bottom racing accent bar */}
                  <div className="h-0.5 w-0 bg-[#D94A5B] group-hover:w-full transition-all duration-500 ease-out" />
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
                    <a className="text-[#D94A5B] font-bold hover:underline" href={`mailto:${currentEmail}`}>
                      {currentEmail}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#9EA6AF] uppercase">GitHub Organization:</span>
                    <a
                      className="text-white hover:text-[#D94A5B] transition-colors inline-flex items-center gap-1.5"
                      href={currentGithub}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#D94A5B] shrink-0">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                      </svg>
                      <span>github.com/Flux-ECS-Club</span>
                      <span className="text-[11px] leading-none">↗</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#9EA6AF] uppercase">Instagram:</span>
                    <a
                      className="text-white hover:text-[#D94A5B] transition-colors inline-flex items-center gap-1.5"
                      href={currentInstagram}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#D94A5B] shrink-0">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      <span>@flux.ecs</span>
                      <span className="text-[11px] leading-none">↗</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#9EA6AF] uppercase">LinkedIn:</span>
                    <a
                      className="text-white hover:text-[#D94A5B] transition-colors inline-flex items-center gap-1.5"
                      href={currentLinkedin}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#D94A5B] shrink-0">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                      <span>Tinkerers&apos; Lab ECS</span>
                      <span className="text-[11px] leading-none">↗</span>
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
