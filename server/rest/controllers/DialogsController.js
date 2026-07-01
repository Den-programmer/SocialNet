import mongoose from 'mongoose'
import User from '../models/user.js'
import Dialog from '../models/dialog.js'
import Message from '../models/message.js'
import { catchRes, StandartRes } from '../routes/responses/responses.js'
import { serializeDialog } from '../functions/messageSerializers.js'

class DialogsController {
  async getAllDialogs(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      const dialogs = await Dialog.find({ participants: req.user })
        .sort({ updatedAt: -1 })
        .populate([
          { path: 'participants', select: 'username email profile.photos' },
          {
            path: 'messages',
            populate: {
              path: 'sender receiver',
              select: 'username email profile.photos'
            }
          }
        ])

      const formattedDialogs = dialogs.map(dialog => serializeDialog(dialog))

      res.status(200).json(new StandartRes(0, 'Dialogs fetched successfully', { dialogs: formattedDialogs }))
    } catch (e) {
      console.error('Error in fetching dialogs:', e)
      res.status(500).json({ error: 'Internal Server Error', details: e.message })
    }
  }

  async addDialog(req, res) {
    try {
      const { userId } = req.params

      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: 'Invalid User ID' })
      }

      const currentUserId = req.user.toString()
      if (currentUserId === userId) {
        return res.status(400).json({ message: 'Cannot create a dialog with yourself' })
      }

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      let dialog = await Dialog.findOne({
        participants: { $all: [currentUserId, userId] }
      }).populate([
        { path: 'participants', select: 'username email profile.photos' },
        {
          path: 'messages',
          populate: {
            path: 'sender receiver',
            select: 'username email profile.photos'
          }
        }
      ])

      if (!dialog) {
        dialog = new Dialog({
          participants: [currentUserId, userId],
          messages: [],
          lastDialogActivityDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
          newMessagesCount: 0,
          userName: user.username
        })

        await dialog.save()
        await dialog.populate([
          { path: 'participants', select: 'username email profile.photos' },
          {
            path: 'messages',
            populate: {
              path: 'sender receiver',
              select: 'username email profile.photos'
            }
          }
        ])
      }

      res.status(200).json(new StandartRes(0, 'Dialog ready successfully', { dialog: serializeDialog(dialog) }))
    } catch (e) {
      console.error('Error in addDialog:', e)
      res.status(500).json({ message: 'Internal Server Error', error: e.message })
    }
  }

  async deleteDialog(req, res) {
    try {
      const { dialogId } = req.body
      if (!dialogId) {
        return res.status(400).json({ message: 'Dialog ID is required' })
      }

      const dialog = await Dialog.findById(dialogId)
      if (!dialog) {
        return res.status(404).json({ message: 'Dialog not found' })
      }

      const isParticipant = dialog.participants.some(p => p.toString() === req.user)
      if (!isParticipant) {
        return res.status(403).json({ message: 'Not authorized to delete this dialog' })
      }

      await Message.deleteMany({ conversationId: dialogId })

      const deletedDialog = await Dialog.findByIdAndDelete(dialogId)
      if (!deletedDialog) {
        return res.status(404).json({ message: 'Dialog not found' })
      }

      res.status(200).json(new StandartRes(0, 'Dialog deleted successfully', {
        dialog: {
          id: deletedDialog.id || deletedDialog._id.toString(),
          participants: deletedDialog.participants.map(participant => participant.toString())
        }
      }))
    } catch (e) {
      console.error('Error in deleteDialog:', e)
      res.status(500).json(catchRes)
    }
  }
}

export default new DialogsController()
