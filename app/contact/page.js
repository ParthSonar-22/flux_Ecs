import Reveal from '@/components/Reveal'
import ContactForm from '@/components/ContactForm'
import { EMAIL, GITHUB, INSTAGRAM, ADDRESS, WHATSAPP_URL } from '@/data/site'
import { coreExec } from '@/data/team'

export const metadata = {
  title: 'Contact us',
  description:
    'Get in touch with FLUX-ECS, the technical club of the Department of Electronics & Computer Science, VESIT.',
}

export default function ContactPage() {
  return (
    <Reveal>
      <div className="flex flex-col w-full">
        {/* Page header */}
        <section className="w-full bg-paper border-b-2 border-ink px-4 lg:px-margin py-space-lg lg:py-space-xl">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-end">
            <div className="lg:col-span-8 flex flex-col space-y-4">
              <span className="handwritten-eyebrow text-xl sm:text-3xl font-bold text-brick mb-1">
                Get in touch with FLUX-ECS
              </span>
              <h1 className="font-display-hero text-3xl sm:text-4xl md:text-display-hero text-ink leading-[0.95] tracking-tight font-bold">
                Contact Us
              </h1>
              <p className="font-body-lg text-base sm:text-body-lg text-muted max-w-2xl pt-2">
                Questions about events, workshops or anything else? Fill in the form below or reach us directly.
              </p>
            </div>

            {/* Quick info card */}
            <div className="lg:col-span-4 bg-card border border-ink/30 p-space-md">
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-ink/20 pb-2">
                  <span className="font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold">Department</span>
                  <span className="font-complexity-notation text-xs font-bold text-brick">ECS · VESIT</span>
                </div>
                <div className="flex justify-between items-center border-b border-ink/20 pb-2">
                  <span className="font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold">Location</span>
                  <span className="font-complexity-notation text-xs font-bold text-ink">2nd Floor, VESIT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold">Labs</span>
                  <span className="font-complexity-notation text-xs font-bold text-muted">201, 203, 215</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main body */}
        <section className="w-full px-4 lg:px-margin py-space-xl bg-paper">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* LEFT: Contact info */}
            <div className="lg:col-span-5 flex flex-col space-y-space-lg">
              <div className="border-2 border-ink bg-card shadow-[4px_4px_0px_var(--brick)] p-space-md lg:p-space-lg flex flex-col space-y-space-md">
                <div className="border-b border-ink/30 pb-space-sm">
                  <h2 className="font-headline-sm text-headline-sm text-ink font-bold">
                    Contact info
                  </h2>
                </div>

                {/* Email and GitHub */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    className="flex items-center justify-between p-3 bg-paper border border-ink/30 hover:bg-tan transition-colors group"
                    href={`mailto:${EMAIL}`}
                  >
                    <div className="flex flex-col">
                      <span className="font-label-smallcaps text-[11px] uppercase tracking-wider text-muted font-bold">Email</span>
                      <span className="font-complexity-notation text-xs font-bold text-brick truncate">{EMAIL}</span>
                    </div>
                    <span className="material-symbols-outlined text-[18px] text-brick">mail</span>
                  </a>
                  <a
                    className="flex items-center justify-between p-3 bg-paper border border-ink/30 hover:bg-tan transition-colors group"
                    href={GITHUB}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div className="flex flex-col">
                      <span className="font-label-smallcaps text-[11px] uppercase tracking-wider text-muted font-bold">GitHub</span>
                      <span className="font-complexity-notation text-xs font-bold text-ink truncate">Flux-ECS-Club</span>
                    </div>
                    <span className="material-symbols-outlined text-[18px] text-ink">terminal</span>
                  </a>
                </div>

                {/* Instagram */}
                <div className="bg-tan border border-ink/30 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold">Instagram:</span>
                  </div>
                  <a
                    className="font-complexity-notation text-xs font-bold text-brick hover:underline"
                    href={INSTAGRAM}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    @flux.ecs
                  </a>
                </div>

                {/* Address */}
                <div className="space-y-2 border-t border-ink/20 pt-space-sm">
                  <span className="font-label-smallcaps text-xs uppercase tracking-widest text-muted flex items-center gap-1.5 font-bold">
                    <span className="material-symbols-outlined text-[16px] text-brick">location_on</span>
                    Address
                  </span>
                  <p className="font-body-md text-body-md text-ink leading-snug">
                    {ADDRESS}
                  </p>
                </div>

                {/* Phone numbers */}
                <div className="space-y-2 border-t border-ink/20 pt-space-sm">
                  <h3 className="font-label-smallcaps text-xs uppercase tracking-widest text-ink font-bold pb-1">
                    Call us
                  </h3>
                  <div className="divide-y divide-ink/10 bg-paper border border-ink/20">
                    {coreExec
                      .filter((c) => c.phone)
                      .map((c) => (
                      <div key={c.name} className="p-2.5 flex items-center justify-between">
                        <div>
                          <p className="font-title-editorial text-sm font-bold text-ink">{c.name}</p>
                          <span className="font-complexity-notation text-[10px] uppercase text-brick font-bold">{c.role}</span>
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
            </div>

            {/* RIGHT: Form */}
            <div className="lg:col-span-7 flex flex-col space-y-space-lg">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* WhatsApp banner */}
        <section className="w-full px-4 lg:px-margin py-space-lg bg-paper">
          <div className="max-w-7xl mx-auto">
            <div className="bg-brick text-paper border-2 border-ink shadow-[6px_6px_0px_var(--ink)] p-space-md lg:p-space-lg relative overflow-hidden">
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <h3 className="font-headline-lg text-xl sm:text-2xl md:text-headline-lg text-paper tracking-tight font-bold">
                    Join the Algorithm&apos;s Auction WhatsApp group
                  </h3>
                  <p className="font-body-md text-sm sm:text-body-md text-paper/90 max-w-2xl leading-relaxed">
                    Get problem statements, team-up requests and timing updates in real time during the event.
                  </p>
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <a
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:py-4 bg-paper text-ink border-2 border-ink font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[4px_4px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all font-bold group text-center"
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
            </div>
          </div>
        </section>
      </div>
    </Reveal>
  )
}
