'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BlogNewsletterForm from '@/components/BlogNewsletterForm'
import { posts } from '@/data/posts'
import { GITHUB, EMAIL, INSTAGRAM } from '@/data/site'

export default function BlogView() {
  const post = posts[0] // IoTA Archives
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  return (
    <div className="flex flex-col w-full">
      {/* Page header */}
      <header className="w-full bg-paper px-4 lg:px-margin pt-10 pb-8 border-b-2 border-ink">
        <div className="w-full max-w-7xl mx-auto">
          <span className="block font-label-smallcaps text-label-smallcaps text-brick tracking-[0.15em] uppercase mb-2 font-bold">
            FLUX-ECS · Dept. of Electronics &amp; Computer Science, VESIT
          </span>
          <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-ink uppercase tracking-tight leading-none font-bold">
            Updates &amp; Stories
          </h1>
          <p className="font-title-editorial text-title-editorial italic text-muted mt-2 max-w-2xl">
            Event write-ups, build logs and photographic archives from the department
          </p>
          <div className="w-full border-t border-ink/20 mt-6" />
        </div>
      </header>

      {/* Content grid */}
      <div className="w-full px-4 lg:px-margin py-8">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main article */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            <article className="bg-card border-2 border-ink p-6 lg:p-8 shadow-[4px_4px_0px_var(--brick)] relative">
              {/* Article meta */}
              <div className="flex flex-wrap items-center gap-2 mb-4 font-complexity-notation text-xs text-muted">
                <span className="px-2.5 py-0.5 bg-brick text-paper font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>·</span>
                <span className="text-ink font-bold">{post.location}</span>
              </div>

              <h2 className="font-headline-lg text-headline-lg text-ink leading-tight tracking-tight mb-4 font-bold">
                {post.title}: {post.subtitle}
              </h2>

              <p className="font-body-lg text-body-lg text-ink mb-6 leading-relaxed">
                {post.intro}
              </p>

              {/* Cover photo — Fixed aspect ratio so nothing gets cut */}
              <figure className="w-full border-2 border-ink bg-card shadow-[4px_4px_0px_var(--ink)] mb-8 overflow-hidden">
                <div
                  className="relative w-full aspect-[1024/574] bg-tan cursor-pointer group"
                  onClick={() =>
                    setSelectedPhoto({
                      src: post.coverPhoto,
                      label: 'Embedded Systems Lab — Autonomous Obstacle-Avoiding Robot Navigation',
                      sub: 'IoTA Archives Induction Exhibition · First Year Cohort',
                    })
                  }
                >
                  <Image
                    src={post.coverPhoto}
                    alt={`${post.title} cover photo`}
                    fill
                    className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-300"
                    priority
                    sizes="(max-width: 1024px) 100vw, 850px"
                  />
                  <div className="absolute top-3 right-3 bg-ink/80 text-paper font-complexity-notation text-[11px] px-2 py-1 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                    <span>View Fullscreen</span>
                  </div>
                </div>
                <figcaption className="bg-paper border-t-2 border-ink px-4 py-2.5 font-complexity-notation text-xs flex flex-wrap justify-between items-center text-ink gap-2">
                  <span className="font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-brick inline-block" />
                    Embedded Systems Lab — Live Autonomous Robot Navigation
                  </span>
                  <span className="text-muted">Labs 201, 203 &amp; Tinkerers&apos; Lab · VESIT</span>
                </figcaption>
              </figure>

              {/* Sections */}
              <div className="space-y-10">
                {post.sections.map((sec) => (
                  <div key={sec.id} className="border-t border-ink/20 pt-6">
                    <h3 className="font-headline-sm text-headline-sm text-ink font-bold mb-3">
                      {sec.heading}
                    </h3>
                    <p className="font-body-md text-body-md text-ink leading-relaxed mb-4">
                      {sec.body}
                    </p>

                    {/* Section Photo with exact natural aspect ratio */}
                    {sec.photo && (
                      <div className="my-5 border-2 border-ink bg-card shadow-[3px_3px_0px_var(--ink)] overflow-hidden">
                        <div
                          className={`relative w-full ${sec.aspect || 'aspect-[16/9]'} bg-tan cursor-pointer group`}
                          onClick={() =>
                            setSelectedPhoto({
                              src: sec.photo,
                              label: sec.photoLabel || sec.heading,
                              sub: sec.heading,
                            })
                          }
                        >
                          <Image
                            src={sec.photo}
                            alt={sec.photoLabel || sec.heading}
                            fill
                            className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-300"
                            sizes="(max-width: 1024px) 100vw, 850px"
                          />
                          <div className="absolute top-3 right-3 bg-ink/80 text-paper font-complexity-notation text-[11px] px-2 py-1 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                            <span className="material-symbols-outlined text-[14px]">zoom_in</span>
                            <span>Expand</span>
                          </div>
                        </div>
                        {sec.photoLabel && (
                          <div className="bg-paper border-t border-ink/20 px-3.5 py-2 font-complexity-notation text-xs flex items-center justify-between">
                            <span className="text-ink font-semibold">{sec.photoLabel}</span>
                            <span className="text-[11px] uppercase tracking-wider text-brick font-bold">
                              FLUX-ECS Archives
                            </span>
                          </div>
                        )}
                      </div>
                    )}

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
                  </div>
                ))}
              </div>

              {/* Photo gallery */}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {post.gallery.map((img) => (
                    <div
                      key={img.src}
                      className="border-2 border-ink bg-card shadow-[3px_3px_0px_var(--ink)] overflow-hidden cursor-pointer group"
                      onClick={() =>
                        setSelectedPhoto({
                          src: img.src,
                          label: img.label,
                          sub: 'IoTA Archives — Department of Electronics & Computer Science, VESIT',
                        })
                      }
                    >
                      <div className={`relative w-full ${img.aspect || 'aspect-[16/9]'} bg-tan overflow-hidden`}>
                        <Image
                          src={img.src}
                          alt={img.label}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 420px"
                        />
                        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-paper/95 text-ink border border-ink px-2.5 py-1 font-complexity-notation text-xs font-bold shadow-md">
                            View Image
                          </span>
                        </div>
                      </div>
                      <div className="p-2.5 bg-paper border-t border-ink/20">
                        <span className="font-complexity-notation text-xs text-ink block font-semibold">
                          {img.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            {/* Newsletter subscription */}
            <BlogNewsletterForm />

            {/* About the blog */}
            <div className="border-2 border-ink bg-paper p-6 shadow-[3px_3px_0px_var(--ink)]">
              <h3 className="font-headline-sm text-headline-sm text-ink font-bold mb-3">
                About this record
              </h3>
              <p className="font-body-sm text-body-sm text-muted mb-4 leading-relaxed">
                This is where we log technical proceedings, workshops, build retrospectives, and event photo albums.
              </p>
              <div className="pt-3 border-t border-ink/20 space-y-2 font-complexity-notation text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted">GitHub:</span>
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brick font-bold hover:underline"
                  >
                    github.com/Flux-ECS-Club
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Email:</span>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-ink font-bold hover:underline"
                  >
                    {EMAIL}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Instagram:</span>
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brick font-bold hover:underline"
                  >
                    @flux.ecs
                  </a>
                </div>
              </div>
            </div>

            {/* Upcoming Event Card */}
            <div className="bg-card border-2 border-ink p-5 shadow-[3px_3px_0px_var(--brick)]">
              <span className="font-label-smallcaps text-[11px] uppercase tracking-wider text-brick font-bold block mb-1">
                Upcoming Flagship
              </span>
              <h4 className="font-headline-sm text-lg text-ink font-bold mb-2">
                Algorithm&apos;s Auction
              </h4>
              <p className="font-body-sm text-xs text-muted mb-4">
                2nd – 3rd November 2026 · 2nd Floor, VESIT. Test your logic, place strategic bids, and solve challenges.
              </p>
              <Link
                href="/events"
                className="inline-flex items-center justify-center w-full py-2 bg-brick text-paper font-label-smallcaps text-xs uppercase tracking-wider font-bold hover:bg-ink transition-colors"
              >
                View Tournament Docket →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-paper border-2 border-ink shadow-[8px_8px_0px_var(--brick)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header bar */}
            <div className="bg-tan border-b-2 border-ink px-4 py-2.5 flex items-center justify-between">
              <div className="font-complexity-notation text-xs text-ink font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-brick inline-block" />
                <span>FLUX-ECS Archival Viewer</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="px-2 py-0.5 border border-ink bg-card text-ink hover:bg-brick hover:text-paper font-complexity-notation text-xs font-bold transition-colors cursor-pointer"
              >
                Close [ESC]
              </button>
            </div>

            {/* Modal image */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] bg-ink/5">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.label}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
            </div>

            {/* Modal caption footer */}
            <div className="bg-paper border-t-2 border-ink p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h5 className="font-headline-sm text-sm sm:text-base text-ink font-bold">
                  {selectedPhoto.label}
                </h5>
                {selectedPhoto.sub && (
                  <p className="font-complexity-notation text-xs text-muted mt-0.5">
                    {selectedPhoto.sub}
                  </p>
                )}
              </div>
              <a
                href={selectedPhoto.src}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start sm:self-auto px-3 py-1.5 bg-card border border-ink text-ink hover:bg-brick hover:text-paper font-complexity-notation text-xs font-bold transition-colors shrink-0"
              >
                Open Original ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
