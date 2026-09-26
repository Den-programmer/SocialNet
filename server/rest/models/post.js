import { Schema, model } from 'mongoose'

const Post = new Schema({
    id: { type: String, required: true },
    postTitle: { type: String, required: true },
    postInf: { type: String, required: true },
    postImg: { type: String, required: true },
    likesCount: { type: Number, required: true, default: 0 },
    likedBy: { type: [Schema.Types.ObjectId], default: [] },
    comments: { type: Array, default: [] },
    repostsCount: { type: Number, default: 0 },
    repostOf: { type: Schema.Types.ObjectId, ref: 'Post', default: null },
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, required: true, default: Date.now },
    embedding: { type: [Number], required: false }
})

export default model('Post', Post)