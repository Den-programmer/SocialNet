import User from '../models/user.js'
import { catchRes, StandartRes } from '../routes/responses/responses.js'
import { cloudinaryAPI as cloudinary } from '../../cloudinaryConfig.js'
import { compressImage } from '../functions/functions.js'
import { deleteCloudinaryResource } from '../functions/cloudinaryHelper.js'

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

      if (!userId || !buffer || !mimetype) {
        console.error('Incomplete data for updating background:', { userId, buffer, mimetype })
        return res
          .status(400)
          .json(new StandartRes(1, 'Incomplete data for updating background.'))
      }

      // Get existing user to retrieve old background URL
      const existingUser = await User.findById(userId)
      const oldBackgroundUrl = existingUser?.background

      const compressedBuffer = await compressImage(buffer, mimetype)

      const imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'backgrounds', resource_type: 'image' },
          (error, result) => {
            if (error) return reject(error)
            resolve(result.secure_url)
          }
        )
        stream.end(compressedBuffer)
      })

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { background: imageUrl } },
        { new: true }
      )

      if (!updatedUser) {
        console.error('User not found or update failed.')
        return res
          .status(404)
          .json(new StandartRes(1, 'User not found or update failed.'))
      }

      // Delete old background from Cloudinary if it exists and is different from new one
      if (oldBackgroundUrl && oldBackgroundUrl !== imageUrl) {
        deleteCloudinaryResource(oldBackgroundUrl).catch(err =>
          console.error('Failed to delete old background from Cloudinary:', err)
        )
      }

      return res.json(new StandartRes(0, '', { background: updatedUser.background }))
    } catch (e) {
      console.error('Error:', e)
      return res.status(500).json(new StandartRes(1, 'Server error while updating background.'))
    }
  }
}

export default new BackgroundController()