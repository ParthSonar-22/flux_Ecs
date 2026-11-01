'use client'

import { useState } from 'react'

export default function BlogDetailClient({ content = '', attachments = [], tags = [] }) {
  const [copiedIndex, setCopiedIndex] = useState(null)

  function copyCode(code, index) {
    navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  // Simple, robust markdown parser for headings, code blocks, callouts and lists
  const renderedBlocks = parseMarkdownBlocks(content)

  return (
    <div className="flex flex-col space-y-10">
      {/* ── Rendered Guide Body ───────────────────────────────────────── */}
      <article className="prose prose-invert max-w-none space-y-6 text-[#EFF0F2] font-body leading-relaxed text-base sm:text-lg">
        {renderedBlocks.map((block, idx) => {
          if (block.type === 'h2') {
            return (
              <h2 key={idx} className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mt-10 pt-4 border-t border-white/10">
                {block.content}
              </h2>
            )
          }
          if (block.type === 'h3') {
            return (
              <h3 key={idx} className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#EFF0F2] mt-8">
                {block.content}
              </h3>
            )
          }
          if (block.type === 'code') {
            return (
              <div key={idx} className="relative rounded-lg overflow-hidden border border-white/15 bg-[#0A0D12] my-6 font-mono text-xs sm:text-sm shadow-xl">
                <div className="flex items-center justify-between px-4 py-2 bg-[#12161C] border-b border-white/10 text-xs text-[#9EA6AF]">
                  <span className="uppercase tracking-wider">{block.lang || 'code'}</span>
                  <button
                    type="button"
                    onClick={() => copyCode(block.code, idx)}
                    className="hover:text-white transition-colors flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10"
                  >
                    <span>{copiedIndex === idx ? '✓ Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto text-[#EFF0F2] leading-relaxed">
                  <code>{block.code}</code>
                </pre>
              </div>
            )
          }
          if (block.type === 'callout') {
            return (
              <div key={idx} className="my-6 p-4 rounded-lg border-l-4 border-[#D94A5B] bg-[#171C23] text-sm text-[#EFF0F2] flex items-start gap-3">
                <span className="text-[#D94A5B] font-bold text-base">✦</span>
                <div className="leading-relaxed">{block.content}</div>
              </div>
            )
          }
          if (block.type === 'list') {
            return (
              <ul key={idx} className="list-disc list-inside space-y-1.5 my-4 text-[#9EA6AF] pl-2">
                {block.items.map((it, i) => (
                  <li key={i}><span className="text-[#EFF0F2]">{it}</span></li>
                ))}
              </ul>
            )
          }
          return (
            <p key={idx} className="text-[#B5BCC6] leading-relaxed">
              {block.content}
            </p>
          )
        })}
      </article>

      {/* ── Attachments & Downloadable Materials ──────────────────────── */}
      {attachments && attachments.length > 0 && (
        <div className="mt-12 p-6 rounded-xl border border-white/15 bg-[#141920] shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#D94A5B] font-semibold">
              DOCUMENTATION &amp; ATTACHMENTS
            </span>
            <span className="text-xs text-[#656D7A]">({attachments.length} files)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {attachments.map((att, i) => (
              <a
                key={i}
                href={att.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-lg border border-white/10 bg-[#0D1014] hover:border-[#D94A5B]/40 hover:bg-[#1B2026] transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="px-2 py-1 rounded bg-[#D94A5B]/15 border border-[#D94A5B]/30 text-[10px] font-mono text-[#D94A5B] font-bold uppercase">
                    {att.type || 'FILE'}
                  </span>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-white group-hover:text-[#D94A5B] transition-colors truncate">
                      {att.title}
                    </p>
                    <span className="text-[10px] font-mono text-[#656D7A]">{att.size}</span>
                  </div>
                </div>
                <span className="text-xs text-[#9EA6AF] group-hover:text-white transition-colors ml-2">
                  ↓
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Tags Strip ────────────────────────────────────────────────── */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
          <span className="font-mono text-xs text-[#656D7A] uppercase">TAGS:</span>
          {tags.map(t => (
            <span key={t} className="px-2.5 py-1 rounded bg-[#171C23] border border-white/10 text-xs font-mono text-[#9EA6AF]">
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function parseMarkdownBlocks(text) {
  const lines = text.split('\n')
  const blocks = []
  let inCode = false
  let codeBuffer = []
  let codeLang = ''
  let listBuffer = []

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({ type: 'list', items: [...listBuffer] })
      listBuffer = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim().startsWith('```')) {
      flushList()
      if (inCode) {
        blocks.push({ type: 'code', code: codeBuffer.join('\n'), lang: codeLang })
        inCode = false
        codeBuffer = []
        codeLang = ''
      } else {
        inCode = true
        codeLang = line.trim().replace(/^```/, '')
      }
      continue
    }

    if (inCode) {
      codeBuffer.push(line)
      continue
    }

    if (line.startsWith('### ')) {
      flushList()
      blocks.push({ type: 'h3', content: line.replace(/^###\s+/, '') })
      continue
    }
    if (line.startsWith('## ')) {
      flushList()
      blocks.push({ type: 'h2', content: line.replace(/^##\s+/, '') })
      continue
    }
    if (line.startsWith('> [!TIP]') || line.startsWith('> [!NOTE]') || line.startsWith('> ')) {
      flushList()
      blocks.push({ type: 'callout', content: line.replace(/^>\s*(\[!TIP\]|\[!NOTE\])?\s*/, '') })
      continue
    }
    if (line.trim().match(/^(\d+\.|\-|\*)\s+/)) {
      listBuffer.push(line.trim().replace(/^(\d+\.|\-|\*)\s+/, ''))
      continue
    }

    if (line.trim() === '') {
      flushList()
      continue
    }

    flushList()
    blocks.push({ type: 'p', content: line })
  }

  flushList()
  if (inCode && codeBuffer.length > 0) {
    blocks.push({ type: 'code', code: codeBuffer.join('\n'), lang: codeLang })
  }

  return blocks
}
