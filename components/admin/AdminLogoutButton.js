'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogoutButton() {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.refresh()
    } catch (err) {
      console.error('Logout error:', err)
      setLoggingOut(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loggingOut}
      className="inline-flex items-center gap-1.5 px-3 py-2 border border-red-500/30 bg-red-950/20 hover:bg-red-950/50 text-red-400 rounded-lg text-xs font-mono font-semibold transition-all"
    >
      <span>{loggingOut ? 'Ending Session…' : 'Log Out ⎋'}</span>
    </button>
  )
}
