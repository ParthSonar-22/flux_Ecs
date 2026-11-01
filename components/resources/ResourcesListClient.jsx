'use client'

import { useState, useMemo } from 'react'

const CATEGORIES = ['All', 'Embedded', 'Robotics', 'DSA', 'Hardware']

export default function ResourcesListClient({ initialResources = [], activeCategory = 'all' }) {
  const [selectedCat, setSelectedCat] = useState(activeCategory.toLowerCase())
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return initialResources.filter(r => {
      const matchCat =
        selectedCat === 'all' ||
        r.category?.toLowerCase() === selectedCat.toLowerCase()
      const q = search.toLowerCase().trim()
      const matchSearch =
        !q ||
        r.title?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.type?.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [initialResources, selectedCat, search])

  return (
    <div className="flex flex-col space-y-8">
      {/* ── Filters Bar ───────────────────────────────────────────────── */}
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
            placeholder="Search manuals, schematics..."
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

      {/* ── Resources Grid ────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/15 rounded-xl bg-[#12161C]/50 p-8">
          <p className="font-mono text-sm text-[#9EA6AF]">NO MATERIALS FOUND.</p>
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
          {filtered.map(res => (
            <div
              key={res.id}
              className="flex flex-col justify-between p-6 rounded-xl border border-white/10 bg-[#141920] hover:border-[#D94A5B]/40 hover:bg-[#181E26] transition-all shadow-lg group"
            >
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-[#D94A5B]/15 border border-[#D94A5B]/30 text-[10px] font-mono text-[#D94A5B] font-bold uppercase">
                    {res.type || 'DOCUMENT'}
                  </span>
                  <span className="text-xs font-mono text-[#656D7A]">{res.size}</span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#D94A5B] transition-colors leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs text-[#9EA6AF] leading-relaxed line-clamp-3">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-6 text-xs font-mono">
                <span className="text-[#656D7A]">{res.author}</span>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1B2026] hover:bg-[#D94A5B] text-white text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <span>Download</span>
                  <span>↓</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
