'use client'

import { useState, useEffect } from 'react'

export default function AdminUserManagement() {
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const [newEmail, setNewEmail] = useState('')
  const [newName, setNewName] = useState('')
  const [newRole, setNewRole] = useState('admin')
  const [msg, setMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchAdmins()
  }, [])

  function fetchAdmins() {
    setLoading(true)
    fetch('/api/admin/admins')
      .then(res => res.json())
      .then(json => {
        if (json.ok && json.data) setAdmins(json.data)
      })
      .catch(err => console.error('Failed to load admins:', err))
      .finally(() => setLoading(false))
  }

  async function handleAddAdmin(e) {
    e.preventDefault()
    if (!newEmail || !newEmail.includes('@')) {
      setMsg('❌ Please enter a valid email address')
      return
    }

    setSubmitting(true)
    setMsg('')
    try {
      const res = await fetch('/api/admin/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, name: newName, role: newRole }),
      })
      const json = await res.json()
      if (json.ok) {
        setMsg(`✓ Admin invited successfully: ${newEmail}`)
        setNewEmail('')
        setNewName('')
        fetchAdmins()
      } else {
        setMsg(`❌ Error: ${json.error || 'Failed to add admin'}`)
      }
    } catch (err) {
      setMsg(`❌ Network error: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleRemoveAdmin(email) {
    if (!confirm(`Are you sure you want to revoke access for ${email}?`)) return
    try {
      const res = await fetch(`/api/admin/admins?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
      })
      const json = await res.json()
      if (json.ok) {
        setMsg(`✓ Revoked access for ${email}`)
        fetchAdmins()
      } else {
        setMsg(`❌ ${json.error}`)
      }
    } catch (err) {
      setMsg(`❌ Network error: ${err.message}`)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header & Supabase Connection Status Card */}
      <div className="p-6 bg-[#171C23] border border-white/10 rounded-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <h2 className="text-lg font-bold text-white font-display uppercase tracking-tight">
                Authentication &amp; Supabase Admin Roster
              </h2>
            </div>
            <p className="text-xs text-gray-400 font-mono mt-1">
              Multi-user council access control. Root Super Admin privileges assigned to buildwithaarya@gmail.com.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0D1014] border border-white/15 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#D94A5B]" />
            <span className="text-gray-300">Auth Engine:</span>
            <span className="text-white font-bold">Supabase / Fallback Store</span>
          </div>
        </div>

        <div className="text-xs font-mono text-gray-400 leading-relaxed">
          <span className="text-[#D94A5B] font-bold">SUPER ADMIN NOTICE:</span> As Super Admin, you can invite new officers, assign roles (Council Admin, Content Editor), and revoke administrative session tokens at any time.
        </div>
      </div>

      {msg && (
        <div
          className={`p-4 rounded-xl text-xs font-mono ${
            msg.includes('✓') ? 'bg-[#D94A5B]/15 border border-[#D94A5B]/40 text-white' : 'bg-red-950/60 border border-red-500/40 text-red-200'
          }`}
        >
          {msg}
        </div>
      )}

      {/* Add New Admin Form */}
      <div className="p-6 bg-[#12161C] border border-white/10 rounded-xl space-y-4">
        <h3 className="text-base font-bold text-white font-display uppercase tracking-wider border-b border-white/10 pb-2">
          Invite / Authorize New Council Admin
        </h3>

        <form onSubmit={handleAddAdmin} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5">
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">
              Admin Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="officer@vesit.edu or gmail"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              className="w-full bg-[#171C23] border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#D94A5B] outline-none font-mono"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">
              Full Name / Officer Title
            </label>
            <input
              type="text"
              placeholder="e.g. Technical Head"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              className="w-full bg-[#171C23] border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#D94A5B] outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-mono text-gray-400 uppercase mb-1.5">
              Role Level
            </label>
            <select
              value={newRole}
              onChange={e => setNewRole(e.target.value)}
              className="w-full bg-[#171C23] border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm font-mono outline-none"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-4 py-2.5 bg-[#D94A5B] hover:bg-[#e45a6b] text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-[0_4px_16px_rgba(217,74,91,0.3)] disabled:opacity-50"
            >
              {submitting ? 'Adding...' : '+ Add Admin'}
            </button>
          </div>
        </form>
      </div>

      {/* Admin Users Table */}
      <div className="p-6 bg-[#12161C] border border-white/10 rounded-xl space-y-4">
        <h3 className="text-base font-bold text-white font-display uppercase tracking-wider border-b border-white/10 pb-2">
          Authorized Secretariat &amp; Admins ({admins.length})
        </h3>

        {loading ? (
          <p className="text-xs font-mono text-gray-400 py-4">Loading admins...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 uppercase">
                  <th className="pb-3 font-semibold">Admin Account</th>
                  <th className="pb-3 font-semibold">Name / Title</th>
                  <th className="pb-3 font-semibold">Access Level</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {admins.map(a => {
                  const isRoot = a.email.toLowerCase() === 'buildwithaarya@gmail.com'
                  return (
                    <tr key={a.id || a.email} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 text-white font-semibold flex items-center gap-2">
                        {isRoot && (
                          <span className="p-1 rounded bg-[#D94A5B]/20 text-[#D94A5B] text-[10px]" title="Super Admin Shield">
                            🛡️
                          </span>
                        )}
                        <span>{a.email}</span>
                      </td>
                      <td className="py-3.5 text-gray-300">{a.name}</td>
                      <td className="py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                            a.role === 'super_admin'
                              ? 'bg-[#D94A5B]/20 border border-[#D94A5B]/40 text-[#D94A5B]'
                              : 'bg-white/10 text-gray-300'
                          }`}
                        >
                          {a.role}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Active</span>
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        {isRoot ? (
                          <span className="text-gray-500 text-[10px] uppercase">Root Protected</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleRemoveAdmin(a.email)}
                            className="px-2.5 py-1 text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-red-500/20 rounded transition-all text-[11px]"
                          >
                            Revoke
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
