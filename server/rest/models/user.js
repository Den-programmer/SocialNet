import { Schema, model } from 'mongoose';
import { storagePolicy } from '../../config/storagePolicy.js'

const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, default: 'Your nickname' },
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
            large: { type: String, default: '' },
            small: { type: String, default: '' }
        },
        userId: Schema.Types.ObjectId
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post', maxItems: storagePolicy.maxUserPosts }],
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification', maxItems: storagePolicy.maxUserNotifications }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
    following: [{ type: Schema.Types.ObjectId, ref: 'User', maxItems: storagePolicy.maxUserFollowing }],
    background: { type: String, default: '' }
})

export default model('User', User)