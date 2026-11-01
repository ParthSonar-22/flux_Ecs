import Reveal from '@/components/Reveal'
import { getAllResources } from '@/lib/resources-store'
import ResourcesListClient from '@/components/resources/ResourcesListClient'

export const metadata = {
  title: 'Engineering Resources & Downloads | FluxECS',
  description:
    'Download official schematics, pinout guides, component libraries, cheat sheets, and firmware templates curated by FluxECS.',
}
export const dynamic = 'force-dynamic'

export default async function ResourcesPage({ searchParams }) {
  const query = await searchParams
  const category = query?.category || 'all'
  const search = query?.search || ''

  const resources = await getAllResources({ category, search })

  return (
    <Reveal>
      <div className="flex flex-col w-full bg-transparent text-[#EFF0F2] min-h-screen">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <header className="w-full px-6 lg:px-12 pt-36 lg:pt-40 pb-12 border-b border-white/10 bg-gradient-to-b from-[#12161C] to-[#0D1014] relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #d94a5b 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="max-w-7xl mx-auto flex flex-col space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B2026] border border-white/15 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#D94A5B]" />
              <span className="font-mono text-xs text-[#9EA6AF] uppercase tracking-wider">
                Laboratory Docket · Verified Downloads
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05]">
              RESOURCE <br />
              <span className="text-[#9EA6AF] font-normal">LIBRARY.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#9EA6AF] max-w-2xl leading-relaxed font-body">
              Verified circuit schematics, pinout references, component footprint libraries, and starter code repositories maintained for student cohorts.
            </p>
          </div>
        </header>

        {/* ── Client Interactive Grid ─────────────────────────────────── */}
        <div className="w-full px-6 lg:px-12 py-10 max-w-7xl mx-auto">
          <ResourcesListClient initialResources={resources} activeCategory={category} />
        </div>
      </div>
    </Reveal>
  )
}
