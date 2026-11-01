import { cookies } from 'next/headers'
import connectMongo from '@/lib/mongodb'
import Message from '@/models/Message'
import Subscriber from '@/models/Subscriber'
import { verifyAdminToken, getAdminSession } from '@/lib/auth'
import AdminLoginForm from '@/components/AdminLoginForm'
import AdminDashboardClient from '@/components/admin/AdminDashboardClient'
import AdminLogoutButton from '@/components/admin/AdminLogoutButton'
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
  const session = isAuthorized ? getAdminSession(token) : null

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
    <div className="w-full min-h-screen bg-transparent text-[#EFF0F2] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400 text-xs font-mono uppercase tracking-wider">
                Council Operations · Level-04
              </span>
              {session && (
                <span className="inline-block px-3 py-1 rounded-full border border-[#D94A5B]/30 bg-[#D94A5B]/10 text-[#D94A5B] text-xs font-mono uppercase font-bold tracking-wider">
                  {session.role?.replace('_', ' ').toUpperCase()}: {session.email}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
              Secretariat Admin &amp; Control
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Live website content editor, event poster docket, visitor analytics telemetry, and multi-user access.
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
              <AdminLogoutButton />
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
                Enter your administrative key to access the event publisher, website edit panel, and telemetry.
              </p>
            </div>
            <AdminLoginForm />
          </div>
        ) : (
          <AdminDashboardClient
            events={events}
            messages={messages}
            subscribers={subscribers}
          />
        )}
      </div>
    </div>
  )
}
