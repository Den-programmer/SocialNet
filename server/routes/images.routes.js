const { Router } = require('express')
const ImageController = require('../controllers/ImagesController.js')
const {verifyToken} = require('../middleware/verifyToken.js')
const dotenv = require('dotenv')

dotenv.config()
const router = Router()

router.use(verifyToken)

router.get('/get-secure-images', ImageController.getSecureImages)

module.exports = router