import { cookies } from 'next/headers'
import Link from 'next/link'
import { verifyAdminToken } from '@/lib/auth'
import AdminLoginForm from '@/components/AdminLoginForm'
import EditPanel from '@/components/admin/EditPanel'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Edit Panel | FluxECS Council Admin',
  robots: { index: false, follow: false },
}

export default async function EditPanelPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('flux_admin_token')?.value
  const isAuthorized = verifyAdminToken(token)

  return (
    <div className="w-full min-h-screen bg-transparent text-[#EFF0F2] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href="/admin"
                className="text-xs font-mono text-gray-400 hover:text-white transition-colors"
              >
                ← Back to Secretariat Console
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display uppercase tracking-tight">
              Website Edit Panel
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Live Notion-style content editor. Update headings, paragraphs, and announcements across the site.
            </p>
          </div>
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
                Enter your administrative key to access the live content edit panel.
              </p>
            </div>
            <AdminLoginForm />
          </div>
        ) : (
          <EditPanel />
        )}
      </div>
    </div>
  )
}
