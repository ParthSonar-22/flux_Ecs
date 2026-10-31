import { cookies } from 'next/headers'
import connectMongo from '@/lib/mongodb'
import Message from '@/models/Message'
import Subscriber from '@/models/Subscriber'
import { verifyAdminToken } from '@/lib/auth'
import AdminLoginForm from '@/components/AdminLoginForm'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Admin Registry',
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

  if (isAuthorized && process.env.MONGODB_URI) {
    try {
      await connectMongo()
      messages = await Message.find({}).sort({ createdAt: -1 }).limit(50).lean()
      subscribers = await Subscriber.find({}).sort({ createdAt: -1 }).limit(100).lean()
    } catch (e) {
      console.error('Failed to query admin collections:', e)
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] px-4 lg:px-margin py-space-lg">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="border-b-2 border-ink pb-4 mb-space-md flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="inline-block px-2 py-0.5 border border-ink bg-tan text-ink text-[11px] font-bold uppercase tracking-wider font-complexity-notation mb-2">
              RESTRICTED CONSOLE // LEVEL-04
            </span>
            <h1 className="font-headline-lg text-headline-lg font-bold text-ink">
              Secretariat Registry
            </h1>
          </div>
          {isAuthorized && (
            <a
              href="/api/admin/export"
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-ink bg-card text-ink font-label-smallcaps uppercase tracking-wider shadow-[3px_3px_0px_var(--ink)] hover:bg-tan active:translate-x-0.5 active:translate-y-0.5 text-xs font-bold"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download Subscribers CSV</span>
            </a>
          )}
        </div>

        {!isAuthorized ? (
          <div className="max-w-md mx-auto my-12 border-2 border-ink bg-paper p-6 shadow-[6px_6px_0px_var(--brick)]">
            <div className="mb-4 text-center">
              <span className="material-symbols-outlined text-brick text-[36px] mb-2">
                lock
              </span>
              <h2 className="font-headline-sm text-headline-sm font-bold text-ink">
                Council Authentication
              </h2>
              <p className="font-body-sm text-muted mt-1">
                Enter your administrative key to view inquiries and dispatch subscribers.
              </p>
            </div>
            <AdminLoginForm />
          </div>
        ) : (
          <div className="space-y-space-lg">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border-2 border-ink bg-card p-4 shadow-[3px_3px_0px_var(--ink)]">
                <span className="font-complexity-notation text-[11px] uppercase tracking-wider text-muted block">
                  Total Messages
                </span>
                <span className="font-headline-md text-headline-md font-bold text-ink">
                  {messages.length}
                </span>
              </div>
              <div className="border-2 border-ink bg-card p-4 shadow-[3px_3px_0px_var(--ink)]">
                <span className="font-complexity-notation text-[11px] uppercase tracking-wider text-muted block">
                  Total Subscribers
                </span>
                <span className="font-headline-md text-headline-md font-bold text-ink">
                  {subscribers.length}
                </span>
              </div>
              <div className="border-2 border-ink bg-card p-4 shadow-[3px_3px_0px_var(--ink)]">
                <span className="font-complexity-notation text-[11px] uppercase tracking-wider text-muted block">
                  Database State
                </span>
                <span className="font-headline-sm text-[1.2rem] font-bold text-brick mt-2 block">
                  {process.env.MONGODB_URI ? 'Connected (Atlas)' : 'Local Standby'}
                </span>
              </div>
              <div className="border-2 border-ink bg-card p-4 shadow-[3px_3px_0px_var(--ink)]">
                <span className="font-complexity-notation text-[11px] uppercase tracking-wider text-muted block">
                  Council Session
                </span>
                <span className="font-complexity-notation text-sm font-bold text-ink mt-2 block">
                  Active (7d Token)
                </span>
              </div>
            </div>

            {/* Inquiries Section */}
            <div className="border-2 border-ink bg-paper shadow-[4px_4px_0px_var(--ink)]">
              <div className="p-4 border-b-2 border-ink bg-tan flex items-center justify-between">
                <h2 className="font-label-smallcaps text-label-smallcaps uppercase tracking-wider text-ink font-bold">
                  Recent Inquiries &amp; Dispatches
                </h2>
                <span className="font-complexity-notation text-xs text-ink">
                  Count: {messages.length}
                </span>
              </div>
              <div className="divide-y-2 divide-ink max-h-[500px] overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="p-6 text-center text-muted font-body-md">
                    No dispatches logged in the registry yet.
                  </p>
                ) : (
                  messages.map((m) => (
                    <div key={m._id.toString()} className="p-4 hover:bg-card transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-ink font-headline-sm text-base">
                            {m.name}
                          </span>
                          <span className="px-1.5 py-0.5 border border-ink bg-card text-[11px] font-complexity-notation">
                            {m.year}
                          </span>
                          <span className="px-1.5 py-0.5 border border-ink bg-brick text-paper text-[11px] font-complexity-notation font-bold">
                            {m.category}
                          </span>
                        </div>
                        <span className="font-complexity-notation text-[11px] text-muted">
                          {new Date(m.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-muted text-sm font-mono mb-2">{m.email}</p>
                      <p className="font-body-md text-ink whitespace-pre-wrap text-sm border-l-2 border-tan pl-3">
                        {m.message}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Subscribers Section */}
            <div className="border-2 border-ink bg-paper shadow-[4px_4px_0px_var(--ink)]">
              <div className="p-4 border-b-2 border-ink bg-tan flex items-center justify-between">
                <h2 className="font-label-smallcaps text-label-smallcaps uppercase tracking-wider text-ink font-bold">
                  Newsletter Registry ({subscribers.length})
                </h2>
                <a
                  href="/api/admin/export"
                  className="font-complexity-notation text-xs text-brick hover:underline font-bold"
                >
                  Export CSV
                </a>
              </div>
              <div className="p-4">
                {subscribers.length === 0 ? (
                  <p className="text-center text-muted font-body-md py-4">
                    No subscribers logged yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {subscribers.map((s) => (
                      <div
                        key={s._id.toString()}
                        className="p-3 border border-ink bg-card flex flex-col justify-between"
                      >
                        <span className="font-mono text-sm text-ink truncate">{s.email}</span>
                        <span className="font-complexity-notation text-[10px] text-muted mt-1">
                          {new Date(s.createdAt).toLocaleDateString()}
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
    </div>
  )
}
