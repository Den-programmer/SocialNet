import { Router } from 'express'
import NewsController from '../controllers/NewsController.js'
import { verifyToken } from '../../middleware/verifyToken.js'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.use(verifyToken)

router.get('/getNews', NewsController.getNews)
router.get('/getPopularNews', NewsController.getPopularNews)

export default router