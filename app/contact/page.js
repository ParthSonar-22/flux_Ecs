import Reveal from '@/components/Reveal'
import ContactForm from '@/components/ContactForm'
import { EMAIL, GITHUB, INSTAGRAM, LINKEDIN, ADDRESS } from '@/data/site'
import { coreExec } from '@/data/team'

export const metadata = {
  title: 'Contact Secretariat | FluxECS VESIT',
  description:
    'Get in touch with FluxECS, the technical student council for Electronics & Computer Science at VESIT, Mumbai.',
}

export default function ContactPage() {
  return (
    <Reveal>
      <div className="flex flex-col w-full bg-transparent text-[#EFF0F2] min-h-screen">
        {/* Header */}
        <header className="w-full px-6 lg:px-12 pt-36 pb-12 border-b border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B2026] border border-white/15 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#D94A5B]" />
              <span className="font-mono text-xs text-[#9EA6AF] uppercase tracking-wider">
                Direct Secretariat Communications
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05]">
              Contact Us.
            </h1>

            <p className="text-base sm:text-lg text-[#9EA6AF] max-w-2xl leading-relaxed font-body">
              Have questions about upcoming tournaments, open bench hours in Lab 201, or technical workshops? Send a direct dispatch below.
            </p>
          </div>
        </header>

        {/* Content */}
        <main className="w-full px-6 lg:px-12 py-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#12161C] border border-white/10 rounded-xl p-6 sm:p-7 space-y-6 shadow-xl">
                <div className="border-b border-white/10 pb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D94A5B] font-bold block mb-1">
                    Direct Channels
                  </span>
                  <h2 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                    Council Headquarters
                  </h2>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-[#171C23] border border-white/10 rounded-lg flex items-center justify-between">
                    <span className="text-gray-400">EMAIL:</span>
                    <a className="text-[#D94A5B] font-bold hover:underline inline-flex items-center gap-1.5" href={`mailto:${EMAIL}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#D94A5B] shrink-0">
                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      </svg>
                      <span>{EMAIL}</span>
                    </a>
                  </div>

                  <div className="p-3 bg-[#171C23] border border-white/10 rounded-lg flex items-center justify-between">
                    <span className="text-gray-400">INSTAGRAM:</span>
                    <a
                      className="text-white hover:text-[#D94A5B] transition-colors inline-flex items-center gap-1.5"
                      href={INSTAGRAM}
                      target="_blank"
                      rel="noreferrer"
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

                  <div className="p-3 bg-[#171C23] border border-white/10 rounded-lg flex items-center justify-between">
                    <span className="text-gray-400">LINKEDIN:</span>
                    <a
                      className="text-white hover:text-[#D94A5B] transition-colors inline-flex items-center gap-1.5"
                      href={LINKEDIN}
                      target="_blank"
                      rel="noreferrer"
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

                  <div className="p-3 bg-[#171C23] border border-white/10 rounded-lg flex items-center justify-between">
                    <span className="text-gray-400">GITHUB:</span>
                    <a
                      className="text-white hover:text-[#D94A5B] transition-colors inline-flex items-center gap-1.5"
                      href={GITHUB}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#D94A5B] shrink-0">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                        <path d="M9 18c-4.51 2-5-2-7-2"></path>
                      </svg>
                      <span>Flux-ECS-Club</span>
                      <span className="text-[11px] leading-none">↗</span>
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-400 block font-semibold">
                    Lab Location
                  </span>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {ADDRESS}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-400 block font-semibold">
                    Council Officers Hotline
                  </span>
                  <div className="space-y-2 font-mono text-xs">
                    {coreExec
                      .filter(c => c.phone)
                      .slice(0, 4)
                      .map(c => (
                        <div key={c.name} className="flex items-center justify-between p-2.5 bg-[#171C23] rounded border border-white/5">
                          <div>
                            <span className="text-white font-semibold block">{c.name}</span>
                            <span className="text-[10px] text-[#D94A5B] uppercase">{c.role}</span>
                          </div>
                          <a href={`tel:${c.phone.replace(/\s+/g, '')}`} className="text-gray-300 hover:text-white">
                            {c.phone}
                          </a>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </main>
      </div>
    </Reveal>
  )
}
