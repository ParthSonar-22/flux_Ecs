import fs from 'fs'
import path from 'path'

const SUBSCRIBERS_PATH = path.join(process.cwd(), 'data', 'newsletter-subscribers.json')

function readSubscribers() {
  try {
    if (fs.existsSync(SUBSCRIBERS_PATH)) {
      return JSON.parse(fs.readFileSync(SUBSCRIBERS_PATH, 'utf8'))
    }
  } catch (err) {
    console.error('Failed to read newsletter-subscribers.json:', err)
  }
  return []
}

function writeSubscribers(subscribers) {
  try {
    const dir = path.dirname(SUBSCRIBERS_PATH)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(SUBSCRIBERS_PATH, JSON.stringify(subscribers, null, 2), 'utf8')
    return true
  } catch (err) {
    console.error('Failed to write newsletter-subscribers.json:', err)
    return false
  }
}

export async function subscribeNewsletter(email) {
  if (!email || !email.includes('@')) {
    return { ok: false, error: 'Valid email required' }
  }
  const cleanEmail = email.toLowerCase().trim()
  const list = readSubscribers()
  const exists = list.some(s => s.email === cleanEmail)
  if (exists) {
    return { ok: true, message: 'Already subscribed to FluxECS updates!' }
  }
  list.push({
    email: cleanEmail,
    subscribedAt: new Date().toISOString(),
  })
  writeSubscribers(list)
  return { ok: true, message: 'Subscribed successfully! You will receive new guides via email.' }
}

export async function getSubscribersCount() {
  const list = readSubscribers()
  return list.length
}

export async function dispatchBlogNotification(blog) {
  const list = readSubscribers()
  console.log(`[FluxECS Newsletter Dispatch] Notifying ${list.length} subscribers about newly published guide: "${blog.title}"`)
  // Simulates email notification log / webhook dispatch
  return {
    ok: true,
    recipientCount: list.length,
    blogTitle: blog.title,
    dispatchedAt: new Date().toISOString(),
  }
}
