import Reveal from '@/components/Reveal'
import BlogView from '@/components/BlogView'

export const metadata = {
  title: 'Blog & Stories',
  description:
    'News, event write-ups, and photographic archives from the FLUX-ECS club at VESIT.',
  openGraph: {
    title: 'IoTA Archives & Updates | FLUX-ECS Blog',
    description:
      'News, event write-ups, and photographic archives from the FLUX-ECS club at VESIT.',
    images: ['/photos/iota-robot-floor-test.jpg'],
  },
}

export default function BlogPage() {
  return (
    <Reveal>
      <BlogView />
    </Reveal>
  )
}
