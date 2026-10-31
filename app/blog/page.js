import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import BlogNewsletterForm from '@/components/BlogNewsletterForm'
import { posts } from '@/data/posts'
import { GITHUB, EMAIL, INSTAGRAM } from '@/data/site'

export const metadata = {
  title: 'Blog',
  description:
    'News, event write-ups and build logs from the FLUX-ECS club at VESIT.',
}

export default function BlogPage() {
  const post = posts[0] // IoTA Archives

  return (
    <Reveal>
      <div className="flex flex-col w-full">
        {/* Page header */}
        <header className="w-full bg-paper px-4 lg:px-margin pt-10 pb-8 border-b-2 border-ink">
          <div className="w-full max-w-7xl mx-auto">
            <span className="block font-label-smallcaps text-label-smallcaps text-brick tracking-[0.15em] uppercase mb-2 font-bold">
              FLUX-ECS · Dept. of Electronics & Computer Science, VESIT
            </span>
            <h1 className="font-display-hero text-display-hero text-ink uppercase tracking-tight leading-none font-bold">
              Updates &amp; Stories
            </h1>
            <p className="font-title-editorial text-title-editorial italic text-muted mt-2 max-w-2xl">
              Event write-ups, build logs and news from the club
            </p>
            <div className="w-full border-t border-ink/20 mt-6" />
          </div>
        </header>

        {/* Content grid */}
        <div className="w-full px-4 lg:px-margin py-8">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main article */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              <article className="bg-card border-2 border-ink p-6 lg:p-8 shadow-[4px_4px_0px_var(--brick)] relative overflow-hidden">
                {/* Article meta */}
                <div className="flex flex-wrap items-center gap-2 mb-4 font-complexity-notation text-xs text-muted">
                  <span className="px-2 py-0.5 bg-brick text-paper font-bold uppercase">
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

                {/* Cover photo */}
                <div className="w-full h-80 relative border border-ink/30 overflow-hidden bg-tan mb-8">
                  <Image
                    src={post.coverPhoto}
                    alt={`${post.title} cover photo`}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-ink/80 text-paper p-3 font-complexity-notation text-xs flex justify-between items-center">
                    <span>IoTA Archives — induction exhibition</span>
                    <span>Labs 201, 203 &amp; 215 · VESIT</span>
                  </div>
                </div>

                {/* Sections */}
                <div className="space-y-8">
                  {post.sections.map((sec) => (
                    <div key={sec.id} className="border-t border-ink/20 pt-6">
                      <h3 className="font-headline-sm text-headline-sm text-ink font-bold mb-3">
                        {sec.heading}
                      </h3>
                      <p className="font-body-md text-body-md text-ink leading-relaxed mb-4">
                        {sec.body}
                      </p>

                      <div className="bg-paper border border-ink/20 p-4 mt-3">
                        <span className="font-label-smallcaps text-[11px] uppercase tracking-wider text-brick font-bold block mb-2">
                          Projects shown:
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
                <div className="mt-8 pt-6 border-t border-ink/20">
                  <h4 className="font-label-smallcaps text-label-smallcaps uppercase tracking-wider text-ink font-bold mb-4">
                    Photos from the event
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {post.gallery.map((img) => (
                      <div key={img.src}>
                        <div className="w-full relative overflow-hidden bg-tan border border-ink/20" style={{ paddingBottom: '75%' }}>
                          <Image
                            src={img.src}
                            alt={img.label}
                            fill
                            className="object-cover object-center"
                          />
                        </div>
                        <span className="font-complexity-notation text-xs text-ink block mt-1 text-center">
                          {img.label}
                        </span>
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
              <div className="border border-ink/20 bg-paper p-6">
                <h3 className="font-headline-sm text-headline-sm text-ink font-bold mb-3">
                  About this page
                </h3>
                <p className="font-body-sm text-body-sm text-muted mb-4 leading-relaxed">
                  This is where we write up our events, share photos and log what happened. More posts coming after Algorithm&apos;s Auction.
                </p>
                <div className="pt-3 border-t border-ink/20 space-y-2 font-complexity-notation text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted">GitHub:</span>
                    <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="text-brick font-bold hover:underline">
                      github.com/Flux-ECS-Club
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Email:</span>
                    <a href={`mailto:${EMAIL}`} className="text-ink font-bold hover:underline">
                      {EMAIL}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Instagram:</span>
                    <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-brick font-bold hover:underline">
                      @flux.ecs
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-tan border border-ink/20 p-4">
                <span className="font-label-smallcaps text-label-smallcaps uppercase text-ink font-bold block mb-2">
                  More pages
                </span>
                <div className="space-y-1.5 font-label-smallcaps text-xs">
                  <Link href="/events" className="block text-ink hover:text-brick font-bold">
                    → Upcoming: Algorithm&apos;s Auction
                  </Link>
                  <Link href="/about" className="block text-ink hover:text-brick font-bold">
                    → Who we are
                  </Link>
                  <Link href="/contact" className="block text-ink hover:text-brick font-bold">
                    → Say hi
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
