'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Arrow } from '@/components/ui/arrow'
import styles from './project-showcase.module.css'
const features = [
  {
    name: 'Hardware & electronics',
    lab: 'Lab 201',
    image: '/photos/iota-lab201-robot-demo.jpg',
    alt: 'First-year students watching a hardware project demonstration at VESIT',
    description:
      'Remote-controlled cars, electronics and student hardware demonstrations.',
  },
  {
    name: 'Software & systems',
    lab: 'Labs 203 & 215',
    image: '/photos/iota-electrical-lab-discussion.png',
    alt: 'Senior students explaining their projects to first-year ECS students',
    description:
      'Software applications, AI and machine learning projects, explained by their makers.',
  },
  {
    name: 'The floor test',
    lab: 'Lab 201',
    image: '/photos/iota-robot-floor-test.jpg',
    alt: 'Students testing an obstacle-avoiding car on the laboratory floor',
    description: 'An obstacle-avoiding car, put to the test in the lab.',
  },
]
export default function ProjectShowcase() {
  const [selected, setSelected] = useState(0),
    reduced = useReducedMotion(),
    feature = features[selected]
  return (
    <div className={styles.showcase}>
      <div
        className={styles.image}
        id="project-photo"
        role="region"
        aria-label={feature.name}
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={selected}
            className={styles.imageLayer}
            initial={{ opacity: reduced ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.28 }}
          >
            <Image
              src={feature.image}
              alt={feature.alt}
              fill
              sizes="(max-width:700px) 100vw,60vw"
            />
          </motion.div>
        </AnimatePresence>
        <span className={styles.caption}>IoTA Archives / 7 September 2026</span>
      </div>
      <div className={styles.index}>
        {features.map((item, i) => (
          <button
            type="button"
            key={item.name}
            aria-pressed={selected === i}
            aria-controls="project-photo"
            className={styles.item}
            onClick={() => setSelected(i)}
          >
            <span className={styles.number}>0{i + 1}</span>
            <span>
              <span className={styles.lab}>{item.lab}</span>
              <strong>{item.name}</strong>
              {selected === i && (
                <span className={styles.description}>{item.description}</span>
              )}
            </span>
            <span className={styles.plus} aria-hidden="true">
              {selected === i ? '−' : '+'}
            </span>
          </button>
        ))}
        <Link href="/blog" className={styles.link}>
          Read IoTA Archives <Arrow />
        </Link>
      </div>
    </div>
  )
}
