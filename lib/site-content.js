import fs from 'fs'
import path from 'path'
import connectMongo from '@/lib/mongodb'
import SiteContent from '@/models/SiteContent'
import { faculty as defaultFaculty, seniorCouncil as defaultSeniorCouncil, juniorCouncil as defaultJuniorCouncil } from '@/data/team'

const CONTENT_PATH = path.join(process.cwd(), 'data', 'site-content.json')

function getDefaultContent() {
  return {
    hero: {
      overlineDept: 'Electronics & Computer Science',
      overlineSchool: 'VESIT · Mumbai',
      headlineLine1: 'From circuits',
      headlineLine2: 'to code.',
      lead: 'A council for the things we build. And the people who build them.',
      primaryCtaText: 'Explore events',
      primaryCtaLink: '/events',
      secondaryCtaText: 'Meet FluxECS',
      secondaryCtaLink: '/about',
    },
    heroSlides: [
      {
        id: 'slide-1',
        src: '/photos/iota-lab201-crowd.jpg',
        alt: 'Students at an IoTA lab event',
        title: 'IoTA Lab Gatherings',
        caption: 'Hands-on tech workshops in Lab 201',
        enabled: true,
      },
      {
        id: 'slide-2',
        src: '/photos/iota-robotics-chassis-presentation.jpg',
        alt: 'Robotics chassis presentation',
        title: 'Robotics Showcase',
        caption: 'Autonomous navigation and robot chassis engineering',
        enabled: true,
      },
      {
        id: 'slide-3',
        src: '/photos/iota-lab201-group.jpg',
        alt: 'FluxECS group session in Lab 201',
        title: 'Lab Sessions',
        caption: 'Peer mentorship across embedded & software',
        enabled: true,
      },
      {
        id: 'slide-4',
        src: '/photos/iota-tinkerers-lab-cohort.jpg',
        alt: "FluxECS cohort at Tinkerers' Lab",
        title: "Tinkerers' Lab Cohort",
        caption: 'Collaborative hardware prototyping in Lab 203',
        enabled: true,
      },
      {
        id: 'slide-5',
        src: '/photos/iota-lab201-robot-demo.jpg',
        alt: 'Robot demonstration in Lab 201',
        title: 'Live Robotics Demos',
        caption: 'Real-time microcontroller testing & demonstrations',
        enabled: true,
      },
    ],
    featuredEventSection: {
      eyebrow: 'On the calendar',
      viewAllText: 'All events',
    },
    councilSection: {
      eyebrow: 'The council',
      heading: 'The people behind the grid.',
      lead: 'Hardware prototyping, competitive algorithms, workshops and active time in the lab bring our student cohorts together.',
      image: '/photos/iota-tinkerers-lab-cohort.jpg',
      caption: 'FluxECS student council cohort and faculty mentors at Tinkerers Lab',
      ctaText: 'Meet the full council',
      ctaLink: '/about#council',
    },
    labBandSection: {
      eyebrow: 'Inside the lab',
      heading: 'Student-led. Built together.',
      buttonText: 'Meet FluxECS',
    },
    aboutPage: {
      badge: 'Council Overview · Department of ECS',
      headline: 'THE PEOPLE BEHIND FLUXECS.',
      introParagraph: "FluxECS is the technical student council representing the Department of Electronics & Computer Science at Vivekanand Education Society's Institute of Technology (VESIT), Chembur. We bridge the intersection between physical silicon and algorithmic software through competitive problem-solving, hands-on lab prototyping, and peer engineering mentorship.",
    },
    faculty: defaultFaculty,
    seniorCouncil: defaultSeniorCouncil,
    juniorCouncil: defaultJuniorCouncil,
    socials: {
      instagram: 'https://www.instagram.com/flux.ecs/',
      linkedin: 'https://in.linkedin.com/company/tinkerers-lab-ecs',
      email: 'flux.ecs@ves.ac.in',
      github: 'https://github.com/Flux-ECS-Club',
    },
    arcadeConfig: {
      enabled: true,
      homepageBadge: true,
      durationSeconds: 30,
      difficulty: 'medium',
      title: 'Flux Grand Prix',
      description: 'Race a 30-second sprint collecting Software, Hardware and Robotics checkpoints',
    },
    notionBlocks: [],
  }
}

function readLocalContent() {
  try {
    if (fs.existsSync(CONTENT_PATH)) {
      const data = fs.readFileSync(CONTENT_PATH, 'utf8')
      const parsed = JSON.parse(data)
      if (!parsed.faculty) parsed.faculty = defaultFaculty
      if (!parsed.seniorCouncil) parsed.seniorCouncil = defaultSeniorCouncil
      if (!parsed.juniorCouncil) parsed.juniorCouncil = defaultJuniorCouncil
      return parsed
    }
  } catch (err) {
    console.error('Failed to read site-content:', err)
  }
  return null
}

function writeLocalContent(content) {
  try {
    const dir = path.dirname(CONTENT_PATH)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf8')
    return true
  } catch (err) {
    console.error('Failed to write site-content.json:', err)
    return false
  }
}

export async function getSiteContent() {
  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      let doc = await SiteContent.findOne({ key: 'main' }).lean()
      if (!doc) {
        const initial = readLocalContent() || getDefaultContent()
        const created = await SiteContent.create({ key: 'main', ...initial })
        return created.toObject()
      }
      return doc
    } catch (e) {
      console.warn('MongoDB getSiteContent failed, falling back to local file:', e.message)
    }
  }

  const local = readLocalContent()
  if (local) return local
  return getDefaultContent()
}

export async function updateSiteContent(updated) {
  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      const merged = await SiteContent.findOneAndUpdate(
        { key: 'main' },
        { $set: updated },
        { new: true, upsert: true }
      ).lean()
      writeLocalContent(merged)
      return { ok: true, data: merged }
    } catch (e) {
      console.warn('MongoDB updateSiteContent failed, falling back to local file:', e.message)
    }
  }

  try {
    const current = await getSiteContent()
    const merged = { ...current, ...updated }
    writeLocalContent(merged)
    return { ok: true, data: merged }
  } catch (err) {
    console.error('Failed to update site-content:', err)
    return { ok: false, error: err.message }
  }
}
