import { Router } from 'express'
import BackgroundController from '../controllers/BackgroundController.js'
import multer from 'multer'
import { verifyToken } from '../../middleware/verifyToken.js'
import dotenv from 'dotenv'

dotenv.config()

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = Router()

router.use(verifyToken)

router.get('/getBackground/:userId', BackgroundController.getBackground)
router.put('/updateBackground', upload.single('image'), BackgroundController.updateBackground)

export default router