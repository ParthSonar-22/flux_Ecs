'use client'

import { useState, useEffect, useCallback } from 'react'
import authService from '@/services/auth'
import api from '@/services/api'
import SmartImage from './SmartImage'

export default function AdminDashboard({ initialMessages = [], initialSubscribers = [] }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminUser, setAdminUser] = useState(null)
  const [activeTab, setActiveTab] = useState('events') // events | posts | members | gallery | submissions
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authLoading, setAuthLoading] = useState(false)

  // Data collections
  const [events, setEvents] = useState([])
  const [posts, setPosts] = useState([])
  const [members, setMembers] = useState([])
  const [gallery, setGallery] = useState([])
  const [messages, setMessages] = useState(initialMessages)
  const [subscribers, setSubscribers] = useState(initialSubscribers)
  const [loadingData, setLoadingData] = useState(false)

  // Toast feedback state
  const [toast, setToast] = useState(null) // { message, type: 'success' | 'error' }

  // Modal states
  const [modalType, setModalType] = useState(null) // 'event' | 'post' | 'member' | 'gallery' | null
  const [editingItem, setEditingItem] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null) // { type, id, title }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const loadAllData = useCallback(async () => {
    setLoadingData(true)
    try {
      const [evts, psts, mmbrs, gllry] = await Promise.all([
        api.events.getAll().catch(() => []),
        api.posts.getAll().catch(() => []),
        api.members.getAll().catch(() => []),
        api.gallery.getAll().catch(() => []),
      ])
      setEvents(evts)
      setPosts(psts)
      setMembers(mmbrs)
      setGallery(gllry)
    } catch (err) {
      showToast('Could not load all backend datasets', 'error')
    } finally {
      setLoadingData(false)
    }
  }, [])

  // Check initial authentication asynchronously
  useEffect(() => {
    let active = true
    Promise.resolve().then(() => {
      if (!active) return
      const authed = authService.isAuthenticated()
      if (authed) {
        setIsAuthenticated(true)
        setAdminUser(authService.getUser())
        loadAllData()
      }
    })
    return () => {
      active = false
    }
  }, [loadAllData])

  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError('')
    try {
      const res = await authService.login({ password })
      if (res.success) {
        setIsAuthenticated(true)
        setAdminUser(res.user || { name: 'Secretariat Officer' })
        showToast('Authentication confirmed. Welcome to Secretariat Console.')
        loadAllData()
      } else {
        setAuthError(res.error || 'Authentication key rejected.')
      }
    } catch (err) {
      setAuthError('Connection failed. Please retry.')
    } finally {
      setAuthLoading(false)
    }
  }

  const handleLogout = () => {
    authService.logout()
    setIsAuthenticated(false)
    setAdminUser(null)
    showToast('Signed out of administrative console.')
  }

  // Delete Action Dispatcher
  const confirmDelete = async () => {
    if (!deleteConfirm) return
    const { type, id } = deleteConfirm
    try {
      if (type === 'event') {
        await api.events.delete(id)
        setEvents((prev) => prev.filter((e) => e.id !== id && e.slug !== id))
        showToast('Event removed from schedule.')
      } else if (type === 'post') {
        await api.posts.delete(id)
        setPosts((prev) => prev.filter((p) => p.id !== id && p.slug !== id))
        showToast('Dispatch deleted.')
      } else if (type === 'member') {
        await api.members.delete(id)
        setMembers((prev) => prev.filter((m) => m.id !== id))
        showToast('Member removed from roster.')
      } else if (type === 'gallery') {
        await api.gallery.delete(id)
        setGallery((prev) => prev.filter((g) => g.id !== id))
        showToast('Photo removed from gallery.')
      }
    } catch (err) {
      showToast('Deletion failed. Please retry.', 'error')
    } finally {
      setDeleteConfirm(null)
    }
  }

  // -------------------------------------------------------------
  // LOGIN SCREEN (Unauthenticated)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-paper border-2 border-ink p-8 shadow-[6px_6px_0px_var(--brick)] space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-block px-2.5 py-0.5 border border-ink bg-tan text-ink text-[11px] font-bold uppercase tracking-wider font-complexity-notation">
              RESTRICTED DESK // LEVEL-04
            </span>
            <h1 className="font-headline-lg text-2xl sm:text-3xl font-bold text-ink">
              Secretariat Portal
            </h1>
            <p className="font-body-sm text-xs sm:text-sm text-muted">
              Enter authorized council master key to access event rosters, dispatches, and member records.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                Administrative Passkey
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password (e.g. flux2026)"
                required
                className="w-full px-4 py-2.5 border-2 border-ink bg-card text-ink font-complexity-notation text-sm focus:outline-none focus:ring-2 focus:ring-brick"
              />
              <span className="font-complexity-notation text-[10px] text-muted block mt-1">
                Dev stub credential: <code className="text-brick font-bold">flux2026</code>
              </span>
            </div>

            {authError && (
              <div className="p-3 border border-brick bg-brick/10 text-brick text-xs font-complexity-notation font-bold">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 border-2 border-ink bg-brick text-paper font-label-smallcaps text-xs uppercase tracking-wider font-bold shadow-[3px_3px_0px_var(--ink)] hover:bg-brick-btn active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50"
            >
              {authLoading ? 'Verifying Key...' : 'Unlock Secretariat Console'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------
  // MAIN ADMIN CONSOLE (Authenticated)
  // -------------------------------------------------------------
  return (
    <div className="w-full min-h-[calc(100vh-80px)] px-4 lg:px-margin py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Console Bar */}
        <div className="border-b-2 border-ink pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 border border-ink bg-tan text-ink text-[10px] font-bold uppercase tracking-wider font-complexity-notation">
                SECRETARIAT // LIVE SYNC
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-complexity-notation text-xs text-muted">
                Logged in as {adminUser?.name || 'Administrator'}
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-3xl font-bold text-ink">
              Council Admin Console
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/admin/export"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border-2 border-ink bg-card text-ink font-label-smallcaps text-xs uppercase tracking-wider font-bold shadow-[2px_2px_0px_var(--ink)] hover:bg-tan"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Subscribers CSV</span>
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 border-2 border-ink bg-paper text-brick font-label-smallcaps text-xs uppercase tracking-wider font-bold shadow-[2px_2px_0px_var(--ink)] hover:bg-brick hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Console Navigation Tabs */}
        <div className="flex border-2 border-ink bg-card p-1 overflow-x-auto shadow-[3px_3px_0px_var(--ink)]">
          {[
            { id: 'events', label: 'Events Schedule', count: events.length, icon: 'event' },
            { id: 'posts', label: 'Dispatches & News', count: posts.length, icon: 'newspaper' },
            { id: 'members', label: 'Council Members', count: members.length, icon: 'badge' },
            { id: 'gallery', label: 'Media Gallery', count: gallery.length, icon: 'photo_library' },
            { id: 'submissions', label: 'Inquiries & Subs', count: messages.length, icon: 'mail' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 font-label-smallcaps text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-brick text-paper shadow-[2px_2px_0px_var(--ink)]'
                  : 'text-ink hover:text-brick hover:bg-tan/40'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{tab.label}</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-paper/30 rounded">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* --------------------------------------------------------- */}
        {/* TAB 1: EVENTS MANAGER */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'events' && (
          <div className="border-2 border-ink bg-paper shadow-[4px_4px_0px_var(--tan)] p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-ink/20 pb-4">
              <div>
                <h2 className="font-headline-sm text-xl font-bold text-ink">Proceedings &amp; Events</h2>
                <p className="font-body-sm text-xs text-muted">
                  Create, modify, or archive competitive tournaments and workshops.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null)
                  setModalType('event')
                }}
                className="px-4 py-2 border-2 border-ink bg-brick text-paper font-label-smallcaps text-xs uppercase tracking-wider font-bold shadow-[2px_2px_0px_var(--ink)] hover:bg-brick-btn flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>New Event</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {events.map((evt) => (
                <div
                  key={evt.id || evt.slug}
                  className="bg-card border-2 border-ink p-4 flex flex-col justify-between shadow-[2px_2px_0px_var(--ink)] space-y-3"
                >
                  <div className="space-y-2">
                    <div className="relative w-full aspect-[16/9] bg-tan border border-ink/20 overflow-hidden">
                      <SmartImage
                        src={evt.poster || '/posters/algorithms-auction.jpg'}
                        alt={evt.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-2 right-2 px-2 py-0.5 bg-paper/95 border border-ink text-[10px] font-bold font-complexity-notation uppercase">
                        {evt.status || 'upcoming'}
                      </span>
                    </div>

                    <h3 className="font-headline-sm text-base text-ink font-bold line-clamp-1">
                      {evt.title}
                    </h3>
                    <p className="font-complexity-notation text-xs text-brick font-semibold">
                      {evt.venue || 'VESIT Campus'}
                    </p>
                    <p className="font-body-sm text-xs text-muted line-clamp-2">
                      {evt.intro || evt.description || 'No description provided.'}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-ink/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem(evt)
                        setModalType('event')
                      }}
                      className="px-3 py-1 border border-ink bg-paper text-ink text-xs font-complexity-notation font-bold hover:bg-tan"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteConfirm({
                          type: 'event',
                          id: evt.id || evt.slug,
                          title: evt.title,
                        })
                      }
                      className="px-3 py-1 border border-ink bg-brick/10 text-brick text-xs font-complexity-notation font-bold hover:bg-brick hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* TAB 2: POSTS / NEWS MANAGER */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'posts' && (
          <div className="border-2 border-ink bg-paper shadow-[4px_4px_0px_var(--tan)] p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-ink/20 pb-4">
              <div>
                <h2 className="font-headline-sm text-xl font-bold text-ink">Gazette &amp; Announcements</h2>
                <p className="font-body-sm text-xs text-muted">
                  Publish project write-ups, exhibition reports, and departmental releases.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null)
                  setModalType('post')
                }}
                className="px-4 py-2 border-2 border-ink bg-brick text-paper font-label-smallcaps text-xs uppercase tracking-wider font-bold shadow-[2px_2px_0px_var(--ink)] hover:bg-brick-btn flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>New Dispatch</span>
              </button>
            </div>

            <div className="divide-y-2 divide-ink">
              {posts.map((p) => (
                <div key={p.id || p.slug} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-16 h-16 bg-tan border border-ink shrink-0 overflow-hidden relative">
                      <SmartImage
                        src={p.coverPhoto || '/photos/iota-robotics-chassis-presentation.jpg'}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-brick text-paper text-[10px] font-complexity-notation font-bold uppercase">
                          {p.category || 'Article'}
                        </span>
                        <span className="font-complexity-notation text-[11px] text-muted">{p.date}</span>
                      </div>
                      <h3 className="font-headline-sm text-lg text-ink font-bold truncate mt-0.5">
                        {p.title}
                      </h3>
                      <p className="font-body-sm text-xs text-muted truncate max-w-xl">
                        {p.subtitle || p.intro}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem(p)
                        setModalType('post')
                      }}
                      className="px-3 py-1.5 border border-ink bg-card text-ink text-xs font-complexity-notation font-bold hover:bg-tan"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteConfirm({
                          type: 'post',
                          id: p.id || p.slug,
                          title: p.title,
                        })
                      }
                      className="px-3 py-1.5 border border-ink bg-brick/10 text-brick text-xs font-complexity-notation font-bold hover:bg-brick hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* TAB 3: COUNCIL MEMBERS MANAGER */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'members' && (
          <div className="border-2 border-ink bg-paper shadow-[4px_4px_0px_var(--tan)] p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-ink/20 pb-4">
              <div>
                <h2 className="font-headline-sm text-xl font-bold text-ink">Council Roster &amp; Profiles</h2>
                <p className="font-body-sm text-xs text-muted">
                  Update council member photos, bios, social coordinates (LinkedIn, GitHub, Instagram), and posts.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null)
                  setModalType('member')
                }}
                className="px-4 py-2 border-2 border-ink bg-brick text-paper font-label-smallcaps text-xs uppercase tracking-wider font-bold shadow-[2px_2px_0px_var(--ink)] hover:bg-brick-btn flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">person_add</span>
                <span>Add Member</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {members.map((m) => (
                <div
                  key={m.id}
                  className="bg-card border-2 border-ink p-3 flex flex-col justify-between shadow-[2px_2px_0px_var(--ink)] space-y-2"
                >
                  <div className="space-y-2">
                    <div className="relative w-full aspect-[4/5] bg-tan border border-ink/30 overflow-hidden">
                      <SmartImage
                        src={m.photo || '/team/parth-sonar.jpg'}
                        alt={m.name}
                        fill
                        className="object-cover object-top"
                      />
                      <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-paper/90 border border-ink text-[10px] font-bold font-complexity-notation">
                        {m.tier || 'member'}
                      </span>
                    </div>

                    <h4 className="font-headline-sm text-base text-ink font-bold line-clamp-1">
                      {m.name}
                    </h4>
                    <p className="font-label-smallcaps text-xs text-brick font-bold">
                      {m.post || m.role}
                    </p>
                    {m.quote && (
                      <p className="font-title-editorial italic text-xs text-muted line-clamp-1">
                        &ldquo;{m.quote}&rdquo;
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-ink/10 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingItem(m)
                        setModalType('member')
                      }}
                      className="px-2.5 py-1 border border-ink bg-paper text-ink text-xs font-complexity-notation font-bold hover:bg-tan"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteConfirm({
                          type: 'member',
                          id: m.id,
                          title: m.name,
                        })
                      }
                      className="px-2.5 py-1 border border-ink bg-brick/10 text-brick text-xs font-complexity-notation font-bold hover:bg-brick hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* TAB 4: GALLERY MANAGER */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'gallery' && (
          <div className="border-2 border-ink bg-paper shadow-[4px_4px_0px_var(--tan)] p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-ink/20 pb-4">
              <div>
                <h2 className="font-headline-sm text-xl font-bold text-ink">Media Gallery Uploads</h2>
                <p className="font-body-sm text-xs text-muted">
                  Publish photographic demonstration records, workshop photos, and lab captures.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null)
                  setModalType('gallery')
                }}
                className="px-4 py-2 border-2 border-ink bg-brick text-paper font-label-smallcaps text-xs uppercase tracking-wider font-bold shadow-[2px_2px_0px_var(--ink)] hover:bg-brick-btn flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span>
                <span>Add Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((g) => (
                <div
                  key={g.id}
                  className="bg-card border-2 border-ink p-3 flex flex-col justify-between shadow-[2px_2px_0px_var(--ink)] space-y-2"
                >
                  <div className="relative w-full aspect-[4/3] bg-tan border border-ink/20 overflow-hidden">
                    <SmartImage src={g.src} alt={g.title} fill className="object-cover" />
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-paper/95 border border-ink text-[10px] font-bold font-complexity-notation uppercase">
                      {g.category || 'General'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-sm text-ink font-bold line-clamp-1">
                      {g.title}
                    </h4>
                    <p className="font-complexity-notation text-[10px] text-muted">
                      {g.date || 'Recent'}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-ink/10 flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteConfirm({
                          type: 'gallery',
                          id: g.id,
                          title: g.title,
                        })
                      }
                      className="px-2.5 py-1 border border-ink bg-brick/10 text-brick text-xs font-complexity-notation font-bold hover:bg-brick hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------- */}
        {/* TAB 5: INQUIRIES & SUBSCRIBERS */}
        {/* --------------------------------------------------------- */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            {/* Student Inquiries */}
            <div className="border-2 border-ink bg-paper shadow-[4px_4px_0px_var(--ink)]">
              <div className="p-4 border-b-2 border-ink bg-tan flex items-center justify-between">
                <h3 className="font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold">
                  Secretariat Student Inquiries ({messages.length})
                </h3>
                <span className="font-complexity-notation text-xs text-muted">MongoDB Registry</span>
              </div>
              <div className="divide-y-2 divide-ink max-h-[400px] overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="p-6 text-center text-muted font-body-md text-sm">
                    No student inquiries received yet.
                  </p>
                ) : (
                  messages.map((m) => (
                    <div key={m._id?.toString() || m.id} className="p-4 hover:bg-card transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-ink font-headline-sm text-sm">
                            {m.name}
                          </span>
                          <span className="px-1.5 py-0.5 border border-ink bg-card text-[10px] font-complexity-notation">
                            {m.year}
                          </span>
                          <span className="px-1.5 py-0.5 border border-ink bg-brick text-paper text-[10px] font-complexity-notation font-bold">
                            {m.category}
                          </span>
                        </div>
                        <span className="font-complexity-notation text-[10px] text-muted">
                          {m.createdAt ? new Date(m.createdAt).toLocaleString() : 'Recent'}
                        </span>
                      </div>
                      <p className="text-muted text-xs font-mono mb-2">{m.email}</p>
                      <p className="font-body-md text-ink text-xs border-l-2 border-tan pl-3 whitespace-pre-wrap">
                        {m.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Newsletter Subscribers */}
            <div className="border-2 border-ink bg-paper shadow-[4px_4px_0px_var(--ink)]">
              <div className="p-4 border-b-2 border-ink bg-tan flex items-center justify-between">
                <h3 className="font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold">
                  Newsletter Subscriber Roster ({subscribers.length})
                </h3>
                <a
                  href="/api/admin/export"
                  className="font-complexity-notation text-xs text-brick hover:underline font-bold"
                >
                  Download CSV
                </a>
              </div>
              <div className="p-4">
                {subscribers.length === 0 ? (
                  <p className="text-center text-muted font-body-md text-sm py-4">
                    No subscribers enrolled yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {subscribers.map((s) => (
                      <div
                        key={s._id?.toString() || s.email}
                        className="p-3 border border-ink bg-card flex flex-col justify-between"
                      >
                        <span className="font-mono text-xs text-ink truncate">{s.email}</span>
                        <span className="font-complexity-notation text-[10px] text-muted mt-1">
                          {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'Active'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TOAST NOTIFICATION */}
      {/* ------------------------------------------------------------- */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 border-2 border-ink bg-card text-ink shadow-[4px_4px_0px_var(--brick)] font-complexity-notation text-xs font-bold animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-brick">
            {toast.type === 'error' ? 'error' : 'check_circle'}
          </span>
          <span>{toast.message}</span>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ------------------------------------------------------------- */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-paper border-2 border-ink p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-brick">
              <span className="material-symbols-outlined text-[24px]">delete_forever</span>
              <h3 className="font-headline-sm text-lg font-bold text-ink">Confirm Deletion</h3>
            </div>
            <p className="font-body-sm text-xs sm:text-sm text-ink leading-relaxed">
              Are you sure you want to delete &ldquo;<strong>{deleteConfirm.title}</strong>&rdquo;? This action will remove it from both the backend records and public site.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3 font-complexity-notation text-xs">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-ink bg-card text-ink font-bold hover:bg-tan"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 border-2 border-ink bg-brick text-paper font-bold hover:bg-brick-btn shadow-[2px_2px_0px_var(--ink)]"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ITEM CREATE / EDIT MODAL */}
      {/* ------------------------------------------------------------- */}
      {modalType && (
        <ItemModal
          type={modalType}
          item={editingItem}
          onClose={() => {
            setModalType(null)
            setEditingItem(null)
          }}
          onSave={(savedItem) => {
            if (modalType === 'event') {
              setEvents((prev) =>
                editingItem
                  ? prev.map((e) => (e.id === savedItem.id ? savedItem : e))
                  : [savedItem, ...prev]
              )
            } else if (modalType === 'post') {
              setPosts((prev) =>
                editingItem
                  ? prev.map((p) => (p.id === savedItem.id ? savedItem : p))
                  : [savedItem, ...prev]
              )
            } else if (modalType === 'member') {
              setMembers((prev) =>
                editingItem
                  ? prev.map((m) => (m.id === savedItem.id ? savedItem : m))
                  : [...prev, savedItem]
              )
            } else if (modalType === 'gallery') {
              setGallery((prev) => [savedItem, ...prev])
            }
            showToast(`${modalType.toUpperCase()} record updated successfully.`)
            setModalType(null)
            setEditingItem(null)
          }}
        />
      )}
    </div>
  )
}

// -------------------------------------------------------------------
// MODAL FOR CREATING / EDITING ITEMS WITH LIVE IMAGE PREVIEW & VALIDATION
// -------------------------------------------------------------------
function ItemModal({ type, item, onClose, onSave }) {
  const [formData, setFormData] = useState(item || {})
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')
    try {
      let saved
      if (type === 'event') {
        saved = item?.id
          ? await api.events.update(item.id, formData)
          : await api.events.create(formData)
      } else if (type === 'post') {
        saved = item?.id
          ? await api.posts.update(item.id, formData)
          : await api.posts.create(formData)
      } else if (type === 'member') {
        saved = item?.id
          ? await api.members.update(item.id, formData)
          : await api.members.create(formData)
      } else if (type === 'gallery') {
        saved = await api.gallery.create(formData)
      }
      onSave(saved)
    } catch (err) {
      setErrorMsg(err.message || 'Operation failed. Please check fields.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full bg-paper border-2 border-ink p-6 shadow-2xl my-8 space-y-4">
        <div className="flex items-center justify-between border-b-2 border-ink pb-3">
          <div>
            <span className="font-complexity-notation text-[10px] uppercase tracking-wider text-brick font-bold">
              ADMINISTRATIVE FORM // {type.toUpperCase()}
            </span>
            <h3 className="font-headline-sm text-xl font-bold text-ink">
              {item ? `Edit ${type}` : `Create New ${type}`}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 border border-ink bg-card text-ink hover:bg-tan"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 border border-brick bg-brick/10 text-brick text-xs font-complexity-notation font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* ================= EVENT FORM ================= */}
          {type === 'event' && (
            <>
              <div>
                <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Algorithm's Auction 2.0"
                  className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                    Venue
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue || ''}
                    onChange={handleChange}
                    placeholder="e.g. 2nd Floor, VESIT"
                    className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                  />
                </div>
                <div>
                  <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status || 'upcoming'}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past / Concluded</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    name="startDate"
                    value={formData.startDate || ''}
                    onChange={handleChange}
                    placeholder="YYYY-MM-DD or formatted date"
                    className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                  />
                </div>
                <div>
                  <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                    Time Window
                  </label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time || ''}
                    onChange={handleChange}
                    placeholder="e.g. 1:00 pm – 3:30 pm"
                    className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                  Poster Image URL
                </label>
                <input
                  type="text"
                  name="poster"
                  value={formData.poster || ''}
                  onChange={handleChange}
                  placeholder="/posters/algorithms-auction.jpg or external CDN URL"
                  className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                />
              </div>

              {formData.poster && (
                <div className="p-2 border border-ink bg-card flex items-center gap-3">
                  <div className="w-16 h-20 bg-tan relative border border-ink shrink-0 overflow-hidden">
                    <SmartImage src={formData.poster} alt="Preview" fill className="object-cover" />
                  </div>
                  <span className="font-complexity-notation text-xs text-muted">
                    Live Poster Image Preview
                  </span>
                </div>
              )}

              <div>
                <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                  Registration URL
                </label>
                <input
                  type="url"
                  name="registerUrl"
                  value={formData.registerUrl || ''}
                  onChange={handleChange}
                  placeholder="https://docs.google.com/forms/..."
                  className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                />
              </div>

              <div>
                <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                  Description / Intro
                </label>
                <textarea
                  name="intro"
                  rows={3}
                  value={formData.intro || ''}
                  onChange={handleChange}
                  placeholder="Overview of event..."
                  className="w-full px-3 py-2 border border-ink bg-card text-ink font-body-sm text-xs"
                />
              </div>
            </>
          )}

          {/* ================= POST FORM ================= */}
          {type === 'post' && (
            <>
              <div>
                <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                  Dispatch Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  placeholder="e.g. IoTA Archives"
                  className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle || ''}
                    onChange={handleChange}
                    placeholder="e.g. Induction Exhibition 2026"
                    className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                  />
                </div>
                <div>
                  <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category || 'Event Write-up'}
                    onChange={handleChange}
                    placeholder="Event Write-up, Technical Guide, Announcement"
                    className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                  Cover Photo URL
                </label>
                <input
                  type="text"
                  name="coverPhoto"
                  value={formData.coverPhoto || ''}
                  onChange={handleChange}
                  placeholder="/photos/iota-robotics-chassis-presentation.jpg"
                  className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                />
              </div>

              {formData.coverPhoto && (
                <div className="p-2 border border-ink bg-card flex items-center gap-3">
                  <div className="w-20 h-12 bg-tan relative border border-ink shrink-0 overflow-hidden">
                    <SmartImage src={formData.coverPhoto} alt="Cover Preview" fill className="object-cover" />
                  </div>
                  <span className="font-complexity-notation text-xs text-muted">
                    Cover Photo Preview
                  </span>
                </div>
              )}

              <div>
                <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                  Article Body / Intro
                </label>
                <textarea
                  name="intro"
                  rows={4}
                  value={formData.intro || ''}
                  onChange={handleChange}
                  placeholder="Write the full report..."
                  className="w-full px-3 py-2 border border-ink bg-card text-ink font-body-sm text-xs"
                />
              </div>
            </>
          )}

          {/* ================= MEMBER FORM ================= */}
          {type === 'member' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Shantanu Gaikwad"
                    className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                  />
                </div>
                <div>
                  <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                    Post / Title *
                  </label>
                  <input
                    type="text"
                    name="post"
                    value={formData.post || formData.role || ''}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Vice Prez, Technical Officer"
                    className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                    Council Tier
                  </label>
                  <select
                    name="tier"
                    value={formData.tier || 'senior'}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                  >
                    <option value="senior">Senior Council (Core)</option>
                    <option value="junior">Junior Council (Officers)</option>
                    <option value="faculty">Faculty Advisor / In-charge</option>
                  </select>
                </div>
                <div>
                  <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                    Department / Class
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department || 'TE ECS'}
                    onChange={handleChange}
                    placeholder="TE ECS, SE ECS"
                    className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  value={formData.photo || ''}
                  onChange={handleChange}
                  placeholder="/team/shantanu-gaikwad.jpg"
                  className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                />
              </div>

              {formData.photo && (
                <div className="p-2 border border-ink bg-card flex items-center gap-3">
                  <div className="w-12 h-14 bg-tan relative border border-ink shrink-0 overflow-hidden">
                    <SmartImage src={formData.photo} alt="Photo Preview" fill className="object-cover" />
                  </div>
                  <span className="font-complexity-notation text-xs text-muted">
                    Photo Preview (Shown on Front of Card)
                  </span>
                </div>
              )}

              <div>
                <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                  Card Motto / Quote
                </label>
                <input
                  type="text"
                  name="quote"
                  value={formData.quote || ''}
                  onChange={handleChange}
                  placeholder="e.g. Turning ambition into reality."
                  className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                />
              </div>

              <div>
                <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                  Written Profile / Bio (Shown on Card Back)
                </label>
                <textarea
                  name="bio"
                  rows={2}
                  value={formData.bio || ''}
                  onChange={handleChange}
                  placeholder="Brief responsibilities, achievements, and focus..."
                  className="w-full px-3 py-2 border border-ink bg-card text-ink font-body-sm text-xs"
                />
              </div>

              {/* Social Coordinates from Spreadsheet */}
              <div className="p-3 border border-ink/20 bg-card space-y-2">
                <span className="font-complexity-notation text-[10px] text-brick font-bold uppercase block">
                  Social Links (Icons rendered on Card Back)
                </span>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin || ''}
                  onChange={handleChange}
                  placeholder="LinkedIn URL (https://www.linkedin.com/in/...)"
                  className="w-full px-3 py-1.5 border border-ink bg-paper text-ink font-complexity-notation text-xs"
                />
                <input
                  type="url"
                  name="github"
                  value={formData.github || ''}
                  onChange={handleChange}
                  placeholder="GitHub URL (https://github.com/...)"
                  className="w-full px-3 py-1.5 border border-ink bg-paper text-ink font-complexity-notation text-xs"
                />
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram || ''}
                  onChange={handleChange}
                  placeholder="Instagram URL (https://www.instagram.com/...)"
                  className="w-full px-3 py-1.5 border border-ink bg-paper text-ink font-complexity-notation text-xs"
                />
              </div>
            </>
          )}

          {/* ================= GALLERY FORM ================= */}
          {type === 'gallery' && (
            <>
              <div>
                <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Robot Chassis Floor Test"
                  className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category || 'Exhibition'}
                    onChange={handleChange}
                    placeholder="Exhibition, Robotics, Hardware, Competitions"
                    className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                  />
                </div>
                <div>
                  <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                    Date Tag
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date || ''}
                    onChange={handleChange}
                    placeholder="September 2026"
                    className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                  Image Source URL *
                </label>
                <input
                  type="text"
                  name="src"
                  value={formData.src || ''}
                  onChange={handleChange}
                  required
                  placeholder="/photos/iota-robot-floor-test.jpg"
                  className="w-full px-3 py-2 border border-ink bg-card text-ink font-complexity-notation text-xs"
                />
              </div>

              {formData.src && (
                <div className="p-2 border border-ink bg-card flex items-center gap-3">
                  <div className="w-20 h-14 bg-tan relative border border-ink shrink-0 overflow-hidden">
                    <SmartImage src={formData.src} alt="Photo Preview" fill className="object-cover" />
                  </div>
                  <span className="font-complexity-notation text-xs text-muted">
                    Photo Preview
                  </span>
                </div>
              )}

              <div>
                <label className="block font-label-smallcaps text-xs uppercase tracking-wider text-ink font-bold mb-1">
                  Caption / Description
                </label>
                <textarea
                  name="description"
                  rows={2}
                  value={formData.description || ''}
                  onChange={handleChange}
                  placeholder="Testing autonomous obstacle avoidance in Lab 201..."
                  className="w-full px-3 py-2 border border-ink bg-card text-ink font-body-sm text-xs"
                />
              </div>
            </>
          )}

          {/* Action buttons */}
          <div className="pt-4 border-t border-ink/20 flex items-center justify-end gap-3 font-complexity-notation text-xs">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 border border-ink bg-card text-ink font-bold hover:bg-tan"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 border-2 border-ink bg-brick text-paper font-bold hover:bg-brick-btn shadow-[2px_2px_0px_var(--ink)] disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save & Synchronize'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
