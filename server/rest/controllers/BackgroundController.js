import User from '../models/user.js'
import { catchRes, StandartRes } from '../routes/responses/responses.js'
import { unlink } from 'fs/promises'

class BackgroundController {
  async getBackground(req, res) {
    try {
      const { userId } = req.params

      if (!userId) {
        return res.status(400).json(new StandartRes(1, 'User\'s id is undefined.'))
      }

      const user = await User.findById(userId)
      const { background } = user

      return res.json(new StandartRes(0, '', { background }))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }

  async updateBackground(req, res) {
    try {
      const { userId } = req.body
      const { buffer, mimetype } = req.file || {}

      console.log('req.file:', req.file)
      console.log('req.body:', req.body)

      if (!userId || !buffer || !mimetype) {
        console.error('Incomplete data for updating background:', { userId, buffer, mimetype })
        return res
          .status(400)
          .json(new StandartRes(1, 'Incomplete data for updating background.'))
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            'background.data': buffer,
            'background.contentType': mimetype,
          },
        },
        { new: true }
      )

      if (!updatedUser) {
        console.error('User not found or update failed.')
        return res
          .status(404)
          .json(new StandartRes(1, 'User not found or update failed.'))
      }

      if (!updatedUser.background) {
        console.error('User does not have background property.')
        return res
          .status(500)
          .json(new StandartRes(1, 'User does not have background property.'))
      }

      return res.json(new StandartRes(0, '', { background: updatedUser.background }))
    } catch (e) {
      console.error('Error:', e)
      return res.status(500).json(new StandartRes(1, 'Server error while updating background.'))
    }
  }
}

export default new BackgroundController()