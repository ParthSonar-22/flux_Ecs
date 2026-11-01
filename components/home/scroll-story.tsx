'use client'
import { useEffect, useRef, type ReactNode } from 'react'
export default function ScrollStory({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let live = true
    let revert = () => {}
    import('@/lib/gsap')
      .then(({ gsap }) => {
        if (!live) return
        const media = gsap.matchMedia()
        media.add(
          '(prefers-reduced-motion: no-preference)',
          () => {
            gsap.utils
              .toArray<HTMLElement>('[data-story]', root.current)
              .forEach((section) => {
                gsap.from(section.querySelectorAll('[data-reveal]'), {
                  y: 30,
                  opacity: 0.45,
                  stagger: 0.09,
                  duration: 0.8,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: section,
                    start: 'top 86%',
                    once: true,
                  },
                })
              })
          },
          root,
        )
        revert = () => media.revert()
      })
      .catch(() => {})
    return () => {
      live = false
      revert()
    }
  }, [])
  return <div ref={root}>{children}</div>
}
