'use client'
import Link from 'next/link'
import Logo from '@/components/Logo'
import LogoWordmark from '@/components/LogoWordmark'
import HalftoneWordmarkFooter from '@/components/ui/halftone-wordmark-footer'
import { ADDRESS, EMAIL, GITHUB, INSTAGRAM } from '@/data/site'
import styles from '@/components/ui/halftone-wordmark-footer.module.css'

export default function HomeFooter() {
  return (
    <HalftoneWordmarkFooter>
      <div className={styles.top}>
        <div>
          <Link href="/" aria-label="FluxECS home" className={styles.brand}>
            <Logo className={styles.emblem} />
            <LogoWordmark className={styles.wordmark} />
          </Link>
          <p className={styles.identity}>
            Electronics &amp; Computer Science Council
            <br />
            VESIT, Mumbai
          </p>
        </div>
        <nav className={styles.links} aria-label="Footer navigation">
          <Link href="/events">Events</Link>
          <Link href="/about">About Council</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/admin">Secretariat Admin</Link>
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
        </nav>
        <div className={styles.contact}>
          <p>{ADDRESS}</p>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} FluxECS · Department of Electronics &amp; Computer Science · VESIT</span>
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: matchMedia('(prefers-reduced-motion:reduce)').matches
                ? 'instant'
                : 'smooth',
            })
          }
        >
          Back to top ↑
        </button>
      </div>
    </HalftoneWordmarkFooter>
  )
}
