const { catchRes, StandartRes } = require('../routes/responses/responses.js')

class MessagesController {
    async addMessage(req, res) {
        try {
            const { sender, receiver, content } = req.body;
            const newMessage = new Message({ sender, receiver, content });
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