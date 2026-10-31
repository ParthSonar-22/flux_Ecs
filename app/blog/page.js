import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import BlogNewsletterForm from '@/components/BlogNewsletterForm'
import { posts } from '@/data/posts'
import { GITHUB, EMAIL } from '@/data/site'

export const metadata = {
  title: 'The Flux Dispatch',
  description:
    'Department News, Build Logs & Event Bulletins from the Department of Electronics & Computer Science, VESIT.',
}

export default function BlogPage() {
  const post = posts[0] // IoTA Archives

  return (
    <Reveal>
      <div className="flex flex-col w-full">
        {/* BROADSHEET TICKER / DISPATCH REGISTRY STRIP */}
        <section className="w-full bg-tan text-ink px-4 lg:px-margin py-2 border-b-2 border-ink">
          <div className="flex flex-wrap items-center justify-between gap-3 text-complexity-notation font-complexity-notation text-xs">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-ink bg-brick text-paper font-bold">
                <span className="material-symbols-outlined text-[14px]">sensors</span>
                <span>LIVE TELETYPE</span>
              </span>
              <span className="truncate font-semibold">
                EDITION 01 &bull; REGISTER DISPATCH FOR DEPT. OF ECS // VESIT CHEMBUR
              </span>
            </div>
            <div className="flex items-center gap-4 font-bold">
              <span>ACAD. YEAR 2026</span>
              <span className="hidden md:inline">&bull;</span>
              <span className="px-2 py-0.5 border border-ink bg-paper text-ink font-bold">
                O(1) ARCHIVE
              </span>
            </div>
          </div>
        </section>

        {/* BROADSHEET MASTHEAD */}
        <header className="w-full bg-paper px-4 lg:px-margin pt-10 pb-8 border-b-2 border-ink">
          <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center">
            {/* Upper Metadata Dateline */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2 pb-4 mb-4 text-complexity-notation font-complexity-notation text-muted">
              <div className="flex items-center gap-2">
                <span>VOL. I &bull; ISSUE 01</span>
                <span>&bull;</span>
                <span>MUMBAI METROPOLITAN CHARTER</span>
              </div>
              <div className="px-3 py-1 border border-ink bg-card text-brick font-bold tracking-widest uppercase">
                Department of Electronics &amp; Computer Science &bull; VESIT
              </div>
              <div className="flex items-center gap-2">
                <span>ACADEMIC YEAR 2026</span>
                <span>&bull;</span>
                <span>CIRCULATION: EXCLUSIVE</span>
              </div>
            </div>

            {/* Broadsheet Main Title */}
            <div className="py-2">
              <span className="block font-label-smallcaps text-label-smallcaps text-brick tracking-[0.25em] uppercase mb-1 font-bold">
                The Official Gazette of the ECS Guild
              </span>
              <h1 className="font-display-hero text-display-hero text-ink uppercase tracking-tight leading-none drop-shadow-sm font-bold">
                The Flux Dispatch
              </h1>
              <p className="font-title-editorial text-title-editorial italic text-muted mt-2 max-w-2xl mx-auto">
                &ldquo;Where Ideas Flow into Innovation&rdquo; &mdash; Department News, Build Logs &amp; Event Bulletins
              </p>
            </div>

            {/* Masthead Triple Rule Divider Accent */}
            <div className="w-full flex items-center justify-center gap-4 my-6">
              <div className="h-0.5 flex-1 bg-ink opacity-30"></div>
              <span className="font-complexity-notation text-brick px-3 py-1 border border-ink bg-card font-bold">
                &sect; EST. 2026 &sect;
              </span>
              <div className="h-0.5 flex-1 bg-ink opacity-30"></div>
            </div>
          </div>
        </header>

        {/* EDITORIAL GRID CONTENT */}
        <div className="w-full px-4 lg:px-margin py-8">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT + CENTER COLUMN: LEAD STORY & POSTS (8 COLS) */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              <article className="bg-card border-2 border-ink rounded-xl p-6 lg:p-8 shadow-[6px_6px_0px_var(--brick)] relative overflow-hidden">
                {/* Top classification */}
                <div className="flex items-center justify-between mb-4 border-b-2 border-ink pb-3">
                  <div className="flex items-center gap-3 font-complexity-notation text-xs text-muted">
                    <span className="px-2 py-0.5 bg-brick text-paper font-bold uppercase">
                      {post.category}
                    </span>
                    <span>PUBLISHED: {post.date.toUpperCase()}</span>
                    <span>&bull;</span>
                    <span className="text-ink font-bold">{post.location}</span>
                  </div>
                </div>

                <h2 className="font-headline-lg text-headline-lg text-ink leading-tight tracking-tight mb-4 font-bold">
                  {post.title}: {post.subtitle}
                </h2>

                <p className="font-body-lg text-body-lg text-ink mb-6 leading-relaxed">
                  {post.intro}
                </p>

                {/* Featured Cover Image */}
                <div className="w-full h-80 relative border-2 border-ink overflow-hidden bg-tan mb-8 shadow-[4px_4px_0px_var(--ink)]">
                  <Image
                    src={post.coverPhoto}
                    alt={`${post.title} Cover`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-ink/85 text-paper p-3 text-complexity-notation text-xs flex justify-between items-center">
                    <span>FIG 1.0: INDUCTION PROCEEDINGS EXHIBITION</span>
                    <span>LABS 201, 203 &amp; 215 &bull; VESIT</span>
                  </div>
                </div>

                {/* Markdown Sections rendered verbatim */}
                <div className="space-y-8">
                  {post.sections.map((sec) => (
                    <div
                      key={sec.id}
                      className="border-2 border-ink bg-paper p-6 shadow-[4px_4px_0px_var(--ink)]"
                    >
                      <h3 className="font-headline-sm text-headline-sm text-ink font-bold mb-3 border-b border-ink pb-2">
                        {sec.heading}
                      </h3>
                      <p className="font-body-md text-body-md text-ink leading-relaxed mb-4">
                        {sec.body}
                      </p>

                      <div className="bg-card border border-ink p-4 mt-3">
                        <span className="font-label-smallcaps text-[11px] uppercase tracking-wider text-brick font-bold block mb-2">
                          Demonstrated Projects &amp; Hardware:
                        </span>
                        <ul className="space-y-1.5 font-body-sm text-body-sm text-ink">
                          {sec.projects.map((proj) => (
                            <li key={proj} className="flex items-start gap-2">
                              <span className="font-complexity-notation text-brick text-xs mt-0.5 font-bold">
                                &bull;
                              </span>
                              <span>{proj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gallery Plates */}
                <div className="mt-8 pt-6 border-t-2 border-ink">
                  <h4 className="font-label-smallcaps text-label-smallcaps uppercase tracking-wider text-ink font-bold mb-4">
                    Exhibition Folio Plates
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {post.gallery.map((img) => (
                      <div
                        key={img.src}
                        className="border-2 border-ink bg-paper p-2 shadow-[2px_2px_0px_var(--ink)]"
                      >
                        <div className="w-full h-44 relative border border-ink overflow-hidden bg-tan">
                          <Image
                            src={img.src}
                            alt={img.label}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-complexity-notation text-xs font-bold text-ink block mt-2 text-center">
                          {img.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </div>

            {/* RIGHT SIDEBAR: SUBSCRIPTION & ARCHIVE CONSOLE (4 COLS) */}
            <aside className="lg:col-span-4 flex flex-col gap-8">
              {/* Newsletter subscription widget */}
              <BlogNewsletterForm />

              {/* Departmental Reference Card */}
              <div className="border-2 border-ink bg-paper p-6 shadow-[4px_4px_0px_var(--ink)]">
                <div className="flex items-center justify-between border-b-2 border-ink pb-2 mb-4">
                  <span className="font-label-smallcaps text-label-smallcaps uppercase text-ink font-bold">
                    Council Dispatches
                  </span>
                  <span className="font-complexity-notation text-xs text-brick font-bold">
                    VOL. 2026
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-muted mb-4 leading-relaxed">
                  The FLUX-ECS Dispatch records proceedings, build logs, and tournament retrospectives for students of the Department of Electronics &amp; Computer Science, VESIT.
                </p>
                <div className="pt-3 border-t border-ink/30 space-y-2 font-complexity-notation text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Repository:</span>
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
                    <span className="text-muted">Inquiries:</span>
                    <a href={`mailto:${EMAIL}`} className="text-ink font-bold hover:underline">
                      {EMAIL}
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links Card */}
              <div className="border-2 border-ink bg-tan p-4 shadow-[4px_4px_0px_var(--ink)]">
                <span className="font-label-smallcaps text-label-smallcaps uppercase text-ink font-bold block mb-2">
                  Navigation Registry
                </span>
                <div className="space-y-1.5 font-label-smallcaps text-xs">
                  <Link
                    href="/events"
                    className="block text-ink hover:text-brick underline decoration-ink font-bold"
                  >
                    &rarr; View Upcoming Algorithm&apos;s Auction
                  </Link>
                  <Link
                    href="/about"
                    className="block text-ink hover:text-brick underline decoration-ink font-bold"
                  >
                    &rarr; Council Members &amp; Faculty Leadership
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-ink hover:text-brick underline decoration-ink font-bold"
                  >
                    &rarr; Contact the Department Secretariat
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
