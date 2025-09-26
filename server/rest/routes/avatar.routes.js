import { Router } from 'express'
import AvatarController from '../controllers/AvatarController.js'
import multer from 'multer'
import { verifyToken } from '../../middleware/verifyToken.js'
import dotenv from 'dotenv'

dotenv.config()

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = Router()

router.use(verifyToken)

router.get('/getAvatar/:userId', AvatarController.getAvatar)
router.put('/updateAvatar', upload.single('image'), AvatarController.updateAvatar)

export default router