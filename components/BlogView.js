'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import BlogNewsletterForm from '@/components/BlogNewsletterForm'
import SmartImage from '@/components/SmartImage'
import api from '@/services/api'
import { GITHUB, EMAIL, INSTAGRAM } from '@/data/site'

export default function BlogView() {
  const [postsList, setPostsList] = useState([])
  const [activePostId, setActivePostId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const fetchPosts = useCallback(() => {
    setLoading(true)
    setError(null)
    api.posts
      .getAll()
      .then((data) => {
        const list = Array.isArray(data) ? data : []
        setPostsList(list)
        if (list.length > 0) {
          setActivePostId((prev) => prev || list[0].id || list[0].slug)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load posts from API layer:', err)
        setError('Unable to load updates and stories. Please check connection and retry.')
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let active = true
    api.posts
      .getAll()
      .then((data) => {
        if (!active) return
        const list = Array.isArray(data) ? data : []
        setPostsList(list)
        if (list.length > 0) {
          setActivePostId((prev) => prev || list[0].id || list[0].slug)
        }
        setLoading(false)
      })
      .catch((err) => {
        if (!active) return
        console.error('Failed to load posts from API layer:', err)
        setError('Unable to load updates and stories. Please check connection and retry.')
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const activePost = postsList.find((p) => p.id === activePostId || p.slug === activePostId) || postsList[0]

  return (
    <div className="flex flex-col w-full">
      {/* Page header */}
      <header className="w-full bg-paper px-4 lg:px-margin pt-10 pb-8 border-b-2 border-ink">
        <div className="w-full max-w-7xl mx-auto">
          <span className="block font-label-smallcaps text-label-smallcaps text-brick tracking-[0.15em] uppercase mb-2 font-bold">
            FLUX-ECS · Dept. of Electronics &amp; Computer Science, VESIT
          </span>
          <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-display-hero text-ink uppercase tracking-tight leading-none font-bold">
            Updates &amp; Stories
          </h1>
          <p className="font-title-editorial text-title-editorial italic text-muted mt-2 max-w-2xl">
            Event write-ups, build logs, and photographic archives from the department
          </p>
          <div className="w-full border-t border-ink/20 mt-6" />
        </div>
      </header>

      {/* Content grid */}
      <div className="w-full px-4 lg:px-margin py-8">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main article column */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* Loading skeleton */}
            {loading && (
              <div className="bg-card border-2 border-ink p-6 shadow-[4px_4px_0px_var(--tan)] animate-pulse space-y-4">
                <div className="h-6 bg-tan/40 w-1/4 rounded"></div>
                <div className="h-10 bg-tan/50 w-3/4 rounded"></div>
                <div className="h-64 bg-tan/30 rounded"></div>
                <div className="space-y-2 pt-4">
                  <div className="h-4 bg-tan/30 w-full rounded"></div>
                  <div className="h-4 bg-tan/30 w-5/6 rounded"></div>
                  <div className="h-4 bg-tan/30 w-4/6 rounded"></div>
                </div>
              </div>
            )}

            {/* Error state */}
            {!loading && error && (
              <div className="border-2 border-brick bg-paper p-8 text-center shadow-[4px_4px_0px_var(--brick)] space-y-4">
                <span className="material-symbols-outlined text-brick text-4xl">warning</span>
                <h3 className="font-headline-md text-xl font-bold text-ink">Gazette Stream Offline</h3>
                <p className="font-body-md text-sm text-muted">{error}</p>
                <button
                  type="button"
                  onClick={fetchPosts}
                  className="px-5 py-2 border-2 border-ink bg-brick text-paper font-label-smallcaps text-xs uppercase tracking-wider font-bold shadow-[2px_2px_0px_var(--ink)] hover:bg-brick-btn"
                >
                  Retry Loading
                </button>
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && postsList.length === 0 && (
              <div className="border-2 border-ink bg-card p-12 text-center shadow-[4px_4px_0px_var(--tan)] space-y-3">
                <span className="material-symbols-outlined text-muted text-4xl">article</span>
                <h3 className="font-headline-md text-xl font-bold text-ink">No Dispatches Logged Yet</h3>
                <p className="font-body-md text-sm text-muted">
                  The council editorial team has not published dispatches for this term yet. Check back soon!
                </p>
              </div>
            )}

            {/* Render active post */}
            {!loading && !error && activePost && (
              <article className="bg-card border-2 border-ink p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_var(--brick)] relative">
                {/* Article meta */}
                <div className="flex flex-wrap items-center gap-2 mb-4 font-complexity-notation text-xs text-muted">
                  <span className="px-2.5 py-0.5 bg-brick text-paper font-bold uppercase tracking-wider">
                    {activePost.category || 'Announcement'}
                  </span>
                  <span>{activePost.date || 'Recent'}</span>
                  {activePost.location && (
                    <>
                      <span>·</span>
                      <span className="text-ink font-bold">{activePost.location}</span>
                    </>
                  )}
                </div>

                <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-ink leading-tight tracking-tight mb-4 font-bold">
                  {activePost.title} {activePost.subtitle ? `: ${activePost.subtitle}` : ''}
                </h2>

                {activePost.intro && (
                  <div className="font-body-lg text-body-lg text-ink mb-6 leading-relaxed space-y-3">
                    {activePost.intro.split('\n\n').map((para, i) => (
                      <p key={i} className="mb-3">{para}</p>
                    ))}
                  </div>
                )}

                {/* Cover photo */}
                {activePost.coverPhoto && (
                  <figure className="w-full border-2 border-ink bg-card shadow-[4px_4px_0px_var(--ink)] mb-8 overflow-hidden">
                    <div
                      className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[1024/628] bg-tan cursor-pointer group"
                      onClick={() =>
                        setSelectedPhoto({
                          src: activePost.coverPhoto,
                          label: activePost.title,
                          sub: activePost.subtitle || activePost.location || 'FLUX-ECS Department Dispatch',
                        })
                      }
                      data-cursor-text="ZOOM"
                    >
                      <SmartImage
                        src={activePost.coverPhoto}
                        alt={`${activePost.title} cover photo`}
                        fill
                        className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-300"
                        priority
                        sizes="(max-width: 1024px) 100vw, 850px"
                      />
                      <div className="absolute top-3 right-3 bg-ink/80 text-paper font-complexity-notation text-[11px] px-2 py-1 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                        <span>Fullscreen</span>
                      </div>
                    </div>
                  </figure>
                )}

                {/* Sections if present */}
                {activePost.sections && activePost.sections.length > 0 && (
                  <div className="space-y-10">
                    {activePost.sections.map((sec) => (
                      <div key={sec.id || sec.heading} className="border-t border-ink/20 pt-6">
                        <h3 className="font-headline-sm text-headline-sm text-ink font-bold mb-3">
                          {sec.heading}
                        </h3>
                        <div className="font-body-md text-body-md text-ink leading-relaxed mb-4 space-y-3">
                          {sec.body?.split('\n\n').map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>

                        {sec.photo && (
                          <div className="my-5 border-2 border-ink bg-card shadow-[3px_3px_0px_var(--ink)] overflow-hidden">
                            <div
                              className="relative w-full aspect-[4/3] md:aspect-[16/9] bg-tan cursor-pointer group"
                              onClick={() =>
                                setSelectedPhoto({
                                  src: sec.photo,
                                  label: sec.photoLabel || sec.heading,
                                  sub: sec.heading,
                                })
                              }
                            >
                              <SmartImage
                                src={sec.photo}
                                alt={sec.photoLabel || sec.heading}
                                fill
                                className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-300"
                                sizes="(max-width: 1024px) 100vw, 850px"
                              />
                            </div>
                          </div>
                        )}

                        {sec.projects && (
                          <div className="bg-paper border border-ink/20 p-4 mt-3">
                            <span className="font-label-smallcaps text-[11px] uppercase tracking-wider text-brick font-bold block mb-2">
                              Projects &amp; Activities shown:
                            </span>
                            <ul className="space-y-1.5 font-body-sm text-body-sm text-ink">
                              {sec.projects.map((proj) => (
                                <li key={proj} className="flex items-start gap-2">
                                  <span className="text-brick text-xs mt-0.5 font-bold">·</span>
                                  <span>{proj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Photo gallery if present */}
                {activePost.gallery && activePost.gallery.length > 0 && (
                  <div className="mt-10 pt-8 border-t-2 border-ink/20">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-4">
                      <div>
                        <span className="font-label-smallcaps text-label-smallcaps uppercase tracking-wider text-brick font-bold block">
                          Archival Record
                        </span>
                        <h4 className="font-headline-sm text-xl text-ink font-bold">
                          Exhibition Photo Gallery
                        </h4>
                      </div>
                      <span className="font-complexity-notation text-xs text-muted">
                        Click any photo to view full resolution
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activePost.gallery.map((img, idx) => (
                        <div
                          key={img.src || idx}
                          className="border-2 border-ink bg-card shadow-[3px_3px_0px_var(--ink)] overflow-hidden cursor-pointer group"
                          onClick={() =>
                            setSelectedPhoto({
                              src: img.src,
                              label: img.label || activePost.title,
                              sub: 'FLUX-ECS Archives',
                            })
                          }
                        >
                          <div className="relative w-full aspect-[3/2] bg-tan overflow-hidden">
                            <SmartImage
                              src={img.src}
                              alt={img.label || 'Archive photo'}
                              fill
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, 420px"
                            />
                          </div>
                          {img.label && (
                            <div className="p-2.5 bg-paper border-t border-ink/20">
                              <span className="font-complexity-notation text-xs text-ink block font-semibold truncate">
                                {img.label}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            {/* Story selector / Recent dispatches */}
            {postsList.length > 1 && (
              <div className="bg-card border-2 border-ink p-5 shadow-[3px_3px_0px_var(--ink)]">
                <h3 className="font-label-smallcaps text-xs uppercase tracking-wider text-brick font-bold mb-3">
                  All Published Dispatches ({postsList.length})
                </h3>
                <div className="space-y-2">
                  {postsList.map((p) => {
                    const isActive = p.id === activePost?.id || p.slug === activePost?.slug
                    return (
                      <button
                        key={p.id || p.slug}
                        type="button"
                        onClick={() => setActivePostId(p.id || p.slug)}
                        className={`w-full text-left p-3 border transition-all text-xs font-complexity-notation flex flex-col gap-1 ${
                          isActive
                            ? 'bg-brick text-paper border-ink font-bold shadow-[2px_2px_0px_var(--ink)]'
                            : 'bg-paper text-ink border-ink/30 hover:bg-tan'
                        }`}
                      >
                        <span className="truncate">{p.title}</span>
                        <span className={`text-[10px] ${isActive ? 'text-paper/80' : 'text-muted'}`}>
                          {p.date || 'Archives'}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Newsletter subscription */}
            <BlogNewsletterForm />

            {/* About the blog */}
            <div className="bg-paper border-2 border-ink p-6 shadow-[4px_4px_0px_var(--tan)]">
              <span className="font-label-smallcaps text-label-smallcaps text-brick uppercase tracking-wider font-bold block mb-2">
                About the Gazette
              </span>
              <h3 className="font-headline-sm text-xl text-ink font-bold mb-3">
                The FLUX Dispatch
              </h3>
              <p className="font-body-md text-sm text-ink leading-relaxed mb-4">
                The official technical publication of FLUX-ECS, covering hardware prototypes, algorithms, exhibitions, and student breakthroughs across VESIT.
              </p>
              <div className="border-t border-ink/20 pt-3 flex flex-col gap-2 font-complexity-notation text-xs">
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brick font-bold hover:underline flex items-center gap-1"
                >
                  <span>Follow @flux.ecs</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brick font-bold hover:underline flex items-center gap-1"
                >
                  <span>github.com/Flux-ECS-Club</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-paper border-2 border-ink p-4 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-ink/20 mb-3">
              <div>
                <h4 className="font-headline-sm text-base text-ink font-bold">{selectedPhoto.label}</h4>
                <p className="font-complexity-notation text-xs text-muted">{selectedPhoto.sub}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="p-1 border border-ink bg-card text-ink hover:bg-tan"
                aria-label="Close dialog"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="relative w-full h-[65vh] bg-tan flex items-center justify-center overflow-hidden">
              <SmartImage
                src={selectedPhoto.src}
                alt={selectedPhoto.label}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
