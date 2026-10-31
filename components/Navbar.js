'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import NewsletterModal, { openNewsletterModal } from './NewsletterModal'

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  const isActive = (href) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-paper/95 backdrop-blur-md border-b-2 border-ink">
        <div className="h-20 w-full px-4 lg:px-margin flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 border-2 border-ink bg-paper flex items-center justify-center p-1 shadow-[2px_2px_0px_var(--brick)] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none">
                <Image
                  src="/logo-flux.png"
                  alt="FLUX-ECS Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain dark:invert"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm uppercase tracking-wider text-ink leading-none">
                  FLUX-ECS
                </span>
                <span className="font-complexity-notation text-[10px] tracking-widest text-muted uppercase mt-1">
                  Dept. of ECS • VESIT
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Pills */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1.5 rounded-full border-2 border-ink bg-paper">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-1.5 rounded-full uppercase transition-all ${
                    active
                      ? 'bg-ink text-paper font-bold shadow-[2px_2px_0px_var(--brick)]'
                      : 'font-label-smallcaps text-label-smallcaps text-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openNewsletterModal}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 border-2 border-ink bg-paper text-ink font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[3px_3px_0px_var(--tan)] hover:bg-card active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              Newsletter
            </button>
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-5 py-2 border-2 border-ink bg-brick text-paper font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[4px_4px_0px_var(--brick)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--brick)] transition-all font-bold"
            >
              Explore Events
            </Link>
            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 border-2 border-ink bg-paper flex items-center justify-center text-ink shadow-[2px_2px_0px_var(--ink)] active:translate-x-0.5 active:translate-y-0.5"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[22px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with CSS transition */}
        <div
          className={`lg:hidden border-t-2 border-ink bg-paper px-4 py-4 transition-all duration-200 ${
            mobileMenuOpen ? 'block opacity-100' : 'hidden opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 border-2 border-ink text-sm uppercase tracking-wider font-label-smallcaps transition-all ${
                    active
                      ? 'bg-ink text-paper font-bold shadow-[2px_2px_0px_var(--brick)]'
                      : 'bg-card text-ink hover:bg-tan'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                openNewsletterModal()
              }}
              className="w-full text-left px-4 py-2.5 border-2 border-ink bg-tan text-ink text-sm uppercase tracking-wider font-label-smallcaps font-bold mt-2"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </header>
      <NewsletterModal />
    </>
  )
}
