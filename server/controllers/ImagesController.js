const { catchRes, StandartRes } = require('../routes/responses/responses.js')
const cloudinary = require('cloudinary').v2

class ImageController {
  async getSecureImages(req, res) {
    try {
      const imageNames = ["favicon", "loginEnterImage", "nophoto"]; 
      const signedUrls = imageNames.map((name) =>
        cloudinary.url(name, {
          sign_url: true,
          expires_at: Math.floor(Date.now() / 1000) + 3600, // 1-hour expiry
        })
      );

      res.json(new StandartRes(0, "", { signedUrls }));
    } catch (error) {
      res.status(500).json(new StandartRes(1, "Error generating signed URL"));
    }
  }
}

module.exports = new ImageController()