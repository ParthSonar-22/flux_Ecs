export default function ToolsTopics() {
  const algoTags = [
    'Searching and sorting',
    'Greedy algorithms',
    'Divide and conquer',
    'Graph algorithms',
    'Strategic bidding',
    'Problem solving',
  ]

  const iotaTags = [
    'AI and machine learning',
    'FPGA',
    'VLSI',
    'Software applications',
    'Remote controlled cars',
    'Obstacle avoiding car',
  ]

  return (
    <section className="w-full bg-paper border-b-2 border-ink py-space-xl px-4 lg:px-margin">
      <div className="max-w-7xl mx-auto">
        <div className="mb-space-md">
          <span className="font-label-smallcaps text-label-smallcaps uppercase tracking-widest text-brick block mb-1 font-bold">
            Taxonomy &amp; Frameworks
          </span>
          <h2 className="font-headline-md text-headline-md text-ink font-bold">
            Tools and topics
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Panel A: From Algorithm's Auction */}
          <div className="border-2 border-ink bg-card p-space-md shadow-[4px_4px_0px_var(--ink)]">
            <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-4">
              <div>
                <span className="font-label-smallcaps text-label-smallcaps uppercase text-ink block font-bold">
                  Registry Part A
                </span>
                <h3 className="font-headline-sm text-headline-sm text-brick font-bold">
                  From Algorithm&apos;s Auction
                </h3>
              </div>
              <span className="font-complexity-notation text-xs px-2 py-0.5 border border-ink bg-tan text-ink font-bold">
                ALGO-01
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {algoTags.map((t) => (
                <span
                  key={t}
                  className="border-2 border-ink bg-paper px-3 py-1.5 font-complexity-notation text-complexity-notation text-ink"
                >
                  {t}
                </span>
              ))}
              <span className="border-2 border-ink bg-brick text-paper px-3 py-1.5 font-complexity-notation text-complexity-notation font-bold">
                Big-O thinking
              </span>
            </div>
          </div>

          {/* Panel B: From IoTA Archives */}
          <div className="border-2 border-ink bg-card p-space-md shadow-[4px_4px_0px_var(--ink)]">
            <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-4">
              <div>
                <span className="font-label-smallcaps text-label-smallcaps uppercase text-ink block font-bold">
                  Registry Part B
                </span>
                <h3 className="font-headline-sm text-headline-sm text-ink font-bold">
                  From IoTA Archives
                </h3>
              </div>
              <span className="font-complexity-notation text-xs px-2 py-0.5 border border-ink bg-tan text-ink font-bold">
                HW-SYS-02
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {iotaTags.map((t) => (
                <span
                  key={t}
                  className="border-2 border-ink bg-paper px-3 py-1.5 font-complexity-notation text-complexity-notation text-ink"
                >
                  {t}
                </span>
              ))}
              <span className="border-2 border-ink bg-tan px-3 py-1.5 font-complexity-notation text-complexity-notation text-ink font-bold">
                Hardware and electronics
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
