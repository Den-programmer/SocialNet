const User = require('../models/user.js')
const Dialog = require('../models/dialog.js')
const { catchRes, StandartRes } = require('../routes/responses/responses.js')
const mongoose = require('mongoose')

class DialogsController {
    async getAllDialogs(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
    
            const currentUserIdObject = new mongoose.Types.ObjectId(req.user);
    
            // Ensure only the current user's dialogs are fetched
            const dialogs = await Dialog.find({ participants: currentUserIdObject })
                .populate({
                    path: 'participants',
                    select: 'username',
                    match: { _id: { $ne: currentUserIdObject } } 
                });
    
            // Filter out null participants 
            const filteredDialogs = dialogs.map(dialog => {
                const otherUser = dialog.participants.find(p => p !== null);
                return {
                    ...dialog.toObject(),
                    otherUser 
                };
            });
    
            res.status(200).json(filteredDialogs);
        } catch (e) {
            console.error('Error in fetching dialogs:', e);
            res.status(500).json({ error: 'Internal Server Error', details: e.message });
        }
    }

    async addDialog(req, res) {
        try {
            const { userId } = req.params;
    
            if (!req.user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
    
            if (!mongoose.isValidObjectId(userId)) {
                return res.status(400).json({ message: 'Invalid User ID' });
            }
    
            const currentUserIdObject = new mongoose.Types.ObjectId(req.user);
            const userIdObject = new mongoose.Types.ObjectId(userId);
    
            // Prevent user from creating a dialog with themselves
            if (currentUserIdObject.equals(userIdObject)) {
                return res.status(400).json({ message: 'Cannot create a dialog with yourself' });
            }
    
            const user = await User.findById(userIdObject);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Check if dialog already exists
            const existingDialog = await Dialog.findOne({
                participants: { $all: [currentUserIdObject, userIdObject] }
            });
    
            if (existingDialog) {
                return res.status(409).json({ message: 'Dialog already exists' });
            }
    
            // Create new dialog
            const dialog = new Dialog({
                participants: [currentUserIdObject, userIdObject],
                lastDialogActivityDate: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                newMessagesCount: 0,
                userName: user.username
            });
    
            await dialog.save();
    
            res.status(201).json({ status: 0, message: 'Dialog successfully created!', dialog });
        } catch (e) {
            console.error('Error in addDialog:', e);
            res.status(500).json({ message: 'Internal Server Error', error: e.message });
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