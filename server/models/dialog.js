const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dialogSchema = new Schema({
    hasNewMessages: { type: Boolean, default: false },
    id: { type: String, required: true },
    lastDialogActivityDate: {
        type: Date,
        default: Date.now
    },
    lastUserActivityDate: {
        type: Date,
        default: Date.now
    },
    newMessagesCount: { type: Number, default: 0 },
    photos: {
        small: {
            data: { type: Buffer },
            contentType: { type: String }
        },
        large: {
            data: { type: Buffer },
            contentType: { type: String }
        }
    },
    userName: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    lastMessage: { type: String, default: '' },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

dialogSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Dialog = mongoose.model('Dialog', dialogSchema);

module.exports = Dialog;