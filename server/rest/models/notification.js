import { Schema, model } from 'mongoose';
import { storagePolicy } from '../../config/storagePolicy.js'

const Notification = new Schema({
    isChecked: { type: Boolean, default: false },
    type: { type: String, required: true },
    author: { type: String },
    avatar: { type: String },
    title: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User'  },
    pageUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: storagePolicy.ttlDays * 24 * 60 * 60 }
})

export default model('Notification', Notification)