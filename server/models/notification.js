const { Schema, model } = require('mongoose')

const Notification = new Schema({
    isChecked: { type: Boolean, default: false },
    type: { type: String, required: true },
    author: { type: String },
    avatar: { type: String },
    title: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User'  },
    pageUrl: { type: String, required: true },
})

module.exports = model('Notification', Notification)