'use client'

import { useState, useEffect } from 'react'

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null)
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(res => res.json())
      .then(json => {
        if (json.ok && json.data) setData(json.data)
      })
      .catch(err => console.error('Failed to load analytics:', err))
  }, [])

  if (!data) {
    return (
      <div className="p-12 text-center text-gray-400 font-mono text-sm">
        Loading council telemetry &amp; analytics...
      </div>
    )
  }

  const { overview, trafficDays, topPages, referrers, deviceBreakdown, recentActivity } = data
  const maxViews = Math.max(...trafficDays.map(d => d.views))

  return (
    <div className="space-y-8">
      {/* Overview KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-[#12161C] border border-white/10 rounded-xl space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
            Total Impressions
          </span>
          <span className="text-3xl font-bold text-white font-display">
            {overview.totalViews.toLocaleString()}
          </span>
          <span className="text-[11px] font-mono text-[#D94A5B] block pt-1">
            ↑ +18.4% this week
          </span>
        </div>

        <div className="p-5 bg-[#12161C] border border-white/10 rounded-xl space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
            Unique Engineering Visitors
          </span>
          <span className="text-3xl font-bold text-white font-display">
            {overview.uniqueVisitors.toLocaleString()}
          </span>
          <span className="text-[11px] font-mono text-emerald-400 block pt-1">
            ↑ +24.1% organic
          </span>
        </div>

        <div className="p-5 bg-[#12161C] border border-white/10 rounded-xl space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
            Active Registrants
          </span>
          <span className="text-3xl font-bold text-white font-display">
            {overview.activeRegistrants}
          </span>
          <span className="text-[11px] font-mono text-gray-400 block pt-1">
            Across {overview.publishedEvents} published events
          </span>
        </div>

        <div className="p-5 bg-[#12161C] border border-white/10 rounded-xl space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-gray-400 block">
            Conversion Rate
          </span>
          <span className="text-3xl font-bold text-white font-display">
            {overview.conversionRate}
          </span>
          <span className="text-[11px] font-mono text-gray-400 block pt-1">
            Views to Google Form registration
          </span>
        </div>
      </div>

      {/* Traffic Volume Chart */}
      <div className="p-6 sm:p-8 bg-[#12161C] border border-white/10 rounded-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D94A5B] font-bold block mb-1">
              Visitor Telemetry
            </span>
            <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
              Website Traffic (Past 7 Days)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {['24h', '7d', '30d'].map(range => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                  timeRange === range
                    ? 'bg-[#D94A5B] text-white font-bold'
                    : 'bg-[#171C23] text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* CSS/SVG Bar Chart */}
        <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 pt-6 px-2">
          {trafficDays.map(item => {
            const heightPercent = Math.round((item.views / maxViews) * 100)
            return (
              <div key={item.date} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-mono text-[#D94A5B] opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.views}
                </span>
                <div
                  className="w-full max-w-[42px] bg-gradient-to-t from-[#1B2026] to-[#D94A5B] rounded-t group-hover:brightness-125 transition-all"
                  style={{ height: `${heightPercent}%`, minHeight: '8px' }}
                />
                <span className="text-[10px] font-mono text-gray-400 uppercase">
                  {item.date}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Grid: Referrers & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="p-6 bg-[#12161C] border border-white/10 rounded-xl space-y-4">
          <h3 className="text-base font-bold text-white font-display uppercase tracking-wider border-b border-white/10 pb-3">
            Top Visited Pages
          </h3>
          <div className="space-y-3">
            {topPages.map(page => (
              <div key={page.path} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white truncate max-w-[240px]">{page.title}</span>
                  <span className="text-gray-400">{page.views.toLocaleString()} ({page.percentage}%)</span>
                </div>
                <div className="w-full bg-[#171C23] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#D94A5B] h-full rounded-full"
                    style={{ width: `${page.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="p-6 bg-[#12161C] border border-white/10 rounded-xl space-y-4">
          <h3 className="text-base font-bold text-white font-display uppercase tracking-wider border-b border-white/10 pb-3">
            Acquisition Channels
          </h3>
          <div className="space-y-3">
            {referrers.map(ref => (
              <div key={ref.source} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white">{ref.source}</span>
                  <span className="text-gray-400">{ref.count.toLocaleString()} ({ref.percentage}%)</span>
                </div>
                <div className="w-full bg-[#171C23] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full"
                    style={{ width: `${ref.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device breakdown & Live Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Distribution */}
        <div className="p-6 bg-[#12161C] border border-white/10 rounded-xl space-y-4">
          <h3 className="text-base font-bold text-white font-display uppercase tracking-wider border-b border-white/10 pb-3">
            Device Distribution
          </h3>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-gray-400">Mobile Devices</span>
              <span className="text-white font-bold">{deviceBreakdown.mobile}%</span>
            </div>
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-gray-400">Desktop / Laptop</span>
              <span className="text-white font-bold">{deviceBreakdown.desktop}%</span>
            </div>
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-gray-400">Tablet / Other</span>
              <span className="text-white font-bold">{deviceBreakdown.tablet}%</span>
            </div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="lg:col-span-2 p-6 bg-[#12161C] border border-white/10 rounded-xl space-y-4">
          <h3 className="text-base font-bold text-white font-display uppercase tracking-wider border-b border-white/10 pb-3">
            Real-Time Activity Stream
          </h3>
          <div className="space-y-2.5">
            {recentActivity.map(act => (
              <div
                key={act.id}
                className="flex items-center justify-between p-3 bg-[#171C23] border border-white/5 rounded-lg text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D94A5B]" />
                  <span className="text-white">{act.text}</span>
                </div>
                <span className="text-gray-500">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
