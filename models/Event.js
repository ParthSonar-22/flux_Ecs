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
    timeline_image: {
      type: String,
      default: '',
      trim: true,
    },
    is_published: {
      type: Boolean,
      default: true,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
    poster_url: {
      type: String,
      default: '',
      trim: true,
    },
    registration_url: {
      type: String,
      default: '',
      trim: true,
    },
    summary: {
      type: String,
      default: '',
      trim: true,
    },
    rules: {
      type: [String],
      default: [],
    },
    eligibility: {
      type: String,
      default: '',
      trim: true,
    },
    syllabus: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
  },
  {
    timestamps: true,
    strict: false,
  }
)

export default mongoose.models.Event || mongoose.model('Event', EventSchema)
