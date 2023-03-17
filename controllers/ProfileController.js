const User = require('../models/user.js')
const { catchRes, StandartRes } = require('../routes/responses/responses.js')

class ProfileController {
    async getProfile(req, res) {
        try {
            const { userId } = req.params
            if(!userId) {
                res.status(400).json(new StandartRes(1, 'User\'s id is undefined.'))
            }
            const user = await User.findById(userId)
            const { profile } = user
            return res.json(new StandartRes(0, '', { profile }))
        } catch (e) {
            res.status(500).json(catchRes)
        }
    }
    async saveProfile(req, res) {
        try {
            const { profile } = req.body
            const userId = profile.userId
            if(!userId) {
                res.status(400).json(new StandartRes(1, 'User\'s id is undefined.'))
            }
            if(!profile) {
                res.status(400).json(new StandartRes(1, 'Profile is undefined.'))
            }

            const updatedUser = await User.findByIdAndUpdate(userId, {profile}, { new: true })
            const profileU = updatedUser.profile
            return res.json(new StandartRes(0, '', { profile: profileU }))
        } catch(e) {
            res.status(500).json(catchRes)
        }
    }
}

module.exports = new ProfileController()