'use client'

import { useEffect, useRef, useState } from 'react'
import { radioTrack } from '@/data/radio'

type Track = { title: string; artist?: string; src: string }
export default function PitRadio({ track = radioTrack }: { track?: Track }) {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [muted, setMuted] = useState(false)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    if (!track.src) return
    const el = new Audio(track.src)
    el.preload = 'none'
    el.volume = 0.35
    audio.current = el
    const change = () => {
      setPlaying(!el.paused)
      window.dispatchEvent(new CustomEvent('flux:radio-change', { detail: { isPlaying: !el.paused } }))
    }
    const fail = () => { setFailed(true); setPlaying(false) }
    const toggle = () => { if (el.paused) void el.play().catch(fail); else el.pause() }
    el.addEventListener('play', change)
    el.addEventListener('pause', change)
    el.addEventListener('error', fail)
    window.addEventListener('flux:toggle-radio', toggle)
    window.addEventListener('flux:query-radio', change)
    return () => {
      el.pause()
      el.removeAttribute('src')
      el.load()
      el.removeEventListener('play', change)
      el.removeEventListener('pause', change)
      el.removeEventListener('error', fail)
      window.removeEventListener('flux:toggle-radio', toggle)
      window.removeEventListener('flux:query-radio', change)
      audio.current = null
    }
  }, [track.src])
  return <aside className="pit-radio" aria-label="PitRadio">
    {expanded && <div className="pit-radio-panel" id="radio-controls">
      <strong>PitRadio</strong>
      <p>{!track.src ? 'The next listening session is being prepared.' : failed ? 'This audio is unavailable. Try again later.' : track.title}</p>
      {track.src && !failed && <>
        <button type="button" onClick={() => { if (audio.current) { audio.current.muted = !muted; setMuted(!muted) } }} aria-pressed={muted}>{muted ? 'Unmute' : 'Mute'}</button>
        <label>Volume<input type="range" min="0" max="1" step="0.05" defaultValue="0.35" onChange={e => { if (audio.current) audio.current.volume = Number(e.target.value) }} /></label>
      </>}
    </div>}
    <div className="pit-radio-bar">
      <button type="button" className="radio-play" disabled={!track.src || failed} aria-label={playing ? 'Pause radio' : 'Play radio'} onClick={() => window.dispatchEvent(new Event('flux:toggle-radio'))}>{playing ? 'Ⅱ' : '▶'}</button>
      <button type="button" aria-expanded={expanded} aria-controls="radio-controls" onClick={() => setExpanded(!expanded)}>PitRadio <span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
    </div>
  </aside>
}
