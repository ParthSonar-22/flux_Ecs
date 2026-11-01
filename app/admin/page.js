import { cookies } from 'next/headers'
import connectMongo from '@/lib/mongodb'
import Message from '@/models/Message'
import Subscriber from '@/models/Subscriber'
import { verifyAdminToken } from '@/lib/auth'
import AdminLoginForm from '@/components/AdminLoginForm'
import AdminEventManager from '@/components/AdminEventManager'
import { getAllEvents } from '@/lib/events-store'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Console | FluxECS Council',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('flux_admin_token')?.value
  const isAuthorized = verifyAdminToken(token)

  let messages = []
  let subscribers = []
  let events = []

  if (isAuthorized) {
    events = await getAllEvents({ includeDrafts: true })

    if (process.env.MONGODB_URI) {
      try {
        await connectMongo()
        messages = await Message.find({}).sort({ createdAt: -1 }).limit(50).lean()
        subscribers = await Subscriber.find({}).sort({ createdAt: -1 }).limit(100).lean()
      } catch (e) {
        console.error('Failed to query admin collections:', e)
      }
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#0D1014] text-[#EFF0F2] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">
              Council Operations · Level-04
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
              Secretariat Admin
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage graphics posters, event publications, inquiries, and subscriber dispatches.
            </p>
          </div>

          {isAuthorized && (
            <div className="flex items-center gap-3">
              <a
                href="/api/admin/export"
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/15 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-mono font-semibold transition-all"
              >
                <span>Export Subscribers CSV ↓</span>
              </a>
            </div>
          )}
        </div>

        {!isAuthorized ? (
          <div className="max-w-md mx-auto my-12 border border-white/15 bg-[#12161C] p-8 rounded-xl shadow-2xl">
            <div className="mb-6 text-center space-y-2">
              <span className="inline-block p-3 rounded-full bg-[#D94A5B]/10 text-[#D94A5B] border border-[#D94A5B]/20 text-2xl">
                🔒
              </span>
              <h2 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                Council Authentication
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Enter your administrative key to access the event publisher, inquiries, and dispatches.
              </p>
            </div>
            <AdminLoginForm />
          </div>
        ) : (
          <div className="space-y-12">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-white/10 bg-[#12161C] p-5 rounded-xl">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                  Total Events
                </span>
                <span className="text-2xl font-bold text-white mt-1 block">
                  {events.length}
                </span>
              </div>

              <div className="border border-white/10 bg-[#12161C] p-5 rounded-xl">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                  Total Inquiries
                </span>
                <span className="text-2xl font-bold text-white mt-1 block">
                  {messages.length}
                </span>
              </div>

              <div className="border border-white/10 bg-[#12161C] p-5 rounded-xl">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                  Subscribers
                </span>
                <span className="text-2xl font-bold text-white mt-1 block">
                  {subscribers.length}
                </span>
              </div>

              <div className="border border-white/10 bg-[#12161C] p-5 rounded-xl">
                <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
                  Database State
                </span>
                <span className="text-xs font-mono font-bold text-[#D94A5B] mt-2 block">
                  {process.env.MONGODB_URI ? 'Connected (Atlas)' : 'Persistent Local Store'}
                </span>
              </div>
            </div>

            {/* SECTION 1: EVENTS & GRAPHICS POSTER PUBLISHER */}
            <section className="space-y-4">
              <AdminEventManager initialEvents={events} />
            </section>

            {/* SECTION 2: RECENT INQUIRIES */}
            <section className="border border-white/10 bg-[#12161C] rounded-xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-base font-bold text-white font-display uppercase tracking-tight">
                  Recent Inquiries &amp; Dispatches ({messages.length})
                </h2>
                <span className="text-xs font-mono text-gray-400">
                  Contact form entries
                </span>
              </div>

              <div className="divide-y divide-white/10 max-h-[400px] overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="p-8 text-center text-gray-400 text-sm">
                    No inquiries recorded in the registry yet.
                  </p>
                ) : (
                  messages.map((m) => (
                    <div key={m._id.toString()} className="p-4 hover:bg-white/[0.02] transition-colors space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{m.name}</span>
                          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300">
                            {m.year}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-[#D94A5B]/20 text-[#D94A5B] border border-[#D94A5B]/30 text-[10px] font-mono font-bold">
                            {m.category}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-gray-500">
                          {new Date(m.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-mono">{m.email}</p>
                      <p className="text-xs text-gray-300 pt-1 leading-relaxed border-l-2 border-white/20 pl-3">
                        {m.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
