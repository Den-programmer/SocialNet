const Router = require('express')
const AvatarController = require('../controllers/AvatarController')
const multer = require('multer')
const {verifyToken} = require('../middleware/verifyToken.js')
const dotenv = require('dotenv')

dotenv.config()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = Router()

router.use(verifyToken)

router.get('/getAvatar/:userId', AvatarController.getAvatar)
router.put('/updateAvatar', upload.single('image'), AvatarController.updateAvatar)

module.exports = router