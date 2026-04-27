import { withFilter } from 'graphql-subscriptions'
import Message from '../../rest/models/message.js'
import Dialog from '../../rest/models/dialog.js'
import { pubsub } from '../pubsub.js'
import { cloudinaryAPI as cloudinary }from '../../cloudinaryConfig.js'

const MESSAGE_SENT = 'MESSAGE_SENT'
const MESSAGE_DELETED = 'MESSAGE_DELETED'
const DIALOG_STARTED = 'DIALOG_STARTED'
const DIALOG_DELETED = 'DIALOG_DELETED'
const USER_TYPING = 'USER_TYPING'

export const messagesResolvers = {
  User: {
    photos: (user) => {
      return user.profile?.photos || { small: '', large: '' }
    }
  },

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
          photos: { small: user.profile?.photos?.small || null, large: user.profile?.photos?.large || null },
          isActive: true
        })
      }

      await conversation.populate('participants')
      await conversation.populate({ path: 'messages', populate: { path: 'sender receiver' } })

      pubsub.publish(DIALOG_STARTED, { dialogStarted: conversation })

      return conversation
    },

    deleteMessage: async (_, { messageId }, { user }) => {
      if (!user) throw new Error('Not authenticated')

      const message = await Message.findById(messageId)
      if (!message) throw new Error('Message not found')

      if (message.sender.toString() !== user._id.toString()) {
        throw new Error('Not authorized to delete this message')
      }

      // Find which conversation(s) this message belongs to before deleting
      const dialogs = await Dialog.find({ messages: messageId })
      const conversationId = dialogs.length > 0 ? dialogs[0]._id.toString() : null

      await Dialog.updateMany(
        { messages: messageId },
        { $pull: { messages: messageId } }
      )

      await Message.findByIdAndDelete(messageId)

      if (conversationId) {
        pubsub.publish(MESSAGE_DELETED, {
          messageDeleted: { messageId, conversationId }
        })
      }

      return true
    },

    sendMessage: async (_, { conversationId, text, image }, { user }) => {
      if (!user) throw new Error('Not authenticated')

      const conversation = await Dialog.findById(conversationId)
      if (!conversation) throw new Error('Conversation not found')

      const receiverId = conversation.participants.find(
        p => p.toString() !== user._id.toString()
      )

      let imageUrl
      if (image) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: 'messages_images',
            resource_type: 'image'
          })
          imageUrl = uploadResponse.secure_url
        } catch (uploadErr) {
          console.error('Cloudinary upload failed:', uploadErr)
          throw new Error('Image upload failed')
        }
      }

      const message = new Message({
        conversationId,
        sender: user._id,
        receiver: receiverId,
        text,
        image: imageUrl || undefined,
        createdAt: new Date()
      })

      await message.save()

      conversation.messages.push(message._id)
      conversation.updatedAt = new Date()
      await conversation.save()

      const populatedMessage = await message.populate('sender receiver')

      pubsub.publish(MESSAGE_SENT, { messageSent: populatedMessage })

      return populatedMessage
    },

    deleteDialog: async (_, { dialogId }, { user }) => {
      if (!user) throw new Error('Not authenticated')

      const dialog = await Dialog.findById(dialogId)
      if (!dialog) throw new Error('Dialog not found')

      // Only a participant can delete the dialog
      const uid = user._id.toString()
      const isParticipant = dialog.participants.some(p => p.toString() === uid)
      if (!isParticipant) throw new Error('Not authorized to delete this dialog')

      // Store participant IDs before deletion for the subscription filter
      const participantIds = dialog.participants.map(p => p.toString())

      // Delete all messages belonging to this dialog
      await Message.deleteMany({ conversationId: dialogId })

      // Delete the dialog itself
      await Dialog.findByIdAndDelete(dialogId)

      pubsub.publish(DIALOG_DELETED, {
        dialogDeleted: { dialogId },
        _participantIds: participantIds
      })

      return true
    },

    setTyping: async (_, { conversationId, isTyping }, { user }) => {
      if (!user) throw new Error('Not authenticated')

      const conversation = await Dialog.findById(conversationId)
      if (!conversation) throw new Error('Conversation not found')

      pubsub.publish(USER_TYPING, {
        userTyping: {
          userId: user._id.toString(),
          username: user.username,
          conversationId,
          isTyping
        }
      })

      return true
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
          if (!user) return false
          const msg = payload?.messageSent
          if (!msg) return false

          // If a specific conversationId was requested, only match that one
          const requestedConvId = variables?.conversationId
          if (requestedConvId) {
            const convId = msg.conversationId?.toString() || msg.conversationId
            if (convId !== requestedConvId.toString()) return false
          }

          // Check that the subscribing user is a participant of this dialog
          const convId = msg.conversationId?.toString?.() ?? msg.conversationId
          if (!convId) return false

          const dialog = await Dialog.findById(convId)
          if (!dialog) return false

          const uid = user._id.toString()
          return dialog.participants.some(p => p.toString() === uid)
        }
      )
    },

    messageDeleted: {
      subscribe: withFilter(
        (_, __, { user }) => {
          if (!user) throw new Error('Not authenticated')
          return pubsub.asyncIterator([MESSAGE_DELETED])
        },
        async (payload, variables, { user }) => {
          if (!user) return false
          const deleted = payload?.messageDeleted
          if (!deleted) return false

          const requestedConvId = variables?.conversationId
          if (requestedConvId && deleted.conversationId !== requestedConvId.toString()) {
            return false
          }

          const dialog = await Dialog.findById(deleted.conversationId)
          if (!dialog) return false

          const uid = user._id.toString()
          return dialog.participants.some(p => p.toString() === uid)
        }
      )
    },

    dialogStarted: {
      subscribe: withFilter(
        (_, __, { user }) => {
          if (!user) throw new Error('Not authenticated')
          return pubsub.asyncIterator([DIALOG_STARTED])
        },
        async (payload, _variables, { user }) => {
          if (!user) return false
          const dialog = payload?.dialogStarted
          if (!dialog) return false

          const uid = user._id.toString()
          return dialog.participants.some(p => {
            const pid = p._id ? p._id.toString() : p.toString()
            return pid === uid
          })
        }
      )
    },

    dialogDeleted: {
      subscribe: withFilter(
        (_, __, { user }) => {
          if (!user) throw new Error('Not authenticated')
          return pubsub.asyncIterator([DIALOG_DELETED])
        },
        async (payload, _variables, { user }) => {
          if (!user) return false
          const participantIds = payload?._participantIds
          if (!participantIds) return false

          const uid = user._id.toString()
          return participantIds.includes(uid)
        }
      )
    },

    userTyping: {
      subscribe: withFilter(
        (_, __, { user }) => {
          if (!user) throw new Error('Not authenticated')
          return pubsub.asyncIterator([USER_TYPING])
        },
        async (payload, variables, { user }) => {
          if (!user) return false
          const typing = payload?.userTyping
          if (!typing) return false

          // Don't send typing events back to the user who is typing
          if (typing.userId === user._id.toString()) return false

          const requestedConvId = variables?.conversationId
          if (requestedConvId && typing.conversationId !== requestedConvId.toString()) {
            return false
          }

          const dialog = await Dialog.findById(typing.conversationId)
          if (!dialog) return false

          const uid = user._id.toString()
          return dialog.participants.some(p => p.toString() === uid)
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