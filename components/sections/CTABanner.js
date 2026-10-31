'use client'

import Image from 'next/image'
import Link from 'next/link'
import { EMAIL } from '@/data/site'
import { openNewsletterModal } from '@/components/NewsletterModal'

export default function CTABanner() {
  return (
    <section className="w-full bg-card py-space-xl px-4 lg:px-margin" id="newsletter-signup">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-ink bg-brick p-1.5 mb-4">
          <Image
            src="/logo-flux.png"
            alt="FLUX-ECS"
            width={36}
            height={36}
            className="w-full h-full object-contain dark:invert"
          />
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
            Say hi
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
