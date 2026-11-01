import Link from 'next/link'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import { getAllBlogs } from '@/lib/blogs-store'
import BlogNewsletterCard from '@/components/blog/BlogNewsletterCard'
import BlogFilterClient from '@/components/blog/BlogFilterClient'

export const metadata = {
  title: 'Blog & Engineering Guides | FluxECS',
  description:
    'Technical guides, tutorials, lab writeups, and practical engineering documentation from the FluxECS student council at VESIT.',
}
export const dynamic = 'force-dynamic'

export default async function BlogPage({ searchParams }) {
  const query = await searchParams
  const category = query?.category || 'all'
  const search = query?.search || ''
  const tag = query?.tag || ''

  const blogs = await getAllBlogs({ includeDrafts: false, category, search, tag })
  const featured = blogs.find(b => b.isFeatured) || blogs[0]

  return (
    <Reveal>
      <div className="flex flex-col w-full bg-transparent text-[#EFF0F2] min-h-screen">
        {/* ==============================================================
            1. HERO & TELEMETRY HEADER
           ============================================================== */}
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
              <span className="w-2 h-2 rounded-full bg-[#D94A5B] animate-pulse" />
              <span className="font-mono text-xs text-[#9EA6AF] uppercase tracking-wider">
                Telemetry · Technical Writeups &amp; Guides
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05]">
              BUILD LOGS <br />
              <span className="text-[#9EA6AF] font-normal">&amp; GUIDES.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#9EA6AF] max-w-2xl leading-relaxed font-body">
              Deep-dive tutorials, firmware walk-throughs, and competitive algorithms authored by student engineers and faculty mentors at FluxECS.
            </p>
          </div>
        </header>

        {/* ==============================================================
            2. CLIENT FILTER & GUIDES GRID
           ============================================================== */}
        <div className="w-full px-6 lg:px-12 py-10 max-w-7xl mx-auto">
          <BlogFilterClient initialBlogs={blogs} featured={featured} activeCategory={category} />

          {/* ==============================================================
              3. NEWSLETTER DISPATCH CALLOUT
             ============================================================== */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <BlogNewsletterCard />
          </div>
        </div>
      </div>
    </Reveal>
  )
}
