const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dialogSchema = new Schema({
    hasNewMessages: { type: Boolean, default: false },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    lastDialogActivityDate: { type: Date, default: Date.now },
    lastUserActivityDate: { type: Date, default: Date.now },
    newMessagesCount: { type: Number, default: 0 },
    photos: {
        small: { type: String, default: '' },
        large: { type: String, default: '' }
    },
    userName: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    lastMessage: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to update `updatedAt` before saving
dialogSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Middleware to update `updatedAt` before updating a document
dialogSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

const Dialog = mongoose.model('Dialog', dialogSchema);

module.exports = Dialog