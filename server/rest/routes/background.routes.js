import { Router } from 'express'
import BackgroundController from '../controllers/BackgroundController.js'
import multer from 'multer'
import { verifyToken } from '../../middleware/verifyToken.js'
import dotenv from 'dotenv'
import { storagePolicy } from '../../config/storagePolicy.js'
import { rateLimitMiddleware } from '../../security/securityHeaders.js'

dotenv.config()

const storage = multer.memoryStorage()
const upload = multer({ storage, limits: { fileSize: storagePolicy.maxUploadBytes, files: 1 } })

const router = Router()

router.use(verifyToken)

router.get('/getBackground/:userId', BackgroundController.getBackground)
router.put('/updateBackground', rateLimitMiddleware(10, 60000, req => req.user || req.ip), upload.single('image'), BackgroundController.updateBackground)

export default router