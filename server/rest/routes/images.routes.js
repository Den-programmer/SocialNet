import { Router } from 'express'
import ImageController from '../controllers/ImagesController.js'
import { verifyToken } from '../../middleware/verifyToken.js'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.use(verifyToken)

router.get('/get-secure-images', ImageController.getSecureImages)

export default router