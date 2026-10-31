'use client'

import Link from 'next/link'
import { EMAIL } from '@/data/site'
import { openNewsletterModal } from '@/components/NewsletterModal'
import LogoFull from '@/components/LogoFull'

export default function CTABanner() {
  return (
    <section className="w-full bg-card py-space-xl px-4 lg:px-margin" id="newsletter-signup">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36 border-2 border-ink bg-paper p-4 mb-5 shadow-[4px_4px_0px_var(--brick)]">
          <LogoFull className="w-full h-full text-ink" />
        </div>

        <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-headline-lg text-ink font-bold mb-2">
          Want to stay in the loop?
        </h2>

        <p className="font-title-editorial text-base sm:text-title-editorial text-muted max-w-xl mx-auto mb-space-md">
          Sign up to hear about upcoming events, workshops and club news from the ECS department.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
          <button
            type="button"
            onClick={openNewsletterModal}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-ink bg-brick text-paper font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[4px_4px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--ink)] transition-all font-bold cursor-pointer"
          >
            Get Updates
          </button>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-ink bg-tan text-ink font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[4px_4px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--ink)] transition-all font-bold"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-space-md pt-3 border-t border-ink/20 flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-[11px] sm:text-xs font-complexity-notation text-muted">
          <span>VESIT Campus · Chembur</span>
          <span className="hidden sm:inline">·</span>
          <span>{EMAIL}</span>
          <span className="hidden sm:inline">·</span>
          <span>Dept. of ECS</span>
        </div>
      </div>
    </section>
  )
}
