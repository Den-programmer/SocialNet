const User = require('../models/user.js')
const { catchRes, StandartRes } = require('../routes/responses/responses.js')

class GenderController {
    async getGender(req, res) {
        try {
            const { userId } = req.params
            if(!userId) {
                res.status(400).json(new StandartRes(1, 'User\'s id is undefined.'))
            }
            const user = await User.findById(userId)
            const { gender } = user
            return res.json(new StandartRes(0, '', { gender }))
        } catch (e) {
            res.status(500).json(catchRes)
        }
    }
    async updateGender(req, res) {
        try {
            const { gender, userId } = req.body
            if(!userId) {
                res.status(400).json(new StandartRes(1, 'User\'s id is undefined.'))
            }
            if(!gender) {
                res.status(400).json(new StandartRes(1, 'Gender is undefined.'))
            }
            const updatedUser = await User.findByIdAndUpdate(userId, {gender}, { new: true })
            return res.json(updatedUser.gender)
        } catch(e) {
            res.status(500).json(catchRes)
        }
    }
}

module.exports = new GenderController()