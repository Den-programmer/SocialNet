import User from '../models/user.js'
import { catchRes, StandartRes } from '../routes/responses/responses.js'
import { unlink } from 'fs/promises'

class AvatarController {
  async getAvatar(req, res) {
    try {
      const { userId } = req.params

      if (!userId) {
        return res.status(400).json(new StandartRes(1, 'User\'s id is undefined.'))
      }

      const user = await User.findById(userId)
      const { photos } = user

      return res.json(new StandartRes(0, '', { photos }))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }

  async updateAvatar(req, res) {
    try {
      const { userId } = req.body
      const { buffer, mimetype, path } = req.file || {}
      console.log('req.file:', req.file)
      console.log('req.body:', req.body)
      if (!userId || !buffer || !mimetype) {
        console.error('Incomplete data for updating avatar:', { userId, buffer, mimetype })
        return res.status(400).json(new StandartRes(1, 'Incomplete data for updating avatar.'))
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            'profile.photos.large.data': buffer,
            'profile.photos.large.contentType': mimetype,
            'profile.photos.small.data': buffer,
            'profile.photos.small.contentType': mimetype,
          },
        },
        { new: true }
      )

      if (!updatedUser) {
        console.error('User not found or update failed.')
        return res.status(404).json(new StandartRes(1, 'User not found or update failed.'))
      }

      const { photos } = updatedUser.profile || {}
      if (!photos) {
        console.error('User does not have photos property.')
        return res.status(500).json(new StandartRes(1, 'User does not have photos property.'))
      }

      if (path) {
        await unlink(path)
      }

      return res.json(new StandartRes(0, '', { photos }))
    } catch (e) {
      console.error('Error:', e)
      res.status(500).json(catchRes)
    }
  }
}

export default new AvatarController()