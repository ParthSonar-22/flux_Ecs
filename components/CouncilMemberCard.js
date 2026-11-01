'use client'

import { useState } from 'react'
import SmartImage from './SmartImage'

export default function CouncilMemberCard({ member }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev)
  }

  const handleLinkClick = (e) => {
    e.stopPropagation()
  }

  const hasSocials = member.linkedin || member.github || member.instagram || member.phone

  return (
    <div
      className="perspective-1000 w-full min-h-[420px] select-none cursor-pointer group"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleCardClick()
        }
      }}
      aria-label={`Council Member card for ${member.name}. Click to ${isFlipped ? 'flip back' : 'view bio and social links'}.`}
      data-cursor-text={isFlipped ? 'FLIP' : 'BIO'}
    >
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-700 ease-in-out ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* ================= FRONT OF CARD ================= */}
        <div className="backface-hidden w-full h-full bg-paper border-2 border-ink shadow-[4px_4px_0px_var(--tan)] flex flex-col justify-between overflow-hidden group-hover:-translate-y-1 transition-transform">
          {/* Photo frame */}
          <div className="relative w-full aspect-[4/5] bg-tan flex items-center justify-center overflow-hidden border-b-2 border-ink">
            <SmartImage
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />

            {/* Department tag badge */}
            {member.department && (
              <span className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 border border-ink bg-paper/95 text-ink text-[11px] font-bold font-complexity-notation shadow-[2px_2px_0px_var(--ink)]">
                {member.department}
              </span>
            )}

            {/* Flip Affordance Badge */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between px-2.5 py-1.5 bg-paper/90 backdrop-blur-sm border border-ink text-ink text-[11px] font-complexity-notation shadow-[2px_2px_0px_var(--ink)] opacity-90 group-hover:opacity-100 transition-opacity">
              <span className="flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[14px] text-brick">sync</span>
                Click to flip
              </span>
              <span className="text-[10px] text-muted uppercase">Bio &amp; Links</span>
            </div>
          </div>

          {/* Front details: Name & Role only (No icons on front as per request) */}
          <div className="p-4 flex flex-col justify-between flex-1 bg-card">
            <div>
              <h3 className="font-headline-sm text-lg sm:text-headline-sm text-ink leading-tight font-bold">
                {member.name}
              </h3>
              <p className="font-label-smallcaps text-xs sm:text-label-smallcaps uppercase tracking-wider text-brick font-bold mt-1">
                {member.post || member.role}
              </p>
            </div>

            {member.quote && (
              <p className="font-title-editorial italic text-xs text-muted mt-2 line-clamp-2">
                &ldquo;{member.quote}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* ================= BACK OF CARD ================= */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 w-full h-full bg-paper border-2 border-ink shadow-[4px_4px_0px_var(--brick)] p-5 flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="border-b-2 border-ink/30 pb-3 flex items-start justify-between">
            <div>
              <span className="font-complexity-notation text-[10px] uppercase tracking-wider text-brick font-bold block">
                COUNCIL DOSSIER // {member.department || 'VESIT ECS'}
              </span>
              <h4 className="font-headline-sm text-xl text-ink font-bold leading-tight mt-0.5">
                {member.displayName || member.name}
              </h4>
              <span className="inline-block px-2 py-0.5 border border-ink bg-tan text-ink text-[11px] font-bold uppercase tracking-wider font-complexity-notation mt-1">
                {member.post || member.role}
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsFlipped(false)
              }}
              className="p-1 border border-ink bg-card text-ink hover:bg-tan active:scale-95 transition-transform"
              title="Flip back to photo"
              aria-label="Flip back to front"
            >
              <span className="material-symbols-outlined text-[18px]">replay</span>
            </button>
          </div>

          {/* Written Bio & Statement ("behind wright something") */}
          <div className="my-auto py-3 space-y-3">
            {member.quote && (
              <div className="bg-card p-3 border-l-2 border-brick border-y border-r border-ink/20">
                <span className="font-complexity-notation text-[10px] text-brick font-bold uppercase block mb-1">
                  Motto
                </span>
                <p className="font-title-editorial italic text-sm text-ink leading-snug">
                  &ldquo;{member.quote}&rdquo;
                </p>
              </div>
            )}

            <div>
              <span className="font-complexity-notation text-[10px] text-muted font-bold uppercase block mb-1">
                Brief Profile &amp; Focus
              </span>
              <p className="font-body-sm text-xs sm:text-sm text-ink leading-relaxed">
                {member.bio ||
                  `${member.name} serves as ${member.post || member.role} for FLUX-ECS, coordinating departmental projects, workshops, and student engagements.`}
              </p>
            </div>

            {member.phone && (
              <div className="flex items-center gap-2 pt-1 font-complexity-notation text-xs text-muted">
                <span className="material-symbols-outlined text-[14px] text-brick">phone</span>
                <span>{member.phone}</span>
              </div>
            )}
          </div>

          {/* Footer: Social & Profile Icons ("instead front make back the icon for the given info") */}
          <div className="border-t-2 border-ink/30 pt-3">
            <span className="font-complexity-notation text-[10px] uppercase tracking-wider text-muted font-bold block mb-2">
              Connect &amp; Social Coordinates:
            </span>

            {hasSocials ? (
              <div className="flex items-center gap-2 flex-wrap">
                {/* LinkedIn */}
                {member.linkedin ? (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 border border-ink bg-card text-ink text-xs font-complexity-notation font-bold hover:bg-brick hover:text-white transition-colors shadow-[2px_2px_0px_var(--ink)] active:translate-x-0.5 active:translate-y-0.5"
                    title={`${member.name} on LinkedIn`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                ) : null}

                {/* GitHub */}
                {member.github ? (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 border border-ink bg-card text-ink text-xs font-complexity-notation font-bold hover:bg-brick hover:text-white transition-colors shadow-[2px_2px_0px_var(--ink)] active:translate-x-0.5 active:translate-y-0.5"
                    title={`${member.name} on GitHub`}
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                ) : null}

                {/* Instagram */}
                {member.instagram ? (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 border border-ink bg-card text-ink text-xs font-complexity-notation font-bold hover:bg-brick hover:text-white transition-colors shadow-[2px_2px_0px_var(--ink)] active:translate-x-0.5 active:translate-y-0.5"
                    title={`${member.name} on Instagram`}
                  >
                    <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                    <span>Instagram</span>
                  </a>
                ) : null}
              </div>
            ) : (
              <p className="font-complexity-notation text-xs text-muted">
                Official inquiries via council desk.
              </p>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setIsFlipped(false)
              }}
              className="w-full mt-3 py-1.5 border border-ink bg-tan text-ink text-center text-xs font-complexity-notation font-bold uppercase tracking-wider hover:bg-card transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              Flip to Front
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
