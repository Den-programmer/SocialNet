import { PubSub } from 'graphql-subscriptions'
import Message from '../../rest/models/message.js'
import Dialog from '../../rest/models/dialog.js'

const pubsub = new PubSub()

export const messagesResolvers = {
  Query: {
    async messages(_, { conversationId }, { user }) {
      if (!user) throw new Error('Not authenticated')
      return await Message.find({ conversationId }).populate('sender receiver')
    },
    async conversation(_, { id }, { user }) {
      if (!user) throw new Error('Not authenticated')
      return await Dialog.findById(id)
        .populate('participants')
        .populate({ path: 'messages', populate: ['sender', 'receiver'] })
    },
  },

  Mutation: {
    async sendMessage(_, { conversationId, text }, { user }) {
      if (!user) throw new Error('Not authenticated')

      const conversation = await Conversation.findById(conversationId)
      if (!conversation) throw new Error('Conversation not found')

      const message = new Message({
        conversationId,
        sender: user._id,
        receiver: conversation.participants.find(p => p.toString() !== user._id.toString()),
        text,
        createdAt: new Date(),
      })

      await message.save()
      conversation.messages.push(message._id)
      conversation.updatedAt = new Date()
      await conversation.save()

      const populatedMessage = await message.populate('sender receiver')

      pubsub.publish('MESSAGE_SENT', {
        messageSent: populatedMessage,
      })

      return populatedMessage
    },
  },

  Subscription: {
    messageSent: {
      subscribe: (_, { conversationId }) =>
        pubsub.asyncIterator(['MESSAGE_SENT']),
    },
  },
}