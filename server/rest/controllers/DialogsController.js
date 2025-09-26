import User from '../models/user.js'
import Dialog from '../models/dialog.js'
import { catchRes, StandartRes } from '../routes/responses/responses.js'
import mongoose from 'mongoose'

class DialogsController {
  async getAllDialogs(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
      }

      const dialogs = await Dialog.find({ participants: req.user })
        .populate({
          path: 'participants',
          select: 'username',
          match: { _id: { $ne: req.user } }
        })

      const filteredDialogs = dialogs.map(dialog => {
        const otherUser = dialog.participants.find(p => p !== null)
        return {
          ...dialog.toObject(),
          otherUser
        }
      })

      res.status(200).json(new StandartRes(0, 'Dialogs fetched successfully', { dialogs: filteredDialogs }))
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

      const currentUserId = req.user
      if (currentUserId === userId) {
        return res.status(400).json({ message: 'Cannot create a dialog with yourself' })
      }

      const userObjectId = userId
      const currentUserObjectId = currentUserId

      const user = await User.findById(userObjectId)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const existingDialog = await Dialog.findOne({
        participants: { $all: [currentUserObjectId, userObjectId] }
      })

      if (existingDialog) {
        return res.status(409).json({ message: 'Dialog already exists' })
      }

      const dialog = new Dialog({
        participants: [currentUserObjectId, userObjectId],
        lastDialogActivityDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        newMessagesCount: 0,
        userName: user.username
      })

      await dialog.save()

      res.status(201).json(new StandartRes(0, 'Dialog created successfully', { dialog }))
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

      const deletedDialog = await Dialog.findByIdAndDelete(dialogId)
      if (!deletedDialog) {
        return res.status(404).json({ message: 'Dialog not found' })
      }

      res.status(200).json(new StandartRes(0, 'Dialog deleted successfully', { dialog: deletedDialog }))
    } catch (e) {
      res.status(500).json(catchRes)
    }
  }
}

export default new DialogsController()
