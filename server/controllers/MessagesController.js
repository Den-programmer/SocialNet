const { catchRes, StandartRes } = require('../routes/responses/responses.js')
const Message = require('../models/message.js')
const cloudinary = require('cloudinary').v2

class MessagesController {
    async addMessage(req, res) {
        try {
            const { id: receiverId } = req.params;
            const { content, image } = req.body;
            const senderId = req.user

            let imagerUrl;
            if(image) {
                const uploadResponse = await cloudinary.uploader.upload(image)
                imageUrl = uploadResponse.secure_url
            }

            const newMessage = new Message({
                sender: senderId,
                receiver: receiverId,
                content,
                image: imageUrl
            });

            await newMessage.save();

            res.status(201).json(new StandartRes(0, 'Message sent successfully', {data: newMessage}));
        } catch (error) {
            res.status(500).json({ error: 'Failed to send message' });
        }
    }
    async getMessagesBetweenUsers(req, res) {
        try {
            const { user1, user2 } = req.params;
            const messages = await Message.find({
                $or: [
                    { sender: user1, receiver: user2 },
                    { sender: user2, receiver: user1 }
                ]
            }).sort({ timestamp: 1 });
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch messages' });
        }
    }
    async deleteMessage(req, res) {
        try {
            await Message.findByIdAndDelete(req.params.id);
            res.json({ message: 'Message deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete message' });
        }
    }
}

module.exports = new MessagesController()