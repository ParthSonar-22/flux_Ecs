'use client'

import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import SmartImage from './SmartImage'
import api from '@/services/api'
import { INSTAGRAM } from '@/data/site'

/* ─── Lightbox Modal ─────────────────────────────────────────────────────── */
function LightboxModal({ item, onClose }) {
  const dialogRef = useRef(null)

  // Close on ESC key
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handle)
    // Prevent body scroll while open
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handle)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* Modal shell — full screen on mobile, 90vw × 90vh on desktop */}
      <div
        ref={dialogRef}
        className="
          relative flex flex-col bg-paper border-2 border-ink shadow-[6px_6px_0px_var(--ink)]
          w-full h-full
          sm:w-[90vw] sm:h-[90vh] sm:max-w-7xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-ink shrink-0">
          <div>
            <h4 className="font-headline-sm text-sm sm:text-base text-ink font-bold leading-tight">
              {item.title}
            </h4>
            <p className="font-complexity-notation text-[11px] text-muted mt-0.5">
              {item.category}&nbsp;·&nbsp;{item.date}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 border-2 border-ink bg-card text-ink hover:bg-tan active:scale-95 transition-transform shrink-0 ml-4"
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Image — fills ALL remaining space, no padding */}
        <div className="relative flex-1 w-full bg-tan overflow-hidden">
          <SmartImage
            src={item.src}
            alt={item.title}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, 90vw"
            priority
          />
        </div>
      </div>
    </div>
  )
}

export default function GalleryView() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxItem, setLightboxItem] = useState(null)

  const fetchGallery = useCallback(() => {
    setLoading(true)
    setError(null)
    api.gallery
      .getAll()
      .then((data) => {
        setItems(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load gallery items:', err)
        setError('Could not synchronize gallery records. Please retry.')
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let active = true
    api.gallery
      .getAll()
      .then((data) => {
        if (!active) return
        setItems(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        if (!active) return
        console.error('Failed to load gallery items:', err)
        setError('Could not synchronize gallery records. Please retry.')
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const categories = useMemo(() => {
    const set = new Set(['All'])
    items.forEach((item) => {
      if (item.category) set.add(item.category)
    })
    return Array.from(set)
  }, [items])

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return items
    return items.filter((item) => item.category === activeCategory)
  }, [items, activeCategory])

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="w-full px-4 lg:px-margin py-space-lg lg:py-space-xl bg-paper border-b-2 border-ink">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="handwritten-eyebrow text-xl sm:text-3xl font-bold text-brick">
            Visual Dossier
          </span>
          <h1 className="font-display-hero text-3xl sm:text-4xl md:text-headline-lg lg:text-display-hero text-ink leading-none tracking-tight font-bold">
            Department Gallery
          </h1>
          <p className="font-body-lg text-base sm:text-body-lg text-muted max-w-2xl leading-relaxed">
            Photographic archives from Tinkerers Lab workshops, robotic testing benches, and department exhibitions at VESIT.
          </p>

          {/* Category Filters */}
          <div className="pt-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 border-2 border-ink font-label-smallcaps text-xs uppercase tracking-wider font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-brick text-paper shadow-[2px_2px_0px_var(--ink)]'
                    : 'bg-card text-ink hover:bg-tan'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="w-full px-4 lg:px-margin py-space-xl bg-card min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border-2 border-ink bg-paper p-3 shadow-md space-y-3">
                  <div className="w-full aspect-[4/3] bg-tan/40 rounded"></div>
                  <div className="h-5 bg-tan/50 w-2/3 rounded"></div>
                  <div className="h-3 bg-tan/30 w-1/3 rounded"></div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="border-2 border-brick bg-paper p-8 text-center max-w-md mx-auto shadow-[4px_4px_0px_var(--brick)] space-y-3">
              <span className="material-symbols-outlined text-brick text-4xl">broken_image</span>
              <h3 className="font-headline-sm text-lg font-bold text-ink">Sync Failed</h3>
              <p className="font-body-sm text-xs text-muted">{error}</p>
              <button
                type="button"
                onClick={fetchGallery}
                className="px-4 py-2 border-2 border-ink bg-brick text-paper font-label-smallcaps text-xs uppercase tracking-wider font-bold hover:bg-brick-btn"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filteredItems.length === 0 && (
            <div className="border-2 border-ink bg-paper p-12 text-center max-w-md mx-auto shadow-[3px_3px_0px_var(--tan)] space-y-3">
              <span className="material-symbols-outlined text-muted text-4xl">photo_library</span>
              <h3 className="font-headline-sm text-lg font-bold text-ink">No Media In Category</h3>
              <p className="font-body-sm text-xs text-muted">
                No photos found in &ldquo;{activeCategory}&rdquo;. Try selecting &ldquo;All&rdquo;.
              </p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && filteredItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="bg-paper border-2 border-ink shadow-[4px_4px_0px_var(--tan)] flex flex-col justify-between overflow-hidden cursor-pointer group hover:-translate-y-1 transition-transform"
                  onClick={() => setLightboxItem(item)}
                  data-cursor-text="EXPAND"
                >
                  <div className="relative w-full aspect-[4/3] bg-tan overflow-hidden border-b-2 border-ink">
                    <SmartImage
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 border border-ink bg-paper/95 text-ink text-[10px] font-bold font-complexity-notation uppercase shadow-[1px_1px_0px_var(--ink)]">
                      {item.category || 'Photo'}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1 space-y-2 bg-card">
                    <div>
                      <h3 className="font-headline-sm text-base text-ink font-bold leading-tight">
                        {item.title}
                      </h3>
                    </div>

                    <div className="pt-2 border-t border-ink/10 flex items-center justify-between font-complexity-notation text-[11px] text-muted">
                      <span>{item.date || 'Archives'}</span>
                      <span className="text-brick font-bold flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[14px]">fullscreen</span>
                        View
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <LightboxModal item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </div>
  )
}
