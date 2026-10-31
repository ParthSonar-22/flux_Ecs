'use client'

export default function EventTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex items-center gap-2 p-1.5 border-2 border-ink bg-paper rounded-full inline-flex">
      <button
        type="button"
        onClick={() => onTabChange('upcoming')}
        className={`px-5 py-2 rounded-full font-label-smallcaps text-label-smallcaps uppercase tracking-wider transition-all cursor-pointer ${
          activeTab === 'upcoming'
            ? 'bg-ink text-paper font-bold shadow-[2px_2px_0px_var(--brick)]'
            : 'text-muted hover:text-ink hover:bg-card'
        }`}
      >
        Upcoming (1)
      </button>
      <button
        type="button"
        onClick={() => onTabChange('past')}
        className={`px-5 py-2 rounded-full font-label-smallcaps text-label-smallcaps uppercase tracking-wider transition-all cursor-pointer ${
          activeTab === 'past'
            ? 'bg-ink text-paper font-bold shadow-[2px_2px_0px_var(--brick)]'
            : 'text-muted hover:text-ink hover:bg-card'
        }`}
      >
        Past Archive (1)
      </button>
    </div>
  )
}
