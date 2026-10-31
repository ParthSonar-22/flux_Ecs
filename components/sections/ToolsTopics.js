const stickers = [
  'sticker-1', 'sticker-2', 'sticker-3', 'sticker-4',
  'sticker-5', 'sticker-6', 'sticker-7', 'sticker-8',
]

export default function ToolsTopics() {
  const algoTags = [
    'Searching and sorting',
    'Greedy algorithms',
    'Divide and conquer',
    'Graph algorithms',
    'Strategic bidding',
    'Problem solving',
    'Big-O thinking',
  ]

  const iotaTags = [
    'AI and machine learning',
    'FPGA',
    'VLSI',
    'Software applications',
    'Remote controlled cars',
    'Obstacle avoiding car',
    'Hardware and electronics',
  ]

  return (
    <section className="w-full bg-paper border-b-2 border-ink py-space-xl px-4 lg:px-margin">
      <div className="max-w-7xl mx-auto">
        <div className="mb-space-md">
          <h2 className="font-headline-md text-headline-md text-ink font-bold">
            What we work on
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* From Algorithm's Auction */}
          <div className="py-4">
            <h3 className="font-headline-sm text-headline-sm text-brick font-bold mb-4 pb-2 border-b border-ink/20">
              Algorithm&apos;s Auction topics
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {algoTags.map((t, i) => (
                <span
                  key={t}
                  className={`sticker-tag ${stickers[i % stickers.length]} inline-block border border-ink bg-card text-ink font-body-sm text-sm px-3 py-1.5 shadow-sm`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* From IoTA Archives */}
          <div className="py-4 md:border-l md:border-ink/20 md:pl-gutter">
            <h3 className="font-headline-sm text-headline-sm text-ink font-bold mb-4 pb-2 border-b border-ink/20">
              IoTA Archives projects
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {iotaTags.map((t, i) => (
                <span
                  key={t}
                  className={`sticker-tag ${stickers[(i + 3) % stickers.length]} inline-block border border-ink bg-tan text-ink font-body-sm text-sm px-3 py-1.5 shadow-sm`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
