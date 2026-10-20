import mongoose from 'mongoose'
import { storagePolicy } from '../../../config/storagePolicy.js'

const ConversationSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: 'New Chat'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        lastMessage: {
            type: String,
            default: ''
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

const Conversation =
        mongoose.models.AIConversation ||
        mongoose.model('AIConversation', ConversationSchema)

export default Conversation