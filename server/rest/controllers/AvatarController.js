import User from '../models/user.js'
import { catchRes, StandartRes } from '../routes/responses/responses.js'
import { cloudinaryAPI as cloudinary } from '../../cloudinaryConfig.js'
import { compressImage } from '../functions/functions.js'
import { deleteCloudinaryResource } from '../functions/cloudinaryHelper.js'

class AvatarController {
  async getAvatar(req, res) {
    try {
      const { userId } = req.params

      if (!userId) {
        return res.status(400).json(new StandartRes(1, 'User\'s id is undefined.'))
      }

      const user = await User.findById(userId)
      const { photos } = user.profile || {}

      return res.json(new StandartRes(0, '', { photos }))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }

  async updateAvatar(req, res) {
    try {
      const { userId } = req.body
      const { buffer, mimetype } = req.file || {}

      if (!userId || !buffer || !mimetype) {
        console.error('Incomplete data for updating avatar:', { userId, buffer, mimetype })
        return res.status(400).json(new StandartRes(1, 'Incomplete data for updating avatar.'))
      }

      // Get existing user to retrieve old avatar URL
      const existingUser = await User.findById(userId)
      const oldAvatarUrl = existingUser?.profile?.photos?.large

      const compressedBuffer = await compressImage(buffer, mimetype)

      const imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'avatars', resource_type: 'image' },
          (error, result) => {
            if (error) return reject(error)
            resolve(result.secure_url)
          }
        )
        stream.end(compressedBuffer)
      })

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            'profile.photos.large': imageUrl,
            'profile.photos.small': imageUrl,
          },
        },
        { new: true }
      )

      if (!updatedUser) {
        console.error('User not found or update failed.')
        return res.status(404).json(new StandartRes(1, 'User not found or update failed.'))
      }

      // Delete old avatar from Cloudinary if it exists and is different from new one
      if (oldAvatarUrl && oldAvatarUrl !== imageUrl) {
        deleteCloudinaryResource(oldAvatarUrl).catch(err =>
          console.error('Failed to delete old avatar from Cloudinary:', err)
        )
      }

      const { photos } = updatedUser.profile || {}

      return res.json(new StandartRes(0, '', { photos }))
    } catch (e) {
      console.error('Error:', e)
      res.status(500).json(catchRes)
    }
  }
}

export default new AvatarController()