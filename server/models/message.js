const { Schema, model } = require('mongoose')

const messageSchema = new Schema({
    sender: String,
    receiver: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = model('Message', messageSchema);