'use client'
import { useState } from 'react'
import Image from 'next/image'
import { splineScene } from '@/data/media'
/** Scene remains opt-in. No runtime or third-party scene loads without a licensed URL. */
export default function SplineStage() {
  const [active, setActive] = useState(false)
  const eligible = Boolean(splineScene.url && splineScene.license)
  return (
    <div className="spline-stage">
      <Image
        src="/media/engineering-car.svg"
        alt="Original concept illustration of a formula-style engineering chassis"
        fill
        sizes="(max-width: 900px) 100vw, 50vw"
      />
      {eligible && (
        <button
          type="button"
          className="button-ghost"
          onClick={() => setActive(true)}
        >
          Explore in 3D ↗
        </button>
      )}
      {active && eligible && (
        <iframe
          title="Interactive engineering concept"
          src={splineScene.url}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin"
        />
      )}
      <span className="mono">DESIGN STUDY / ORIGINAL CHASSIS CONCEPT</span>
    </div>
  )
}
