'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const CATEGORIES = ['All', 'Embedded', 'Robotics', 'DSA', 'Hardware', 'Web']

export default function BlogFilterClient({ initialBlogs = [], featured, activeCategory = 'all' }) {
  const [selectedCat, setSelectedCat] = useState(activeCategory.toLowerCase())
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return initialBlogs.filter(b => {
      const matchCat =
        selectedCat === 'all' ||
        b.category?.toLowerCase() === selectedCat.toLowerCase()
      const q = search.toLowerCase().trim()
      const matchSearch =
        !q ||
        b.title?.toLowerCase().includes(q) ||
        b.summary?.toLowerCase().includes(q) ||
        b.tags?.some(t => t.toLowerCase().includes(q))
      return matchCat && matchSearch
    })
  }, [initialBlogs, selectedCat, search])

  return (
    <div className="flex flex-col space-y-10">
      {/* ── Category Filter Pills & Search ────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCat === cat.toLowerCase()
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCat(cat.toLowerCase())}
                className={`px-3.5 py-1.5 rounded text-xs font-mono tracking-wider uppercase transition-all ${
                  isSelected
                    ? 'bg-[#D94A5B] text-white shadow-[0_2px_12px_rgba(217,74,91,0.35)]'
                    : 'bg-[#171C23] text-[#9EA6AF] hover:text-white hover:bg-[#202630] border border-white/10'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        <div className="relative min-w-[260px] max-w-sm">
          <input
            type="text"
            placeholder="Search guides, tags or keywords..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#12161C] border border-white/15 focus:border-[#D94A5B] rounded px-3.5 py-2 text-xs text-white placeholder-[#656D7A] focus:outline-none transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-2.5 top-2 text-[#9EA6AF] hover:text-white text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Featured Guide Banner (when no search active) ──────────────── */}
      {!search && selectedCat === 'all' && featured && (
        <div className="relative group overflow-hidden rounded-xl border border-white/15 bg-gradient-to-r from-[#171C23] to-[#12161C] shadow-2xl transition-all hover:border-[#D94A5B]/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 lg:p-8 items-center">
            <div className="lg:col-span-7 flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded bg-[#D94A5B] text-white text-[11px] font-mono uppercase font-semibold">
                  FEATURED GUIDE · {featured.category}
                </span>
                <span className="text-xs font-mono text-[#9EA6AF]">{featured.readTime}</span>
              </div>

              <Link href={`/blog/${featured.slug}`} className="group-hover:text-[#D94A5B] transition-colors">
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
                  {featured.title}
                </h2>
              </Link>

              <p className="text-sm text-[#9EA6AF] leading-relaxed line-clamp-3">
                {featured.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D94A5B]" />
                  <span>{featured.author?.name}</span>
                  <span className="text-[#656D7A]">({featured.author?.role})</span>
                </div>

                <Link
                  href={`/blog/${featured.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D94A5B] hover:text-[#e46978] transition-colors uppercase tracking-wider ml-auto font-semibold"
                >
                  <span>Read full guide</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[16/10] rounded-lg overflow-hidden border border-white/10 bg-[#0D1014]">
              <Image
                src={featured.coverImage || '/photos/iota-electrical-lab-discussion.png'}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1014]/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      )}

      {/* ── Guides Grid ───────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/15 rounded-xl bg-[#12161C]/50 p-8">
          <p className="font-mono text-sm text-[#9EA6AF]">NO GUIDES MATCHED QUERY.</p>
          <p className="text-xs text-[#656D7A] mt-1">Try selecting a different category or clearing search filter.</p>
          <button
            type="button"
            onClick={() => { setSelectedCat('all'); setSearch('') }}
            className="mt-4 px-4 py-2 rounded bg-[#1B2026] text-white text-xs font-mono uppercase hover:bg-[#252C35] transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(blog => (
            <article
              key={blog.id}
              className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#141920] hover:border-[#D94A5B]/40 hover:bg-[#181E26] transition-all duration-200 overflow-hidden group shadow-lg"
            >
              <div>
                <div className="relative aspect-[16/9] w-full bg-[#0D1014] overflow-hidden border-b border-white/10">
                  <Image
                    src={blog.coverImage || '/photos/iota-electrical-lab-discussion.png'}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded bg-[#0D1014]/90 border border-white/15 text-[10px] font-mono uppercase font-semibold text-[#EFF0F2]">
                      {blog.category}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-[#9EA6AF]">
                    {blog.readTime}
                  </div>
                </div>

                <div className="p-5 flex flex-col space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#9EA6AF]">
                    <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>{blog.author?.name}</span>
                  </div>

                  <Link href={`/blog/${blog.slug}`} className="group-hover:text-[#D94A5B] transition-colors">
                    <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-white leading-snug line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#9EA6AF] leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between mt-4">
                <div className="flex flex-wrap gap-1.5">
                  {blog.tags?.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-mono text-[#656D7A] bg-[#0D1014] px-1.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono text-[#D94A5B] group-hover:translate-x-0.5 transition-transform font-semibold uppercase"
                >
                  <span>Read</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
