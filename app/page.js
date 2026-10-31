import Reveal from '@/components/Reveal'
import HeroSection from '@/components/sections/HeroSection'
import WhyClub from '@/components/sections/WhyClub'
import ToolsTopics from '@/components/sections/ToolsTopics'
import FeaturedEvent from '@/components/sections/FeaturedEvent'
import IotaGlimpse from '@/components/sections/IotaGlimpse'
import CTABanner from '@/components/sections/CTABanner'

export const metadata = {
  title: 'FLUX-ECS | Where Ideas Flow into Innovation',
  description:
    'FLUX-ECS is the technical club of the Department of Electronics and Computer Science at VESIT, Mumbai.',
}

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Reveal>
        <HeroSection />
      </Reveal>
      <Reveal>
        <WhyClub />
      </Reveal>
      <Reveal>
        <ToolsTopics />
      </Reveal>
      <Reveal>
        <FeaturedEvent />
      </Reveal>
      <Reveal>
        <IotaGlimpse />
      </Reveal>
      <Reveal>
        <CTABanner />
      </Reveal>
    </div>
  )
}
