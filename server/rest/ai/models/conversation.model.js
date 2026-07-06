import mongoose from 'mongoose'

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