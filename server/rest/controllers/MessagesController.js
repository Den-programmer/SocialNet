import { catchRes, StandartRes } from '../routes/responses/responses.js'
import Message from '../models/message.js'
import Dialog from '../models/dialog.js'
import { cloudinaryAPI as cloudinary } from '../../cloudinaryConfig.js'
import { deleteCloudinaryResource } from '../functions/cloudinaryHelper.js'
import { serializeMessage } from '../functions/messageSerializers.js'

class MessagesController {
  async addMessage(req, res) {
    try {
      const senderId = req.user
      const conversationId = req.params.conversationId || req.params.id
      const { content = '', image } = req.body

      if (!senderId || !conversationId) {
        return res.status(400).json({ message: 'Sender or conversation missing' })
      }

      const conversation = await Dialog.findById(conversationId)
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' })
      }

      const isParticipant = conversation.participants.some(participant => participant.toString() === senderId)
      if (!isParticipant) {
        return res.status(403).json({ message: 'Not authorized to send messages in this conversation' })
      }

      const receiverId = conversation.participants.find(
        participant => participant.toString() !== senderId
      ) || senderId

      let imageUrl
      if (image) {
        if (image.startsWith('data:')) {
          const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: 'messages_images',
            resource_type: 'image'
          })
          imageUrl = uploadResponse.secure_url
        } else {
          imageUrl = image
        }
      }

      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        content: content || '',
        text: content || '',
        image: imageUrl || null,
        conversationId,
        timestamp: new Date(),
        createdAt: new Date()
      })

      await newMessage.save()

      conversation.messages.push(newMessage._id)
      conversation.updatedAt = new Date()
      conversation.lastDialogActivityDate = new Date()
      conversation.lastMessage = content || (imageUrl ? 'Image' : '')
      await conversation.save()

      await newMessage.populate([
        { path: 'sender', select: 'username email profile.photos' },
        { path: 'receiver', select: 'username email profile.photos' }
      ])

      res.status(201).json(new StandartRes(0, 'Message sent successfully', { newMessage: serializeMessage(newMessage) }))
    } catch (error) {
      console.error('Failed to send message:', error)
      res.status(500).json(catchRes)
    }
  }

  async getMessagesBetweenUsers(req, res) {
    try {
      const { userId1, userId2 } = req.params
      const currentUserId = req.user

      if (!userId1 || !userId2) {
        return res.status(400).json({ message: 'Both user IDs are required' })
      }

      // Security check: Only allow users to fetch their own messages
      if (currentUserId !== userId1 && currentUserId !== userId2) {
        return res.status(403).json({ message: 'Unauthorized to view these messages' })
      }

      const conversation = await Dialog.findOne({
        participants: { $all: [userId1, userId2] }
      }).populate([
        {
          path: 'messages',
          populate: {
            path: 'sender receiver',
            select: 'username email profile.photos'
          }
        }
      ])

      const messages = conversation?.messages || []
      const serializedMessages = messages.map(message => serializeMessage(message)).filter(Boolean)

      res.json(new StandartRes(0, 'Messages fetched successfully', {
        messages: serializedMessages,
        items: serializedMessages,
        totalCount: serializedMessages.length
      }))
    } catch (error) {
      console.error('Failed to fetch messages:', error)
      res.status(500).json(catchRes)
    }
  }
  
  async deleteMessage(req, res) {
    try {
      const { id } = req.params
      const currentUserId = req.user

      if (!id) return res.status(400).json({ message: 'Message ID is required' })

      const message = await Message.findById(id).populate([
        { path: 'sender', select: 'username email profile.photos' },
        { path: 'receiver', select: 'username email profile.photos' }
      ])
      if (!message) {
        return res.status(404).json({ message: 'Message not found' })
      }

      // Security check: Only the sender can delete their own message
      const senderId = message.sender?.id || message.sender?._id?.toString() || message.sender?.toString?.()
      if (senderId !== currentUserId) {
        return res.status(403).json({ message: 'Not authorized to delete this message' })
      }

      await Dialog.updateMany({ messages: id }, { $pull: { messages: id } })

      const deletedMessage = await Message.findByIdAndDelete(id)

      // Delete the message image from Cloudinary if it exists
      if (deletedMessage?.image) {
        deleteCloudinaryResource(deletedMessage.image).catch(err =>
          console.error('Failed to delete message image from Cloudinary:', err)
        )
      }

      res.json(new StandartRes(0, 'Message deleted successfully', { message: serializeMessage(message) }))
    } catch (error) {
      console.error('Failed to delete message:', error)
      res.status(500).json(catchRes)
    }
  }
}

export default new MessagesController()
