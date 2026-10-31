// models/Message.js
import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 120 },
    email: { type: String, required: true, maxlength: 200 },
    year: { type: String, required: true },
    category: { type: String, required: true },
    message: { type: String, required: true, maxlength: 2000 },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
)

export default mongoose.models.Message || mongoose.model('Message', MessageSchema)
