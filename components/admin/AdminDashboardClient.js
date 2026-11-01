'use client'

import { useState } from 'react'
import AdminEventManager from '@/components/AdminEventManager'
import EditPanel from '@/components/admin/EditPanel'
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard'
import AdminUserManagement from '@/components/admin/AdminUserManagement'

export default function AdminDashboardClient({ events = [], messages = [], subscribers = [] }) {
  const [activeTab, setActiveTab] = useState('events')

  return (
    <div className="space-y-8">
      {/* Navigation tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        {[
          ['events', 'Events Docket & Posters', '🎟️'],
          ['editor', 'Edit Panel (Notion Style)', '✍️'],
          ['analytics', 'Analytics & Telemetry', '📈'],
          ['admins', 'Council Admins & Auth', '🛡️'],
          ['inquiries', `Inquiries (${messages.length})`, '💬'],
        ].map(([key, label, icon]) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
              activeTab === key
                ? 'bg-[#D94A5B] text-white font-bold shadow-[0_4px_16px_rgba(217,74,91,0.3)]'
                : 'bg-[#12161C] text-gray-400 hover:text-white border border-white/10 hover:border-white/20'
            }`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === 'events' && (
        <div className="space-y-8">
          <AdminEventManager initialEvents={events} />
        </div>
      )}

      {activeTab === 'editor' && (
        <div className="space-y-8">
          <EditPanel />
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <AnalyticsDashboard />
        </div>
      )}

      {activeTab === 'admins' && (
        <div className="space-y-8">
          <AdminUserManagement />
        </div>
      )}

      {activeTab === 'inquiries' && (
        <div className="space-y-8">
          <div className="border border-white/10 bg-[#12161C] rounded-xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                  Recent Inquiries
                </h3>
                <p className="text-xs text-gray-400 mt-1 font-mono">
                  Submitted through the public /contact form
                </p>
              </div>
              <span className="text-xs font-mono text-gray-400">
                {messages.length} messages
              </span>
            </div>

            {messages.length === 0 ? (
              <div className="p-8 text-center text-gray-400 font-mono text-xs">
                No inquiries submitted yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#171C23] text-gray-400 border-b border-white/10 uppercase">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Year</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {messages.map((m, i) => (
                      <tr key={m._id || i} className="hover:bg-white/[0.02]">
                        <td className="p-4 text-white font-semibold">{m.name}</td>
                        <td className="p-4 text-[#D94A5B]">
                          <a href={`mailto:${m.email}`}>{m.email}</a>
                        </td>
                        <td className="p-4 text-gray-300">{m.year || 'N/A'}</td>
                        <td className="p-4 text-gray-300 max-w-xs truncate">{m.message}</td>
                        <td className="p-4 text-gray-500 whitespace-nowrap">
                          {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'Recent'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
