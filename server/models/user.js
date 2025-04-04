const { Schema, model } = require('mongoose')

const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, default: 'Your nickname' },
    rememberMe: { type: Boolean, default: false },
    captcha: { type: String, default: '' },
    gender: { type: String, default: 'Not Chosen' },
    profile: {
        status: { type: String, default: '' },
        aboutMe: { type: String, default: '' },
        contacts: {
            facebook: { type: String, default: '' },
            website: { type: String, default: '' },
            vk: { type: String, default: '' },
            twitter: { type: String, default: '' },
            instagram: { type: String, default: '' },
            youtube: { type: String, default: '' },
            github: { type: String, default: '' },
            mainLink: { type: String, default: '' }
        },
        photos: {
            large: {
                data: { type: Buffer },
                contentType: { type: String }
            },
            small: {
                data: { type: Buffer },
                contentType: { type: String }
            }
        },
        userId: Schema.Types.ObjectId
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

module.exports = model('User', User)