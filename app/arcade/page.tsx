'use client'

import { useState } from 'react'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import FluxGrandPrixModal from '@/components/arcade/FluxGrandPrixModal'

export default function ArcadePage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Reveal>
      <div className="flex flex-col w-full bg-transparent text-[#EFF0F2] min-h-screen">
        {/* Header */}
        <header className="w-full px-6 lg:px-12 pt-36 lg:pt-40 pb-16 border-b border-white/10 bg-gradient-to-b from-[#12161C] to-[#0D1014] relative overflow-hidden text-center">
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #d94a5b 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="max-w-3xl mx-auto flex flex-col items-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B2026] border border-white/15 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#D94A5B]" />
              <span className="font-mono text-xs text-[#9EA6AF] uppercase tracking-wider">
                FluxECS Interactive Simulation
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-none">
              FLUX GRAND PRIX.
            </h1>

            <p className="text-base sm:text-lg text-[#9EA6AF] max-w-xl leading-relaxed font-body">
              A high-octane 30-second engineering sprint. Collect Software, Hardware, and Robotics telemetry checkpoints, steer through corners, and unlock recommended guides.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="px-8 py-3.5 rounded bg-[#D94A5B] hover:bg-[#e45a6b] text-white font-mono text-sm uppercase tracking-wider font-bold transition-all shadow-[0_4px_24px_rgba(217,74,91,0.4)] flex items-center gap-2"
              >
                <span>🏁</span>
                <span>Launch Flux Grand Prix</span>
                <span>→</span>
              </button>

              <Link
                href="/blog"
                className="px-6 py-3.5 rounded border border-white/15 bg-[#171C23] hover:bg-[#202630] text-[#9EA6AF] hover:text-white font-mono text-sm uppercase tracking-wider transition-all"
              >
                Browse Guides Instead
              </Link>
            </div>
          </div>
        </header>

        {/* Rules & Checkpoints Showcase */}
        <section className="w-full px-6 lg:px-12 py-16 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-mono text-xs uppercase tracking-wider text-[#D94A5B] font-semibold">
              TELEMETRY TOKENS &amp; HAZARDS
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold uppercase text-white mt-1">
              HOW TO SCORE POINTS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-white/10 bg-[#141920]">
              <span className="inline-block px-2.5 py-1 rounded bg-[#63c9ff]/15 border border-[#63c9ff]/40 text-[#63c9ff] font-mono font-bold text-xs uppercase mb-3">
                SW · SOFTWARE
              </span>
              <h3 className="font-display text-lg font-bold text-white uppercase mb-2">
                Programming &amp; Algorithms
              </h3>
              <p className="text-xs text-[#9EA6AF] leading-relaxed">
                Represents full-stack web architectures, graph algorithms, telemetry streaming, and competitive coding logic.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-[#141920]">
              <span className="inline-block px-2.5 py-1 rounded bg-[#ffc36c]/15 border border-[#ffc36c]/40 text-[#ffc36c] font-mono font-bold text-xs uppercase mb-3">
                HW · HARDWARE
              </span>
              <h3 className="font-display text-lg font-bold text-white uppercase mb-2">
                Circuits &amp; Microcontrollers
              </h3>
              <p className="text-xs text-[#9EA6AF] leading-relaxed">
                Represents STM32 bare-metal registers, multi-layer KiCad PCB routing, power regulation, and bench testing in Lab 201.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-[#141920]">
              <span className="inline-block px-2.5 py-1 rounded bg-[#b6a1ff]/15 border border-[#b6a1ff]/40 text-[#b6a1ff] font-mono font-bold text-xs uppercase mb-3">
                RB · ROBOTICS
              </span>
              <h3 className="font-display text-lg font-bold text-white uppercase mb-2">
                ROS 2 &amp; Autonomous Systems
              </h3>
              <p className="text-xs text-[#9EA6AF] leading-relaxed">
                Represents differential drive kinematics, LiDAR Cartographer SLAM, optical encoders, and real-time motor control.
              </p>
            </div>
          </div>
        </section>

        {/* Modal */}
        <FluxGrandPrixModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </Reveal>
  )
}
