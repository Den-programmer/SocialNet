const { Schema, model } = require('mongoose')

const messageSchema = new Schema({
    sender: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
     },
    receiver: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    content: { type: String },
    image: { type: String },
    timestamp: { type: Date, default: Date.now }
});

module.exports = model('Message', messageSchema);