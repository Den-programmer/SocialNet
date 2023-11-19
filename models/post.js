const { Schema, model } = require('mongoose')

const Post = new Schema({
    id: { type: String, required: true },
    postTitle: { type: String, required: true },
    postInf: { type: String, required: true },
    postImg: { type: String, required: true },
    likesCount: { type: Number, required: true },
    isEditTitle: { type: Boolean, required: true },
    isEditPostInf: { type: Boolean, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User'  }
})

module.exports = model('Post', Post)