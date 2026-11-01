import connectMongo from '@/lib/mongodb'
import Message from '@/models/Message'
import Subscriber from '@/models/Subscriber'
import AdminDashboard from '@/components/AdminDashboard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Secretariat Admin Console',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminPage() {
  let messages = []
  let subscribers = []

  if (process.env.MONGODB_URI) {
    try {
      await connectMongo()
      const rawMessages = await Message.find({}).sort({ createdAt: -1 }).limit(50).lean()
      const rawSubscribers = await Subscriber.find({}).sort({ createdAt: -1 }).limit(100).lean()

      messages = rawMessages.map((m) => ({
        ...m,
        _id: m._id?.toString(),
        createdAt: m.createdAt ? new Date(m.createdAt).toISOString() : null,
      }))

      subscribers = rawSubscribers.map((s) => ({
        ...s,
        _id: s._id?.toString(),
        createdAt: s.createdAt ? new Date(s.createdAt).toISOString() : null,
      }))
    } catch (e) {
      console.error('Failed to query admin collections:', e)
    }
  }

  return (
    <AdminDashboard
      initialMessages={messages}
      initialSubscribers={subscribers}
    />
  )
}
