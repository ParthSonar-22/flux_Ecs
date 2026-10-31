'use client'

import Link from 'next/link'
import { CLUB_NAME, TAGLINE, EMAIL, GITHUB, INSTAGRAM, ADDRESS } from '@/data/site'
import { openNewsletterModal } from './NewsletterModal'
import LogoFull from './LogoFull'

export default function Footer() {
  return (
    <footer className="w-full bg-paper border-t-2 border-ink text-ink mt-auto">
      <div className="w-full px-4 lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter pb-space-lg border-b border-ink/30">
          {/* Col 1: Brand */}
          <div className="md:col-span-5 flex flex-col justify-between pr-0 md:pr-space-md border-b md:border-b-0 md:border-r border-ink/30 pb-space-md md:pb-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-ink bg-paper flex items-center justify-center p-1.5 shadow-[3px_3px_0px_var(--brick)] shrink-0">
                  <LogoFull className="w-full h-full text-ink" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xl sm:text-2xl uppercase tracking-tight text-ink font-black leading-tight">
                    {CLUB_NAME}
                  </span>
                  <span className="font-complexity-notation text-[10px] sm:text-[11px] font-bold tracking-widest text-brick uppercase mt-0.5">
                    Dept. of ECS • VESIT
                  </span>
                </div>
              </div>
              <p className="font-title-editorial text-title-editorial italic text-brick pr-4">
                &ldquo;{TAGLINE}&rdquo;
              </p>
              <p className="font-body-sm text-body-sm text-muted max-w-sm">
                The technical club of the Department of Electronics & Computer Science at VESIT, Mumbai. We run events, show projects and learn from each other.
              </p>
            </div>
            <div className="mt-space-md">
              <a
                className="inline-flex items-center gap-2 font-complexity-notation text-complexity-notation text-brick hover:underline font-bold"
                href={GITHUB}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>github.com/Flux-ECS-Club</span>
                <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
              </a>
            </div>
          </div>

          {/* Col 2: Where to find us */}
          <div className="md:col-span-4 flex flex-col justify-between px-0 md:px-space-md border-b md:border-b-0 md:border-r border-ink/30 pb-space-md md:pb-0">
            <div className="space-y-3">
              <h3 className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-ink pb-1 font-bold">
                Find us
              </h3>
              <p className="font-body-md text-body-md text-ink leading-relaxed">
                {ADDRESS}
              </p>
            </div>
            <div className="mt-space-md space-y-2">
              <span className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-muted block font-bold">
                Email us
              </span>
              <a
                className="font-complexity-notation text-complexity-notation text-ink hover:text-brick block underline decoration-brick underline-offset-4"
                href={`mailto:${EMAIL}`}
              >
                {EMAIL}
              </a>
            </div>
          </div>

          {/* Col 3: Links */}
          <div className="md:col-span-3 flex flex-col justify-between pl-0 md:pl-space-md space-y-space-md">
            <div className="space-y-3">
              <h3 className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-ink pb-1 font-bold">
                Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    className="font-body-md text-body-md text-ink hover:text-brick transition-colors flex items-center gap-1.5"
                    href={GITHUB}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="text-brick text-xs">→</span> GitHub
                  </a>
                </li>
                <li>
                  <a
                    className="font-body-md text-body-md text-ink hover:text-brick transition-colors flex items-center gap-1.5"
                    href={INSTAGRAM}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="text-brick text-xs">→</span> Instagram
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={openNewsletterModal}
                    className="font-body-md text-body-md text-ink hover:text-brick transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-brick text-xs">→</span> Newsletter
                  </button>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="font-body-md text-body-md text-ink hover:text-brick transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-brick text-xs">→</span> Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="font-body-md text-body-md text-ink hover:text-brick transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-brick text-xs">→</span> About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="font-body-md text-body-md text-ink hover:text-brick transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-brick text-xs">→</span> Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-body-sm text-body-sm text-muted">
            © VESIT 2026. Dept. of Electronics & Computer Science.
          </span>
          <span className="font-complexity-notation text-[11px] text-muted">
            FLUX-ECS · Chembur, Mumbai 400074
          </span>
        </div>
      </div>
    </footer>
  )
}
