'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CLUB_NAME, TAGLINE, EMAIL, GITHUB, INSTAGRAM, ADDRESS } from '@/data/site'
import { openNewsletterModal } from './NewsletterModal'

export default function Footer() {
  return (
    <footer className="w-full bg-paper border-t-2 border-ink text-ink mt-auto">
      <div className="w-full px-4 lg:px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter pb-space-lg border-b-2 border-ink">
          {/* Col 1: Club Brand & Mission */}
          <div className="md:col-span-5 flex flex-col justify-between pr-0 md:pr-space-md border-b md:border-b-0 md:border-r-2 border-ink pb-space-md md:pb-0">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 border-2 border-ink bg-brick text-paper flex items-center justify-center p-1 shadow-[2px_2px_0px_var(--ink)]">
                  <Image
                    src="/logo-flux.png"
                    alt={`${CLUB_NAME} Logo`}
                    width={28}
                    height={28}
                    className="w-full h-full object-contain dark:invert"
                  />
                </div>
                <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-ink font-bold">
                  {CLUB_NAME}
                </span>
              </div>
              <p className="font-title-editorial text-title-editorial italic text-brick pr-4">
                &ldquo;{TAGLINE}&rdquo;
              </p>
              <p className="font-body-sm text-body-sm text-muted max-w-sm">
                The premier departmental collective of Electronics &amp; Computer Science, fostering algorithmic rigour, hardware craftsmanship, and intellectual inquiry.
              </p>
            </div>
            <div className="mt-space-md pt-space-sm border-t border-ink/30">
              <span className="font-complexity-notation text-[11px] uppercase tracking-widest text-muted block mb-1">
                Canonical Repository:
              </span>
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

          {/* Col 2: Department Secretariat */}
          <div className="md:col-span-4 flex flex-col justify-between px-0 md:px-space-md border-b md:border-b-0 md:border-r-2 border-ink pb-space-md md:pb-0">
            <div className="space-y-3">
              <h3 className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-ink border-b border-ink pb-1 font-bold">
                Department Secretariat
              </h3>
              <p className="font-body-md text-body-md text-ink leading-relaxed whitespace-pre-line">
                {ADDRESS}
              </p>
            </div>
            <div className="mt-space-md space-y-2">
              <span className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-muted block font-bold">
                Inquiries &amp; Dispatches
              </span>
              <a
                className="font-complexity-notation text-complexity-notation text-ink hover:text-brick block underline decoration-brick underline-offset-4"
                href={`mailto:${EMAIL}`}
              >
                {EMAIL}
              </a>
            </div>
          </div>

          {/* Col 3: Archival Registry */}
          <div className="md:col-span-3 flex flex-col justify-between pl-0 md:pl-space-md space-y-space-md">
            <div className="space-y-3">
              <h3 className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-ink border-b border-ink pb-1 font-bold">
                Archival Registry
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <a
                    className="font-body-md text-body-md text-ink hover:text-brick transition-colors flex items-center gap-1.5"
                    href={GITHUB}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="font-complexity-notation text-xs">&bull;</span> GitHub
                  </a>
                  <span className="font-complexity-notation text-[11px] text-muted uppercase">
                    [Source Code]
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <a
                    className="font-body-md text-body-md text-ink hover:text-brick transition-colors flex items-center gap-1.5"
                    href={INSTAGRAM}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="font-complexity-notation text-xs">&bull;</span> Instagram
                  </a>
                  <span className="font-complexity-notation text-[11px] text-muted uppercase">
                    [Exhibitions]
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={openNewsletterModal}
                    className="font-body-md text-body-md text-ink hover:text-brick transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="font-complexity-notation text-xs">&bull;</span> Newsletter
                  </button>
                  <span className="font-complexity-notation text-[11px] text-muted uppercase">
                    [Dispatch]
                  </span>
                </li>
              </ul>
            </div>
            <div className="border-2 border-ink bg-tan p-3 shadow-[3px_3px_0px_var(--ink)]">
              <div className="flex items-center justify-between">
                <span className="font-label-smallcaps text-label-smallcaps uppercase text-ink font-bold">
                  Terminal Node
                </span>
                <span className="font-complexity-notation text-complexity-notation text-ink font-bold">
                  ECS-2026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-complexity-notation text-[12px] uppercase text-ink font-bold">
              &sect; BROADSHEET GAZETTE NO. 26
            </span>
            <span className="text-brick">&bull;</span>
            <span className="font-body-sm text-body-sm text-muted">
              &copy; VESIT 2026. All rights preserved under academic charter.
            </span>
          </div>
          <div className="flex items-center gap-2 font-complexity-notation text-[11px] text-muted uppercase tracking-wider">
            <span>Complexity Index:</span>
            <span className="px-1.5 py-0.5 border border-ink bg-paper text-ink font-bold">
              O(1)
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
