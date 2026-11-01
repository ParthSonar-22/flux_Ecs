// models/Event.js
import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },
    category: {
      type: String,
      default: 'General',
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      default: '',
      trim: true,
    },
    venue: {
      type: String,
      default: 'VESIT, Mumbai',
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1500,
    },
    poster: {
      type: String,
      default: '',
      trim: true,
    },
    registerUrl: {
      type: String,
      default: '',
      trim: true,
    },
    ctaLabel: {
      type: String,
      default: 'Register Now',
      trim: true,
    },
    status: {
      type: String,
      enum: ['upcoming', 'past'],
      default: 'upcoming',
    },
    published: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Event || mongoose.model('Event', EventSchema)
