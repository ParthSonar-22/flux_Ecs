'use client'

import { useSyncExternalStore } from 'react'

function subscribe(callback) {
  if (typeof window === 'undefined') return () => {}
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
}

function getSnapshot() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function getServerSnapshot() {
  return 'light'
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark')
    if (isDark) {
      document.documentElement.classList.remove('dark')
      try {
        localStorage.setItem('theme', 'light')
      } catch (e) {}
    } else {
      document.documentElement.classList.add('dark')
      try {
        localStorage.setItem('theme', 'dark')
      } catch (e) {}
    }
  }

  return (
    <button
      aria-label="Toggle Theme"
      onClick={toggleTheme}
      type="button"
      className="w-10 h-10 border-2 border-ink bg-paper flex items-center justify-center text-ink shadow-[2px_2px_0px_var(--ink)] hover:bg-card active:translate-x-0.5 active:translate-y-0.5 transition-all"
    >
      <span className="material-symbols-outlined text-[20px]">
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  )
}
