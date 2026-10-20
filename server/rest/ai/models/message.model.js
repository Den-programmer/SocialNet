import mongoose from 'mongoose'
import { storagePolicy } from '../../../config/storagePolicy.js'

const AIMessageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation',
            required: true
        },
        role: {
            type: String,
            enum: ['user', 'assistant', 'tool'],
            required: true
        },
        content: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Date,
            default: () => new Date(Date.now() + storagePolicy.ttlDays * 24 * 60 * 60 * 1000),
            expires: 0
        }
    },
    {
        timestamps: true
    }
)

const AIMessage =
    mongoose.models.AIMessage ||
    mongoose.model('AIMessage', AIMessageSchema)

export default AIMessage