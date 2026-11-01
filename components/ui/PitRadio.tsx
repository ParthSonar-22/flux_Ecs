'use client'

import { useEffect, useState } from 'react'
import { radioTrack } from '@/data/radio'
import {
  getRadioAudio,
  playRadio,
  pauseRadio,
  toggleRadio,
  subscribeRadio,
} from '@/lib/radio-player'

type Track = { title: string; artist?: string; src: string }

export default function PitRadio({ track = radioTrack }: { track?: Track }) {
  const [playing, setPlaying] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.65)

  useEffect(() => {
    const unsub = subscribeRadio(isPlaying => {
      setPlaying(isPlaying)
    })
    const handleToggle = () => void toggleRadio()
    const handlePlay = () => void playRadio()
    const handlePause = () => void pauseRadio()

    window.addEventListener('flux:toggle-radio', handleToggle)
    window.addEventListener('flux:play-radio', handlePlay)
    window.addEventListener('flux:pause-radio', handlePause)
    window.addEventListener('flux:radio-play', handlePlay)
    window.addEventListener('flux:radio-pause', handlePause)

    return () => {
      unsub()
      window.removeEventListener('flux:toggle-radio', handleToggle)
      window.removeEventListener('flux:play-radio', handlePlay)
      window.removeEventListener('flux:pause-radio', handlePause)
      window.removeEventListener('flux:radio-play', handlePlay)
      window.removeEventListener('flux:radio-pause', handlePause)
    }
  }, [])

  return (
    <aside className="pit-radio" aria-label="Pit Radio Player">
      {expanded && (
        <div className="pit-radio-panel" id="radio-controls">
          <div className="pit-radio-panel-header">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${playing ? 'bg-[#D94A5B] animate-pulse' : 'bg-gray-500'}`} />
              <strong className="font-mono text-xs uppercase tracking-wider text-white">
                Pit Radio // Team Comms
              </strong>
            </div>
            <span className="font-mono text-[10px] text-[#D94A5B]">CH-01</span>
          </div>

          <div className="pit-radio-track-info">
            <p className="pit-radio-title">{track.title}</p>
            {track.artist && <p className="pit-radio-artist">{track.artist}</p>}
          </div>

          <div className="pit-radio-controls-row">
            <button
              type="button"
              className="pit-radio-mute-btn"
              onClick={() => {
                const audio = getRadioAudio()
                if (audio) {
                  audio.muted = !muted
                  setMuted(!muted)
                }
              }}
              aria-pressed={muted}
            >
              {muted ? 'Unmute 🔇' : 'Mute 🔊'}
            </button>
            <label className="pit-radio-volume-label">
              <span className="sr-only">Volume</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={e => {
                  const v = Number(e.target.value)
                  setVolume(v)
                  const audio = getRadioAudio()
                  if (audio) audio.volume = v
                }}
                className="pit-radio-slider"
              />
            </label>
          </div>
        </div>
      )}

      <div className={`pit-radio-bar ${playing ? 'is-playing' : ''}`}>
        <button
          type="button"
          className="radio-play"
          aria-label={playing ? 'Pause radio' : 'Play radio'}
          onClick={() => void toggleRadio()}
        >
          {playing ? (
            <span className="radio-bars-active" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          ) : (
            <span className="radio-play-icon" aria-hidden="true">▶</span>
          )}
        </button>

        <button
          type="button"
          className="radio-toggle-btn"
          aria-expanded={expanded}
          aria-controls="radio-controls"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="radio-label">
            {playing ? 'TEAM RADIO ON' : 'PIT RADIO'}
          </span>
          <span className="radio-expand-icon" aria-hidden="true">
            {expanded ? '−' : '+'}
          </span>
        </button>
      </div>
    </aside>
  )
}
