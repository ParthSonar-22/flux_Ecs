'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'
import Logo from '@/components/Logo'
import LogoWordmark from '@/components/LogoWordmark'
import { Arrow } from '@/components/ui/arrow'

const items = [
  ['Home', '/'],
  ['Events', '/events'],
  ['Blog', '/blog'],
  ['Resources', '/resources'],
  ['About', '/about'],
  ['Contact', '/contact'],
]


export default function Navbar() {
  const pathname = usePathname()
  const menu = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  function closeMenu() {
    menu.current?.close()
    setOpen(false)
  }

  const active = (href) =>
    !href.includes('#') &&
    (href === '/' ? pathname === '/' : pathname.startsWith(href))

  return (
    <>
      <header
        className={`site-header ${scrolled || pathname !== '/' ? 'is-solid' : ''}`}
      >
        <Link href="/" aria-label="FluxECS home" className="brand">
          <Logo className="official-emblem" />
          <LogoWordmark className="official-wordmark" />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {items.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              aria-current={active(href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="nav-cta">
          Get in touch <Arrow />
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-label="Open navigation"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => {
            menu.current?.showModal()
            setOpen(true)
          }}
        >
          <span />
          <span />
        </button>
      </header>
      <dialog
        ref={menu}
        id="mobile-menu"
        className="mobile-dialog"
        aria-label="Navigation"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu()
        }}
      >
        <motion.div
          className="mobile-menu-panel"
          initial={false}
          animate={{ opacity: open ? 1 : 0, y: open ? 0 : -12 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
        >
          <div className="mobile-menu-head">
            <span className="mono">FluxECS / Navigation</span>
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation"
            >
              Close ×
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {items.map(([label, href], index) => (
              <Link
                key={label}
                href={href}
                onClick={closeMenu}
                aria-current={active(href) ? 'page' : undefined}
              >
                <span className="mono">0{index + 1}</span>
                {label}
                <Arrow />
              </Link>
            ))}
          </nav>
          <p className="mono">Electronics &amp; Computer Science Council</p>
        </motion.div>
      </dialog>
    </>

  )
}
