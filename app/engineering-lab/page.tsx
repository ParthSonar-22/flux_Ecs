import type { Metadata } from 'next'
import EngineeringLab from '@/components/engineering-lab/engineering-lab'
export const metadata: Metadata = {
  title: 'Engineering Lab prototype',
  description:
    'Explore sensors, telemetry, aerodynamics, control and power systems through an original FluxECS engineering concept.',
  robots: { index: false, follow: false },
}
export default function EngineeringLabPage() {
  return <EngineeringLab />
}
