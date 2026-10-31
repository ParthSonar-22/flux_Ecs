'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
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
        {mounted && theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  )
}
