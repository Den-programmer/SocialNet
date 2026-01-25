import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    sender: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
     },
    receiver: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    text: { type: String },
    content: { type: String },
    image: { type: String },
    conversationId: { type: Schema.Types.ObjectId, ref: 'Dialog' },
    createdAt: { type: Date, default: Date.now },
    timestamp: { type: Date, default: Date.now }
});

export default model('Message', messageSchema);