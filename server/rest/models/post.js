import { Schema, model } from 'mongoose'

const Post = new Schema({
    id: { type: String, required: true },
    postTitle: { type: String, required: true },
    postInf: { type: String, required: true },
    postImg: {
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true }
    },
    likesCount: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User'  },
    createdAt: { type: Date, required: true, default: Date.now }
})

export default model('Post', Post)