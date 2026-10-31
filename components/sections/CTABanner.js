'use client'

import Link from 'next/link'
import { EMAIL } from '@/data/site'
import { openNewsletterModal } from '@/components/NewsletterModal'
import Logo from '@/components/Logo'

export default function CTABanner() {
  return (
    <section className="w-full bg-card py-space-xl px-4 lg:px-margin" id="newsletter-signup">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 border-2 border-ink bg-paper p-3 mb-5 shadow-[4px_4px_0px_var(--brick)]">
          <Logo className="w-full h-full text-ink" />
        </div>

        <h2 className="font-headline-lg text-headline-lg text-ink font-bold mb-2">
          Want to stay in the loop?
        </h2>

        <p className="font-title-editorial text-title-editorial text-muted max-w-xl mx-auto mb-space-md">
          Sign up to hear about upcoming events, workshops and club news from the ECS department.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={openNewsletterModal}
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-ink bg-brick text-paper font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[4px_4px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--ink)] transition-all font-bold cursor-pointer"
          >
            Get Updates
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-ink bg-tan text-ink font-label-smallcaps text-label-smallcaps uppercase tracking-wider shadow-[4px_4px_0px_var(--ink)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_var(--ink)] transition-all font-bold"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-space-md pt-3 border-t border-ink/20 flex flex-wrap justify-center items-center gap-4 text-xs font-complexity-notation text-muted">
          <span>VESIT Campus · Chembur</span>
          <span>·</span>
          <span>{EMAIL}</span>
          <span>·</span>
          <span>Dept. of Electronics & Computer Science</span>
        </div>
      </div>
    </section>
  )
}
