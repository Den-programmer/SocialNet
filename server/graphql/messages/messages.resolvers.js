import { withFilter } from 'graphql-subscriptions'
import Message from '../../rest/models/message.js'
import Dialog from '../../rest/models/dialog.js'
import { pubsub } from '../pubsub.js'

const MESSAGE_SENT = 'MESSAGE_SENT'

export const messagesResolvers = {
  Query: {
    dialogs: async (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated')
      return Dialog.find({ participants: user._id })
        .populate('participants')
        .populate({ path: 'messages', populate: { path: 'sender receiver' } })
    },

    messages: async (_, { conversationId }, { user }) => {
      if (!user) throw new Error('Not authenticated')
      return Message.find({ conversationId }).populate('sender receiver')
    },

    conversation: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not authenticated')
      return Dialog.findById(id)
        .populate('participants')
        .populate({ path: 'messages', populate: { path: 'sender receiver' } })
    }
  },

  Mutation: {
    startDialog: async (_, { userId }, { user }) => {
      if (!user) throw new Error('Not authenticated')

      let conversation = await Dialog.findOne({
        participants: { $all: [user._id, userId] }
      })

      if (!conversation) {
        conversation = await Dialog.create({
          participants: [user._id, userId],
          messages: [],
          updatedAt: new Date(),
          hasNewMessages: false,
          lastDialogActivityDate: new Date(),
          lastUserActivityDate: new Date(),
          newMessagesCount: 0,
          userName: user.username,
          photos: { small: user.photos?.small || null, large: user.photos?.large || null },
          isActive: true
        })
      }

      await conversation.populate('participants')

      return conversation
    },

    sendMessage: async (_, { conversationId, text, image }, { user }) => {
      if (!user) throw new Error('Not authenticated')

      const conversation = await Dialog.findById(conversationId)
      if (!conversation) throw new Error('Conversation not found')

      const receiverId = conversation.participants.find(
        p => p.toString() !== user._id.toString()
      )

      const message = new Message({
        conversationId,
        sender: user._id,
        receiver: receiverId,
        text,
        image: image || undefined,
        createdAt: new Date()
      })

      await message.save()

      conversation.messages.push(message._id)
      conversation.updatedAt = new Date()
      await conversation.save()

      const populatedMessage = await message.populate('sender receiver')

      pubsub.publish(MESSAGE_SENT, { messageSent: populatedMessage })

      return populatedMessage
    }
  },

  Subscription: {
    messageSent: {
      subscribe: withFilter(
        (_, __, { user }) => {
          if (!user) throw new Error('Not authenticated')
          return pubsub.asyncIterator([MESSAGE_SENT])
        },
        async (payload, variables, { user }) => {
          // allow subscribing without providing variables.conversationId
          const convId = variables?.conversationId ?? payload?.messageSent?.conversationId
          if (!convId) return false

          const dialog = await Dialog.findById(convId)
          if (!dialog) return false

          return dialog.participants
            .map(id => id.toString())
            .includes(user._id.toString())
        }
      )
    }
  },

  // Field resolvers to ensure id/conversationId values are strings (ObjectId/Buffer -> string)
  User: {
    id: (parent) => toStringId(parent.id ?? parent._id),
  },
  Message: {
    id: (parent) => toStringId(parent.id ?? parent._id),
    conversationId: (parent) => toStringId(parent.conversationId ?? parent.conversation),
    text: (parent) => parent.text ?? parent.content ?? '',
    createdAt: (parent) => parent.createdAt ? new Date(parent.createdAt).toISOString() : parent.timestamp ? new Date(parent.timestamp).toISOString() : new Date().toISOString(),
  },
  Dialog: {
    id: (parent) => toStringId(parent.id ?? parent._id),
  },
}

const toStringId = (val) => {
  if (val == null) return null
  try {
    return String(val)
  } catch {
    return null
  }
}