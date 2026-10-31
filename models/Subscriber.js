// models/Subscriber.js
import mongoose from 'mongoose'

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
)

export default mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema)
