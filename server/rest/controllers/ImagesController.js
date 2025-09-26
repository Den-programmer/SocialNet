import { catchRes, StandartRes } from '../routes/responses/responses.js'
import { v2 as cloudinary } from 'cloudinary'

class ImageController {
  async getSecureImages(req, res) {
    try {
      const imageNames = ['favicon', 'loginEnterImage', 'nophoto']
      const signedUrls = imageNames.map(name =>
        cloudinary.url(name, {
          sign_url: true,
          expires_at: Math.floor(Date.now() / 1000) + 3600,
        })
      )

      res.json(new StandartRes(0, '', { signedUrls }))
    } catch (error) {
      console.error('Error generating signed URL:', error)
      res.status(500).json(new StandartRes(1, 'Error generating signed URL'))
    }
  }
}

export default new ImageController()