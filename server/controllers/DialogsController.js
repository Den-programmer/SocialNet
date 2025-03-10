const Dialog = require('../models/dialog.js')
const { catchRes, StandartRes } = require('../routes/responses/responses.js')

class DialogsController {
    async getAllDialogs(req, res) {
        try {
            const currentUserId = req.user

            // Find dialogs where the user is a participant
            const dialogs = await Dialog.find({ _id: currentUserId })
                .populate('participants', 'username email') // Populate user details
                .sort({ updatedAt: -1 }) // Sort by the last message date
            res.status(200).json(dialogs)
        } catch (e) {
            res.status(500).json(catchRes)
        }
    }
}

module.exports = new DialogsController()