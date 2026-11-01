'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const AVAILABLE_IMAGES = [
  '/photos/iota-electrical-lab-discussion.png',
  '/photos/iota-lab201-brawlboard.png',
  '/photos/iota-lab201-crowd.jpg',
  '/photos/iota-lab201-group.jpg',
  '/photos/iota-lab201-robot-demo.jpg',
  '/photos/iota-lab201-robot-floor.jpg',
  '/photos/iota-robot-floor-test.jpg',
  '/photos/iota-robotics-chassis-presentation.jpg',
  '/photos/iota-tinkerers-lab-cohort.jpg',
  '/backgrounds/midnight-velocity.png',
  '/backgrounds/paddock.jpg',
  '/backgrounds/circuit.jpg',
  '/backgrounds/circuit-aerial.jpg',
  '/backgrounds/blueprint.png',
]

export default function EditPanel() {
  const [content, setContent] = useState(null)
  const [activeTab, setActiveTab] = useState('hero')
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')

  // Live Preview Settings
  const [showLivePreview, setShowLivePreview] = useState(true)
  const [previewPath, setPreviewPath] = useState('/')
  const [previewDevice, setPreviewDevice] = useState('desktop') // 'desktop' | 'tablet' | 'mobile'

  // Blog Manager State
  const [blogs, setBlogs] = useState([])
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [blogSaving, setBlogSaving] = useState(false)

  // Resource Manager State
  const [resources, setResources] = useState([])
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    category: 'Embedded',
    type: 'PDF',
    url: '',
    size: '1.5 MB',
    author: 'FluxECS Council',
  })

  // Load site content
  useEffect(() => {
    fetch('/api/admin/content')
      .then(res => res.json())
      .then(json => {
        if (json.ok && json.data) setContent(json.data)
      })
      .catch(err => console.error('Failed to load content:', err))
  }, [])

  // Load blogs
  const refreshBlogs = () => {
    fetch('/api/blogs?includeDrafts=true')
      .then(res => res.json())
      .then(json => {
        if (json.ok && json.blogs) setBlogs(json.blogs)
      })
      .catch(err => console.error('Failed to load blogs:', err))
  }
  useEffect(() => {
    refreshBlogs()
  }, [])

  // Load resources
  const refreshResources = () => {
    fetch('/api/resources')
      .then(res => res.json())
      .then(json => {
        if (json.ok && json.resources) setResources(json.resources)
      })
      .catch(err => console.error('Failed to load resources:', err))
  }
  useEffect(() => {
    refreshResources()
  }, [])

  async function handleSave() {
    if (!content) return
    setSaving(true)
    setStatusMsg('')
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      const json = await res.json()
      if (json.ok) {
        setStatusMsg('✓ All content saved to live website!')
        setTimeout(() => setStatusMsg(''), 4000)
      } else {
        setStatusMsg(`❌ Error: ${json.error || 'Failed to save'}`)
      }
    } catch (err) {
      setStatusMsg(`❌ Network error: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  // Hero Slides Helpers
  function updateSlide(index, key, value) {
    if (!content || !content.heroSlides) return
    const updated = [...content.heroSlides]
    updated[index] = { ...updated[index], [key]: value }
    setContent({ ...content, heroSlides: updated })
  }

  function moveSlide(index, dir) {
    if (!content || !content.heroSlides) return
    const target = index + dir
    if (target < 0 || target >= content.heroSlides.length) return
    const updated = [...content.heroSlides]
    const temp = updated[index]
    updated[index] = updated[target]
    updated[target] = temp
    setContent({ ...content, heroSlides: updated })
  }

  function addSlide() {
    if (!content) return
    const newSlide = {
      id: `slide-${Date.now()}`,
      src: AVAILABLE_IMAGES[0],
      alt: 'FluxECS activity image',
      title: 'New Slideshow Frame',
      caption: 'Add description here',
      enabled: true,
    }
    setContent({
      ...content,
      heroSlides: [...(content.heroSlides || []), newSlide],
    })
  }

  function deleteSlide(index) {
    if (!content || !content.heroSlides) return
    const updated = content.heroSlides.filter((_, i) => i !== index)
    setContent({ ...content, heroSlides: updated })
  }

  // Blog Save Handler
  async function handleSaveBlog(e) {
    e.preventDefault()
    if (!selectedBlog || !selectedBlog.title) return
    setBlogSaving(true)
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedBlog),
      })
      const json = await res.json()
      if (json.ok) {
        setStatusMsg(`✓ Guide "${selectedBlog.title}" published & saved!`)
        setTimeout(() => setStatusMsg(''), 4000)
        refreshBlogs()
        setSelectedBlog(null)
      } else {
        alert(json.error || 'Failed to save blog')
      }
    } catch (err) {
      alert(`Error saving guide: ${err.message}`)
    } finally {
      setBlogSaving(false)
    }
  }

  // Blog Delete Handler
  async function handleDeleteBlog(slug) {
    if (!confirm('Are you sure you want to delete this guide?')) return
    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.ok) {
        refreshBlogs()
        if (selectedBlog?.slug === slug) setSelectedBlog(null)
      }
    } catch (err) {
      alert(`Failed to delete: ${err.message}`)
    }
  }

  // Resource Save Handler
  async function handleAddResource(e) {
    e.preventDefault()
    if (!newResource.title) return
    try {
      const res = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newResource),
      })
      const json = await res.json()
      if (json.ok) {
        refreshResources()
        setNewResource({
          title: '',
          description: '',
          category: 'Embedded',
          type: 'PDF',
          url: '',
          size: '1.5 MB',
          author: 'FluxECS Council',
        })
        setStatusMsg('✓ Resource added to library!')
        setTimeout(() => setStatusMsg(''), 3000)
      }
    } catch (err) {
      alert(`Failed to add resource: ${err.message}`)
    }
  }

  async function handleDeleteResource(id) {
    if (!confirm('Delete this resource item?')) return
    try {
      const res = await fetch(`/api/resources?id=${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.ok) refreshResources()
    } catch (err) {
      alert(`Failed to delete: ${err.message}`)
    }
  }

  if (!content) {
    return (
      <div className="p-12 text-center text-gray-400 font-mono text-sm">
        Loading site content editor...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* ── Top Action Toolbar ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#171C23] border border-white/10 rounded-xl">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D94A5B] animate-pulse" />
          <div>
            <h2 className="text-lg font-bold text-white font-display uppercase tracking-tight">
              Website CMS &amp; Live Preview
            </h2>
            <p className="text-xs text-[#9EA6AF] font-mono">
              Live edit hero slideshow, pages, blogs, resources, and social metadata
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`px-3 py-1.5 border rounded text-xs font-mono transition-all ${
              showLivePreview
                ? 'bg-[#D94A5B]/20 border-[#D94A5B] text-white'
                : 'border-white/15 bg-white/5 text-[#9EA6AF] hover:text-white'
            }`}
          >
            {showLivePreview ? 'Live Preview: ON 👁️' : 'Live Preview: OFF 👁️'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-[#D94A5B] hover:bg-[#e45a6b] text-white rounded text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(217,74,91,0.3)] disabled:opacity-50"
          >
            {saving ? 'Publishing…' : 'Publish Changes →'}
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-emerald-400 font-mono text-xs text-center animate-fade-in">
          {statusMsg}
        </div>
      )}

      {/* ── Split Screen: Form Editor (Left) & Real Live Preview (Right) ─ */}
      <div className={`grid grid-cols-1 ${showLivePreview ? 'lg:grid-cols-12 gap-6' : ''}`}>
        {/* Left Form / Tabs Column */}
        <div className={`${showLivePreview ? 'lg:col-span-7' : 'w-full'} space-y-6`}>
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#12161C] border border-white/10 rounded-lg">
            {[
              ['slides', 'Hero Slideshow 🎞️'],
              ['hero', 'Hero Text 🏎️'],
              ['council', 'The Council 👥'],
              ['about', 'About Page 📜'],
              ['blogs', 'Blogs & Guides ✍️'],
              ['resources', 'Resources 📦'],
              ['socials', 'Socials & Settings ⚙️'],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all ${
                  activeTab === key
                    ? 'bg-[#D94A5B] text-white font-bold shadow-md'
                    : 'text-[#9EA6AF] hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ── TAB 1: Hero Slideshow Manager ───────────────────────────── */}
          {activeTab === 'slides' && (
            <div className="p-6 bg-[#171C23] border border-white/10 rounded-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white font-display uppercase tracking-wider">
                    Hero Slideshow Frames
                  </h3>
                  <p className="text-xs text-[#9EA6AF]">
                    All active slideshow images. Upload or replace URLs, reorder, and adjust titles.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addSlide}
                  className="px-3 py-1.5 rounded bg-[#1B2026] hover:bg-[#252C35] border border-white/15 text-xs font-mono text-white"
                >
                  + Add Slide
                </button>
              </div>

              <div className="space-y-4">
                {(content.heroSlides || []).map((slide, i) => (
                  <div
                    key={slide.id || i}
                    className="p-4 rounded-lg border border-white/10 bg-[#12161C] flex flex-col md:flex-row gap-4 items-start md:items-center"
                  >
                    {/* Visual Thumbnail */}
                    <div className="relative w-28 h-20 rounded bg-[#0D1014] overflow-hidden border border-white/15 flex-shrink-0">
                      <Image
                        src={slide.src}
                        alt={slide.alt || 'Slide image'}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.5 rounded text-[9px] font-mono text-white">
                        #{i + 1}
                      </span>
                    </div>

                    {/* Metadata Fields */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#656D7A] mb-1">
                          Slide Title
                        </label>
                        <input
                          type="text"
                          value={slide.title || ''}
                          onChange={e => updateSlide(i, 'title', e.target.value)}
                          className="w-full bg-[#171C23] border border-white/10 rounded px-2.5 py-1 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase text-[#656D7A] mb-1">
                          Image Source URL
                        </label>
                        <select
                          value={slide.src}
                          onChange={e => updateSlide(i, 'src', e.target.value)}
                          className="w-full bg-[#171C23] border border-white/10 rounded px-2 py-1 text-xs text-white"
                        >
                          {AVAILABLE_IMAGES.map(img => (
                            <option key={img} value={img}>
                              {img.split('/').pop()}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-mono uppercase text-[#656D7A] mb-1">
                          Slide Caption
                        </label>
                        <input
                          type="text"
                          value={slide.caption || ''}
                          onChange={e => updateSlide(i, 'caption', e.target.value)}
                          className="w-full bg-[#171C23] border border-white/10 rounded px-2.5 py-1 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-1.5 self-center">
                      <button
                        type="button"
                        onClick={() => moveSlide(i, -1)}
                        disabled={i === 0}
                        title="Move Up"
                        className="p-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 text-xs text-white"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveSlide(i, 1)}
                        disabled={i === (content.heroSlides?.length || 0) - 1}
                        title="Move Down"
                        className="p-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 text-xs text-white"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => updateSlide(i, 'enabled', !slide.enabled)}
                        className={`px-2 py-1 rounded text-[10px] font-mono uppercase font-bold ${
                          slide.enabled !== false
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                            : 'bg-red-950/60 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {slide.enabled !== false ? 'Active' : 'Hidden'}
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteSlide(i)}
                        className="p-1.5 rounded bg-red-950/40 text-red-400 hover:bg-red-900/60 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 2: Hero Text Editor ─────────────────────────────────── */}
          {activeTab === 'hero' && (
            <div className="p-6 bg-[#171C23] border border-white/10 rounded-xl space-y-4">
              <h3 className="text-base font-bold text-white font-display uppercase tracking-wider border-b border-white/10 pb-3">
                Homepage Hero Copy &amp; Buttons
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Overline Department
                  </label>
                  <input
                    type="text"
                    value={content.hero?.overlineDept || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, overlineDept: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Overline School / Location
                  </label>
                  <input
                    type="text"
                    value={content.hero?.overlineSchool || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, overlineSchool: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Headline Line 1
                  </label>
                  <input
                    type="text"
                    value={content.hero?.headlineLine1 || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, headlineLine1: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Headline Line 2
                  </label>
                  <input
                    type="text"
                    value={content.hero?.headlineLine2 || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, headlineLine2: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Supporting Lead Paragraph
                  </label>
                  <textarea
                    rows={2}
                    value={content.hero?.lead || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, lead: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Primary CTA Label
                  </label>
                  <input
                    type="text"
                    value={content.hero?.primaryCtaText || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, primaryCtaText: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Secondary CTA Label
                  </label>
                  <input
                    type="text"
                    value={content.hero?.secondaryCtaText || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, secondaryCtaText: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 3: The Council Section ──────────────────────────────── */}
          {activeTab === 'council' && (
            <div className="p-6 bg-[#171C23] border border-white/10 rounded-xl space-y-4">
              <h3 className="text-base font-bold text-white font-display uppercase tracking-wider border-b border-white/10 pb-3">
                Homepage Full Council Cohort Feature
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Section Eyebrow
                  </label>
                  <input
                    type="text"
                    value={content.councilSection?.eyebrow || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        councilSection: { ...content.councilSection, eyebrow: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Headline
                  </label>
                  <input
                    type="text"
                    value={content.councilSection?.heading || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        councilSection: { ...content.councilSection, heading: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Lead Editorial Narrative
                  </label>
                  <textarea
                    rows={3}
                    value={content.councilSection?.lead || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        councilSection: { ...content.councilSection, lead: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Full Cohort Photo Source
                  </label>
                  <select
                    value={content.councilSection?.image || '/photos/iota-tinkerers-lab-cohort.jpg'}
                    onChange={e =>
                      setContent({
                        ...content,
                        councilSection: { ...content.councilSection, image: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  >
                    {AVAILABLE_IMAGES.map(img => (
                      <option key={img} value={img}>
                        {img}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 4: About Page Text ──────────────────────────────────── */}
          {activeTab === 'about' && (
            <div className="p-6 bg-[#171C23] border border-white/10 rounded-xl space-y-4">
              <h3 className="text-base font-bold text-white font-display uppercase tracking-wider border-b border-white/10 pb-3">
                About Page Header Copy
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Header Badge
                  </label>
                  <input
                    type="text"
                    value={content.aboutPage?.badge || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        aboutPage: { ...content.aboutPage, badge: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Distinct About Headline
                  </label>
                  <input
                    type="text"
                    value={content.aboutPage?.headline || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        aboutPage: { ...content.aboutPage, headline: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Mission / Overview Text
                  </label>
                  <textarea
                    rows={4}
                    value={content.aboutPage?.introParagraph || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        aboutPage: { ...content.aboutPage, introParagraph: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 5: Blogs & Guides Manager ───────────────────────────── */}
          {activeTab === 'blogs' && (
            <div className="p-6 bg-[#171C23] border border-white/10 rounded-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white font-display uppercase tracking-wider">
                    Published Guides &amp; Tutorials
                  </h3>
                  <p className="text-xs text-[#9EA6AF]">
                    Create technical writeups with code snippets, attachments and auto-newsletter dispatch
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedBlog({
                      id: `blog-${Date.now()}`,
                      title: '',
                      slug: '',
                      category: 'Embedded',
                      summary: '',
                      readTime: '6 min read',
                      tags: ['Embedded', 'Prototyping'],
                      author: { name: 'Aarya Tanwade', role: 'Super Admin · FluxECS' },
                      status: 'published',
                      coverImage: '/photos/iota-electrical-lab-discussion.png',
                      content: '### Guide Title\n\nWrite your guide documentation here.\n\n```c\n// Code snippet\nvoid setup() {}\n```\n',
                      attachments: [],
                    })
                  }
                  className="px-3 py-1.5 rounded bg-[#D94A5B] hover:bg-[#e45a6b] text-white text-xs font-mono uppercase font-bold"
                >
                  + New Guide
                </button>
              </div>

              {selectedBlog ? (
                <form onSubmit={handleSaveBlog} className="space-y-4 p-4 rounded-lg border border-white/15 bg-[#12161C]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-mono text-xs text-[#D94A5B] uppercase font-bold">
                      {selectedBlog.id ? 'Editing Guide' : 'New Guide'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedBlog(null)}
                      className="text-xs text-[#9EA6AF] hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#656D7A] mb-1">
                        Guide Title
                      </label>
                      <input
                        type="text"
                        required
                        value={selectedBlog.title || ''}
                        onChange={e => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
                        className="w-full bg-[#171C23] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#656D7A] mb-1">
                        Category
                      </label>
                      <select
                        value={selectedBlog.category || 'Embedded'}
                        onChange={e => setSelectedBlog({ ...selectedBlog, category: e.target.value })}
                        className="w-full bg-[#171C23] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                      >
                        {['Embedded', 'Robotics', 'DSA', 'Hardware', 'Web', 'Tools'].map(c => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-mono uppercase text-[#656D7A] mb-1">
                        Summary
                      </label>
                      <textarea
                        rows={2}
                        value={selectedBlog.summary || ''}
                        onChange={e => setSelectedBlog({ ...selectedBlog, summary: e.target.value })}
                        className="w-full bg-[#171C23] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#656D7A] mb-1">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={selectedBlog.author?.name || ''}
                        onChange={e =>
                          setSelectedBlog({
                            ...selectedBlog,
                            author: { ...selectedBlog.author, name: e.target.value },
                          })
                        }
                        className="w-full bg-[#171C23] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#656D7A] mb-1">
                        Status
                      </label>
                      <select
                        value={selectedBlog.status || 'published'}
                        onChange={e => setSelectedBlog({ ...selectedBlog, status: e.target.value })}
                        className="w-full bg-[#171C23] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                      >
                        <option value="published">Published (Send email)</option>
                        <option value="draft">Draft (Private)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-mono uppercase text-[#656D7A] mb-1">
                        Markdown Content (Supports code snippets, callouts)
                      </label>
                      <textarea
                        rows={8}
                        value={selectedBlog.content || ''}
                        onChange={e => setSelectedBlog({ ...selectedBlog, content: e.target.value })}
                        className="w-full font-mono bg-[#0D1014] border border-white/10 rounded p-3 text-xs text-[#EFF0F2]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBlog(null)}
                      className="px-3 py-1.5 rounded bg-white/5 text-xs text-[#9EA6AF]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={blogSaving}
                      className="px-5 py-1.5 rounded bg-[#D94A5B] hover:bg-[#e45a6b] text-white text-xs font-mono font-bold uppercase"
                    >
                      {blogSaving ? 'Saving…' : 'Save & Publish Guide →'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  {blogs.map(b => (
                    <div
                      key={b.id}
                      className="p-4 rounded-lg border border-white/10 bg-[#12161C] flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#D94A5B]/15 border border-[#D94A5B]/30 text-[10px] font-mono text-[#D94A5B] font-bold uppercase">
                            {b.category}
                          </span>
                          <span className="text-xs text-[#656D7A] font-mono">
                            {b.status === 'published' ? '● Live' : '○ Draft'}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white font-display uppercase mt-1">
                          {b.title}
                        </h4>
                        <p className="text-xs text-[#9EA6AF] line-clamp-1">{b.summary}</p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedBlog(b)}
                          className="px-3 py-1 rounded bg-[#1B2026] hover:bg-[#252C35] text-xs font-mono text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteBlog(b.slug)}
                          className="px-2 py-1 rounded bg-red-950/40 text-red-400 hover:bg-red-900/60 text-xs font-mono"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TAB 6: Resources Manager ─────────────────────────────────── */}
          {activeTab === 'resources' && (
            <div className="p-6 bg-[#171C23] border border-white/10 rounded-xl space-y-6">
              <h3 className="text-base font-bold text-white font-display uppercase tracking-wider border-b border-white/10 pb-3">
                Downloadable Resource Library
              </h3>

              {/* Add New Resource Form */}
              <form onSubmit={handleAddResource} className="p-4 rounded-lg border border-white/10 bg-[#12161C] space-y-3">
                <span className="text-xs font-mono uppercase text-[#D94A5B] font-bold block">
                  + Add Document / Link / Schematic
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#656D7A] mb-1">
                      Resource Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. STM32 Pinout Guide"
                      value={newResource.title}
                      onChange={e => setNewResource({ ...newResource, title: e.target.value })}
                      className="w-full bg-[#171C23] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#656D7A] mb-1">
                      Category
                    </label>
                    <select
                      value={newResource.category}
                      onChange={e => setNewResource({ ...newResource, category: e.target.value })}
                      className="w-full bg-[#171C23] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                    >
                      {['Embedded', 'Robotics', 'DSA', 'Hardware', 'General'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#656D7A] mb-1">
                      Format Type
                    </label>
                    <select
                      value={newResource.type}
                      onChange={e => setNewResource({ ...newResource, type: e.target.value })}
                      className="w-full bg-[#171C23] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                    >
                      {['PDF', 'ZIP Archive', 'Repository', 'Cheat Sheet', 'Documentation'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#656D7A] mb-1">
                      Download / Web URL
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="/resources/manual.pdf or https://..."
                      value={newResource.url}
                      onChange={e => setNewResource({ ...newResource, url: e.target.value })}
                      className="w-full bg-[#171C23] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-mono uppercase text-[#656D7A] mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="Brief description of the material..."
                      value={newResource.description}
                      onChange={e => setNewResource({ ...newResource, description: e.target.value })}
                      className="w-full bg-[#171C23] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#D94A5B] hover:bg-[#e45a6b] text-white text-xs font-mono uppercase font-bold"
                >
                  Add Resource Item
                </button>
              </form>

              {/* Existing Resources List */}
              <div className="space-y-3">
                {resources.map(res => (
                  <div
                    key={res.id}
                    className="p-3.5 rounded-lg border border-white/10 bg-[#12161C] flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#D94A5B]/15 text-[10px] font-mono text-[#D94A5B] font-bold uppercase">
                          {res.type}
                        </span>
                        <span className="text-xs text-[#9EA6AF] font-mono">{res.category}</span>
                        <span className="text-xs text-[#656D7A] font-mono">({res.size})</span>
                      </div>
                      <h4 className="text-sm font-bold text-white font-display uppercase mt-1">
                        {res.title}
                      </h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteResource(res.id)}
                      className="px-2 py-1 rounded bg-red-950/40 text-red-400 hover:bg-red-900/60 text-xs font-mono"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TAB 7: Socials & Settings ───────────────────────────────── */}
          {activeTab === 'socials' && (
            <div className="p-6 bg-[#171C23] border border-white/10 rounded-xl space-y-6">
              <h3 className="text-base font-bold text-white font-display uppercase tracking-wider border-b border-white/10 pb-3">
                Social Links &amp; Arcade Settings
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={content.socials?.linkedin || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        socials: { ...content.socials, linkedin: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="text"
                    value={content.socials?.instagram || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        socials: { ...content.socials, instagram: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    Council Email
                  </label>
                  <input
                    type="text"
                    value={content.socials?.email || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        socials: { ...content.socials, email: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#9EA6AF] mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={content.socials?.github || ''}
                    onChange={e =>
                      setContent({
                        ...content,
                        socials: { ...content.socials, github: e.target.value },
                      })
                    }
                    className="w-full bg-[#12161C] border border-white/15 rounded px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="text-xs font-mono uppercase text-[#D94A5B] font-bold block">
                  Flux Grand Prix Arcade Configuration
                </span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-white">
                    <input
                      type="checkbox"
                      checked={content.arcadeConfig?.enabled !== false}
                      onChange={e =>
                        setContent({
                          ...content,
                          arcadeConfig: { ...content.arcadeConfig, enabled: e.target.checked },
                        })
                      }
                      className="rounded accent-[#D94A5B]"
                    />
                    <span>Arcade Game Active On Website</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Right Column: Live Website Preview (Side-by-Side) ───────── */}
        {showLivePreview && (
          <div className="lg:col-span-5 flex flex-col space-y-3 sticky top-24">
            {/* Viewport & Device Controls */}
            <div className="p-3 rounded-lg bg-[#171C23] border border-white/10 flex items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                {[
                  ['desktop', '💻 Desktop (100%)'],
                  ['tablet', '📱 Tablet (768px)'],
                  ['mobile', '📱 Mobile (375px)'],
                ].map(([dev, label]) => (
                  <button
                    key={dev}
                    type="button"
                    onClick={() => setPreviewDevice(dev)}
                    className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                      previewDevice === dev
                        ? 'bg-[#D94A5B] text-white font-bold'
                        : 'text-[#9EA6AF] hover:text-white bg-white/5'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Page Selector */}
              <select
                value={previewPath}
                onChange={e => setPreviewPath(e.target.value)}
                className="bg-[#12161C] border border-white/15 rounded px-2 py-1 text-xs text-white"
              >
                <option value="/">Home (/)</option>
                <option value="/about">About (/about)</option>
                <option value="/blog">Blog (/blog)</option>
                <option value="/resources">Resources (/resources)</option>
                <option value="/events">Events (/events)</option>
                <option value="/arcade">Arcade (/arcade)</option>
                <option value="/contact">Contact (/contact)</option>
              </select>
            </div>

            {/* Iframe Viewport Container */}
            <div className="w-full flex justify-center bg-[#0A0D11] border border-white/15 rounded-xl overflow-hidden p-2 shadow-2xl">
              <div
                style={{
                  width:
                    previewDevice === 'mobile'
                      ? '375px'
                      : previewDevice === 'tablet'
                      ? '768px'
                      : '100%',
                  height: '750px',
                  transition: 'width 0.3s ease',
                }}
                className="bg-[#0D1014] rounded-lg overflow-hidden border border-white/10 relative"
              >
                <iframe
                  src={previewPath}
                  title="Live Website Preview"
                  className="w-full h-full border-0 select-none"
                />
              </div>
            </div>
            <p className="text-[10px] font-mono text-[#656D7A] text-center">
              Real-time browser preview rendered from live Next.js App Router
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
