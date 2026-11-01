import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Reveal from '@/components/Reveal'
import { getBlogBySlug, getAllBlogs } from '@/lib/blogs-store'
import BlogDetailClient from '@/components/blog/BlogDetailClient'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) return { title: 'Guide Not Found | FluxECS' }
  return {
    title: `${blog.title} | FluxECS Guides`,
    description: blog.summary || 'Technical guide from FluxECS Council at VESIT.',
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)
  if (!blog) notFound()

  const allBlogs = await getAllBlogs({ includeDrafts: false })
  const related = allBlogs.filter(b => b.slug !== slug && b.category === blog.category).slice(0, 3)

  return (
    <Reveal>
      <div className="flex flex-col w-full bg-transparent text-[#EFF0F2] min-h-screen">
        {/* ── Article Header ─────────────────────────────────────────── */}
        <header className="w-full px-6 lg:px-12 pt-36 lg:pt-40 pb-12 border-b border-white/10 bg-gradient-to-b from-[#12161C] to-[#0D1014] relative overflow-hidden">
          <div className="max-w-4xl mx-auto flex flex-col space-y-6 relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#9EA6AF] hover:text-white transition-colors uppercase tracking-wider"
              >
                <span>←</span>
                <span>All Guides</span>
              </Link>
              <span className="text-[#656D7A]">/</span>
              <span className="px-2.5 py-0.5 rounded bg-[#D94A5B] text-white text-[11px] font-mono uppercase font-semibold">
                {blog.category}
              </span>
              <span className="text-xs font-mono text-[#9EA6AF]">{blog.readTime}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white leading-tight">
              {blog.title}
            </h1>

            <p className="text-base sm:text-lg text-[#9EA6AF] leading-relaxed font-body">
              {blog.summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono text-[#9EA6AF]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#1B2026] border border-white/15 flex items-center justify-center font-bold text-white text-[11px]">
                  {blog.author?.name ? blog.author.name.slice(0, 2).toUpperCase() : 'FX'}
                </div>
                <div>
                  <span className="text-white font-semibold">{blog.author?.name}</span>
                  <span className="text-[#656D7A] ml-1.5">· {blog.author?.role}</span>
                </div>
              </div>

              <span>
                Published on {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        </header>

        {/* ── Article Content with Client Interactive Code & Attachments ── */}
        <div className="w-full px-6 lg:px-12 py-12 max-w-4xl mx-auto">
          {blog.coverImage && (
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/15 mb-12 shadow-2xl bg-[#0D1014]">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}

          <BlogDetailClient content={blog.content} attachments={blog.attachments} tags={blog.tags} />

          {/* ── Related Guides ────────────────────────────────────────── */}
          {related.length > 0 && (
            <div className="mt-20 pt-12 border-t border-white/10">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-[#D94A5B] uppercase tracking-wider font-semibold">
                  RELATED TRANSMISSIONS
                </span>
                <Link href="/blog" className="text-xs font-mono text-[#9EA6AF] hover:text-white transition-colors">
                  View library →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map(item => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    className="p-4 rounded-lg border border-white/10 bg-[#141920] hover:border-[#D94A5B]/40 hover:bg-[#181E26] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[#9EA6AF] uppercase">{item.category}</span>
                      <h4 className="font-display text-base font-bold text-white uppercase mt-1 leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-[#D94A5B] mt-4 flex items-center gap-1">
                      <span>Read guide</span>
                      <span>→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}
