import mongoose from 'mongoose'

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