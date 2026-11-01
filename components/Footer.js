'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import HomeFooter from '@/components/home/home-footer'
import Logo from '@/components/Logo'
import LogoWordmark from '@/components/LogoWordmark'
import { EMAIL, GITHUB, INSTAGRAM, ADDRESS } from '@/data/site'
import NewsletterModal, { openNewsletterModal } from './NewsletterModal'
import { Arrow } from '@/components/ui/arrow'
export default function Footer() {
  const pathname = usePathname()
  if (pathname === '/') return <HomeFooter />
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link
            href="/"
            className="footer-brand official-footer-brand"
            aria-label="FluxECS home"
          >
            <Logo className="official-emblem" />
            <LogoWordmark className="official-wordmark" />
          </Link>
          <p>
            Electronics &amp; Computer Science.
            <br />
            VESIT, Mumbai.
          </p>
        </div>
        <div className="footer-links">
          <Link href="/events">
            Events <Arrow />
          </Link>
          <Link href="/about">
            Our council <Arrow />
          </Link>
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub <Arrow />
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer">
            Instagram <Arrow />
          </a>
          <button type="button" onClick={openNewsletterModal}>
            Newsletter <Arrow />
          </button>
        </div>
        <div className="footer-contact">
          <span className="eyebrow">FIND THE WORKSHOP</span>
          <p>{ADDRESS}</p>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
      <div className="footer-bottom mono">
        <span>© {new Date().getFullYear()} FLUXECS · VESIT, MUMBAI</span>
        <span>HARDWARE × SOFTWARE × PEOPLE</span>
        <Link href="/contact">Get in touch ↗</Link>
      </div>
      <NewsletterModal />
    </footer>
  )
}
