const User = require('../models/user.js')
const Dialog = require('../models/dialog.js')
const { catchRes, StandartRes } = require('../routes/responses/responses.js')
const mongoose = require('mongoose')

class DialogsController {
    async getAllDialogs(req, res) {
        try {
            const currentUserId = new mongoose.Types.ObjectId(req.user);

            const dialogs = await Dialog.find({ participants: { $in: [currentUserId] } })
                .populate('participants', 'username');

            res.status(200).json(dialogs);
        } catch (e) {
            console.error('Error in fetching dialogs:', e);
            res.status(500).json({ error: 'Internal Server Error', details: e.message });
        }
    }

    async addDialog(req, res) {
        try {
            const { userId } = req.params
            const userIdObject = new mongoose.Types.ObjectId(userId)
            if (!userIdObject) {
                return res.status(400).json({ message: 'User ID is required' })
            }

            const currentUserId = req.user
            const currentUserIdObject = new mongoose.Types.ObjectId(currentUserId)
            
            if (!currentUserId) {
                return res.status(401).json({ message: 'Unauthorized' })
            }

            // Check if dialog already exists
            const existingDialog = await Dialog.findOne({
                participants: { $all: [currentUserIdObject, userIdObject] }
            });

            if (existingDialog) {
                return res.status(409).json({ message: 'Dialog already exists' })
            }

            const user = await User.findById(userIdObject)
            const dialogUserName = user.username

            const dialog = new Dialog({
                participants: [currentUserIdObject, userIdObject],
                lastDialogActivityDate: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                newMessagesCount: 0,
                userName: dialogUserName
            })

            await dialog.save()

            res.status(201).json(new StandartRes(0, 'Dialog is successfully created!', dialog))
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

            res.status(200).json(StandartRes)
        } catch (e) {
            res.status(500).json(catchRes)
        }
    }
}

module.exports = new DialogsController()