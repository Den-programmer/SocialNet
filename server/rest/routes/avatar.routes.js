import { Router } from 'express'
import AvatarController from '../controllers/AvatarController.js'
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

router.get('/getAvatar/:userId', AvatarController.getAvatar)
router.put('/updateAvatar', rateLimitMiddleware(10, 60000, req => req.user || req.ip), upload.single('image'), AvatarController.updateAvatar)

export default router