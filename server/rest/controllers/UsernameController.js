import User from '../models/user.js'
import { catchRes, StandartRes } from '../routes/responses/responses.js'

class UsernameController {
  async getUsername(req, res) {
    try {
      const { userId } = req.params
      if (!userId) {
        return res.status(400).json(new StandartRes(1, "User's id is undefined."))
      }
      const user = await User.findById(userId)
      const { username } = user
      res.json(new StandartRes(0, '', { username }))
    } catch (e) {
      res.status(500).json(catchRes)
    }
  }

  async saveUsername(req, res) {
    try {
      const { userId, username } = req.body
      if (!userId) {
        return res.status(400).json(new StandartRes(1, "User's id is undefined."))
      }
      if (!username) {
        return res.status(400).json(new StandartRes(1, 'Username is undefined.'))
      }
      const updatedUser = await User.findByIdAndUpdate(userId, { username }, { new: true })
      res.json(new StandartRes(0, '', { username: updatedUser.username }))
    } catch (e) {
      res.status(500).json(catchRes)
    }
  }
}

export default new UsernameController()