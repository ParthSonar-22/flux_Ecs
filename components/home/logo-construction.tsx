'use client'

import { useEffect, useRef } from 'react'
import Logo from '@/components/Logo'
import LogoWordmark from '@/components/LogoWordmark'
import styles from './identity-hero.module.css'

/** Exact official paths, animated in place. No logo approximation or Remotion runtime. */
export default function LogoConstruction({
  onComplete,
}: {
  onComplete: () => void
}) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let live = true
    let dispose = () => {}
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    const timeout = setTimeout(onComplete, reduced ? 650 : 2350)
    if (!reduced) {
      import('animejs')
        .then(({ createTimeline, svg }) => {
          if (!live || !root.current) return
          root.current.dataset.animating = 'true'
          const lines =
            root.current.querySelectorAll<SVGGeometryElement>('[data-guide]')
          const emblem =
            root.current.querySelectorAll<SVGPathElement>('[data-emblem] path')
          const wordmark = root.current.querySelectorAll<SVGPathElement>(
            '[data-wordmark] path',
          )
          const timeline = createTimeline()
            .add(
              svg.createDrawable(lines),
              { draw: ['0 0', '0 1'], opacity: [0, 0.65], duration: 450 },
              0,
            )
            .add(
              svg.createDrawable(emblem),
              { draw: ['0 0', '0 1'], duration: 950, ease: 'inOutQuad' },
              150,
            )
            .add(
              emblem,
              { fillOpacity: [0, 1], strokeOpacity: [1, 0], duration: 450 },
              950,
            )
            .add(
              wordmark,
              {
                opacity: [0, 1],
                translateY: [8, 0],
                duration: 500,
                ease: 'outCubic',
              },
              1050,
            )
            .add(lines, { opacity: 0, duration: 350 }, 1450)
            .add(
              root.current,
              {
                scale: [1, 0.98],
                opacity: [1, 0.85],
                duration: 400,
                ease: 'inOutQuad',
              },
              1850,
            )
          dispose = () => timeline.revert()
        })
        .catch(() => { if (root.current) delete root.current.dataset.animating })
    }
    return () => {
      live = false
      clearTimeout(timeout)
      dispose()
    }
  }, [onComplete])
  return (
    <div
      ref={root}
      className={styles.construction}
      role="status"
      aria-label="FluxECS logo reveal"
    >
      <svg
        className={styles.guides}
        viewBox="0 0 800 600"
        fill="none"
        aria-hidden="true"
      >
        <g stroke="currentColor" strokeWidth=".7">
          <path
            data-guide
            d="M80 100H720M80 420H720M80 510H720M180 50V550M620 50V550M400 30V570"
          />
          <circle data-guide cx="400" cy="260" r="170" />
          <circle data-guide cx="400" cy="260" r="135" />
          <path
            data-guide
            d="M155 460L400 35L645 460ZM155 60L645 460M645 60L155 460"
          />
        </g>
      </svg>
      <div data-emblem className={styles.constructEmblem}>
        <Logo className="w-full h-full" />
      </div>
      <div data-wordmark className={styles.constructWordmark}>
        <LogoWordmark className="w-full h-full" />
      </div>
    </div>
  )
}
