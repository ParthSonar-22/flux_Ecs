import Reveal from '@/components/Reveal'
import GalleryView from '@/components/GalleryView'

export const metadata = {
  title: 'Gallery & Media Archives',
  description:
    'Visual records of robotics floor tests, hardware exhibits, and competitive tournaments at VESIT ECS.',
}

export default function GalleryPage() {
  return (
    <Reveal>
      <GalleryView />
    </Reveal>
  )
}
