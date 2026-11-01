'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function SmartImage({
  src,
  alt = 'Image',
  fallbackText = 'FLUX-ECS',
  className = '',
  fill = false,
  width,
  height,
  priority = false,
  sizes,
  ...props
}) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const isLocalOrAbsolute =
    typeof src === 'string' &&
    (src.startsWith('/') || src.startsWith('http://') || src.startsWith('https://'))

  if (!src || error || !isLocalOrAbsolute) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-card border border-ink/20 text-ink/70 p-4 select-none ${className}`}
        style={width && height && !fill ? { width, height } : {}}
      >
        <div className="w-10 h-10 border border-ink/30 bg-paper/60 rounded-full flex items-center justify-center mb-2">
          <span className="material-symbols-outlined text-brick text-lg">image</span>
        </div>
        <span className="font-complexity-notation text-[11px] uppercase tracking-wider text-muted font-bold text-center line-clamp-1">
          {alt || fallbackText}
        </span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''}`}>
      {loading && (
        <div className="absolute inset-0 bg-tan/20 animate-pulse z-10 flex items-center justify-center">
          <span className="material-symbols-outlined text-ink/30 text-xl animate-spin">
            progress_activity
          </span>
        </div>
      )}

      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
          priority={priority}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true)
            setLoading(false)
          }}
          className={`transition-opacity duration-300 ${
            loading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
          {...props}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 600}
          height={height || 400}
          priority={priority}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true)
            setLoading(false)
          }}
          className={`transition-opacity duration-300 ${
            loading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  )
}
