const User = require('../models/user.js')
const { catchRes, StandartRes } = require('../routes/responses/responses.js')

class UsernameController {
    async getUsername(req, res) {
        try {
            const { userId } = req.params
            if(!userId) {
                res.status(400).json(new StandartRes(1, 'User\'s id is undefined.'))
            }
            const user = await User.findById(userId)
            const { username } = user
            return res.json(new StandartRes(0, '', { username }))
        } catch (e) {
            res.status(500).json(catchRes)
        }
    }
    async saveUsername(req, res) {
        try {
            const { userId, username } = req.body
            if(!userId) {
                res.status(400).json(new StandartRes(1, 'User\'s id is undefined.'))
            }
            if(!username) {
                res.status(400).json(new StandartRes(1, 'Username is undefined.'))
            }
            const updatedUser = await User.findByIdAndUpdate(userId, {username}, { new: true })
            return res.json(updatedUser.username)
        } catch(e) {
            res.status(500).json(catchRes)
        }
    }
}

module.exports = new UsernameController()