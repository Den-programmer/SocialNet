import { catchRes, StandartRes } from '../routes/responses/responses.js'
import Message from '../models/message.js'
import { v2 as cloudinary } from 'cloudinary'

class MessagesController {
  async addMessage(req, res) {
    try {
      const senderId = req.user
      const receiverId = req.params.id
      const { content, image } = req.body

      if (!senderId || !receiverId) {
        return res.status(400).json({ message: 'Sender or receiver missing' })
      }

      let imageUrl
      if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: 'messages_images',
          resource_type: 'image'
        })
        imageUrl = uploadResponse.secure_url
      }

      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        content: content || '',
        image: imageUrl || null,
        timestamp: new Date()
      })

      await newMessage.save()

      res.status(201).json(new StandartRes(0, 'Message sent successfully', { newMessage }))
    } catch (error) {
      console.error('Failed to send message:', error)
      res.status(500).json(catchRes)
    }
  }

  async getMessagesBetweenUsers(req, res) {
    try {
      const { userId1, userId2 } = req.params
      if (!userId1 || !userId2) {
        return res.status(400).json({ message: 'Both user IDs are required' })
      }

      const messages = await Message.find({
        $or: [
          { sender: userId1, receiver: userId2 },
          { sender: userId2, receiver: userId1 }
        ]
      }).sort({ timestamp: 1 })

      res.json(new StandartRes(0, 'Messages fetched successfully', { messages }))
    } catch (error) {
      console.error('Failed to fetch messages:', error)
      res.status(500).json(catchRes)
    }
  }
  
  async deleteMessage(req, res) {
    try {
      const { id } = req.params
      if (!id) return res.status(400).json({ message: 'Message ID is required' })

      const deletedMessage = await Message.findByIdAndDelete(id)
      if (!deletedMessage) {
        return res.status(404).json({ message: 'Message not found' })
      }

      res.json(new StandartRes(0, 'Message deleted successfully', { message: deletedMessage }))
    } catch (error) {
      console.error('Failed to delete message:', error)
      res.status(500).json(catchRes)
    }
  }
}

export default new MessagesController()
