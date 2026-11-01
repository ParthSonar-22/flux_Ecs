'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { useReducedMotion } from 'motion/react'
import { animate, stagger } from 'animejs'
import { labConfig, subsystems, type SubsystemId } from '@/data/engineering-lab'
import type { ViewRequest } from './car-scene'
import { Arrow } from '@/components/ui/arrow'
import SceneBoundary from './scene-boundary'
import styles from './engineering-lab.module.css'

const CarScene = dynamic(() => import('./car-scene'), { ssr: false })
export default function EngineeringLab() {
  const [selected, setSelected] = useState<SubsystemId>('sensors')
  const [active, setActive] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [request, setRequest] = useState<ViewRequest>({
    type: 'reset',
    serial: 0,
  })
  const stage = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const reduced = Boolean(useReducedMotion())
  const detail =
    subsystems.find((item) => item.id === selected) ?? subsystems[0]
  const fail = useCallback(() => {
    setFailed(true)
    setActive(false)
    setReady(false)
  }, [])
  const onReady = useCallback(() => setReady(true), [])
  useEffect(() => {
    if (!active || ready) return
    const timeout = setTimeout(fail, 45000)
    return () => clearTimeout(timeout)
  }, [active, ready, fail])
  useEffect(() => {
    if (!panel.current) return
    const transition = animate(panel.current, {
      opacity: [0.7, 1],
      translateY: [reduced ? 0 : 4, 0],
      duration: reduced ? 0 : 240,
      ease: 'outCubic',
    })
    return () => {
      transition.revert()
    }
  }, [selected, reduced])
  useEffect(() => {
    if (!ready || reduced) return
    const elements = stage.current?.querySelectorAll(
      '[data-lab-hotspot], [data-lab-hud]',
    )
    if (!elements?.length) return
    const reveal = animate(elements, {
      opacity: [0, 1],
      delay: stagger(65),
      duration: 350,
      ease: 'outCubic',
    })
    return () => {
      reveal.revert()
    }
  }, [ready, reduced])
  function choose(id: SubsystemId) {
    setSelected(id)
    setRequest((current) => ({ type: 'focus', id, serial: current.serial + 1 }))
  }
  function reset() {
    setSelected('sensors')
    setRequest((current) => ({ type: 'reset', serial: current.serial + 1 }))
  }
  function orbit(x: number, y: number) {
    setRequest((current) => ({
      type: 'orbit',
      x,
      y,
      serial: current.serial + 1,
    }))
  }
  function zoom(delta: number) {
    setRequest((current) => ({
      type: 'zoom',
      delta,
      serial: current.serial + 1,
    }))
  }
  function keyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || !ready) return
    const directions: Record<string, [number, number]> = {
      ArrowLeft: [-0.25, 0],
      ArrowRight: [0.25, 0],
      ArrowUp: [0, -0.15],
      ArrowDown: [0, 0.15],
    }
    if (directions[event.key]) {
      event.preventDefault()
      orbit(...directions[event.key])
    }
    if (event.key === 'Home') {
      event.preventDefault()
      reset()
    }
    if (event.key === '+' || event.key === '=') {
      event.preventDefault()
      zoom(-0.15)
    }
    if (event.key === '-') {
      event.preventDefault()
      zoom(0.15)
    }
  }
  function toggle3D() {
    setFailed(false)
    setReady(false)
    setRequest({ type: 'reset', serial: 0 })
    setActive((value) => !value)
  }
  return (
    <section className={styles.lab} aria-labelledby="lab-title">
      <header className={styles.heading}>
        <div>
          <span className="eyebrow orange">FLUXECS / ENGINEERING STUDY</span>
          <h1 id="lab-title">
            ENGINEERING <span>LAB.</span>
          </h1>
        </div>
        <p>Explore five connected systems.</p>
      </header>
      <div className={styles.workspace}>
        <div className={styles.visualColumn}>
          <div className={styles.stageHeader}>
            <span className="mono">
              <i /> FORMULA-STYLE CONCEPT
            </span>
            <span className="mono">
              {ready ? 'INTERACTIVE 3D' : 'STUDIO VIEW'}
            </span>
          </div>
          <div
            ref={stage}
            className={styles.stage}
            role="group"
            tabIndex={ready ? 0 : -1}
            onKeyDown={keyboard}
            aria-label="Engineering car viewer. Arrow keys rotate, plus and minus zoom, Home resets."
          >
            <Image
              src={labConfig.poster}
              alt="Carbon and titanium low-poly formula-style car with orange accents and an original FluxECS mark"
              fill
              sizes="(max-width:850px) 100vw,72vw"
              className={styles.poster}
              priority
            />
            {active && (
              <SceneBoundary
                key={active ? '3d' : 'poster'}
                onError={fail}
                fallback={
                  <div className={styles.sceneNotice}>
                    3D is unavailable. Continue with the studio view.
                  </div>
                }
              >
                <CarScene
                  selected={selected}
                  request={request}
                  reduced={reduced}
                  onSelect={choose}
                  onReady={onReady}
                  onFailure={fail}
                />
              </SceneBoundary>
            )}
            {!active && (
              <div
                className={styles.staticHotspots}
                aria-label="Conceptual subsystem locations"
              >
                {subsystems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    style={{
                      left: `${item.position.left}%`,
                      top: `${item.position.top}%`,
                    }}
                    className={
                      selected === item.id ? styles.hotspotSelected : ''
                    }
                    aria-label={`${item.number} ${item.name}`}
                    aria-pressed={selected === item.id}
                    aria-controls="lab-system-panel"
                    onClick={() => choose(item.id)}
                  >
                    <span>{item.number}</span>
                    <span className={styles.hotspotName}>{item.name}</span>
                  </button>
                ))}
              </div>
            )}
            {active && !ready && (
              <div className={styles.loading} role="status">
                Opening the 3D view…
              </div>
            )}
            <div className={styles.stageCaption} data-lab-hud>
              <span className="mono">
                {ready
                  ? 'DRAG TO ROTATE · SCROLL TO ZOOM'
                  : 'SELECT A SYSTEM TO EXPLORE'}
              </span>
            </div>
          </div>
          <div className={styles.toolbar}>
            <div>
              <button
                className="button-primary"
                type="button"
                onClick={toggle3D}
              >
                {active ? 'Studio view' : 'Explore in 3D'} <Arrow />
              </button>
              <button
                type="button"
                className={styles.reset}
                onClick={reset}
                aria-label="Reset view and selected system"
              >
                <span aria-hidden="true">↻</span> Reset view
              </button>
            </div>
          </div>
          {ready && (
            <div className={styles.viewControls} aria-label="Camera controls">
              <button
                type="button"
                onClick={() => orbit(-0.25, 0)}
                aria-label="Rotate left"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => orbit(0.25, 0)}
                aria-label="Rotate right"
              >
                →
              </button>
              <button
                type="button"
                onClick={() => orbit(0, -0.15)}
                aria-label="Orbit up"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => orbit(0, 0.15)}
                aria-label="Orbit down"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => zoom(-0.15)}
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => zoom(0.15)}
                aria-label="Zoom out"
              >
                −
              </button>
              <span className="mono">DRAG OR USE THE CONTROLS</span>
            </div>
          )}
          <p className={styles.status} role="status">
            {failed
              ? 'This device could not open 3D. The system guide is still available.'
              : active && !ready
                ? 'Loading is optional. Return to studio view at any time.'
                : reduced
                  ? 'Reduced motion on. Camera changes are immediate.'
                  : 'Educational concept. Subsystem locations are illustrative.'}
          </p>
        </div>
        <aside className={styles.infoColumn} aria-label="Engineering systems">
          <div className={styles.systemsLabel}>
            <span className="eyebrow">EXPLORE THE SYSTEMS</span>
          </div>
          <div className={styles.systemList}>
            {subsystems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={selected === item.id ? styles.systemSelected : ''}
                aria-pressed={selected === item.id}
                aria-controls="lab-system-panel"
                onClick={() => choose(item.id)}
              >
                <span className="mono">{item.number}</span>
                <span>{item.name}</span>
                <Arrow />
              </button>
            ))}
          </div>
          <div
            ref={panel}
            id="lab-system-panel"
            className={styles.panel}
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="eyebrow orange">SYSTEM / {detail.number}</span>
            <h2>{detail.title}</h2>
            <p>{detail.description}</p>
            <div className={styles.signal}>
              <span className="mono">SIGNAL PATH</span>
              <p>{detail.signal}</p>
            </div>
            <dl>
              <div>
                <dt>HARDWARE</dt>
                <dd>{detail.hardware}</dd>
              </div>
              <div>
                <dt>SOFTWARE</dt>
                <dd>{detail.software}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
      <footer className={styles.credits}>
        <p>
          Model adapted from{' '}
          <a href={labConfig.modelSource} target="_blank" rel="noreferrer">
            {labConfig.modelAuthor}
          </a>{' '}
          ·{' '}
          <a href={labConfig.license} target="_blank" rel="noreferrer">
            CC0
          </a>
          . FluxECS materials and presentation.
        </p>
        <span>Three.js · React Three Fiber · Anime.js</span>
      </footer>
    </section>
  )
}
