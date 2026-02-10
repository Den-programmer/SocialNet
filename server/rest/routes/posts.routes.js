import { Router } from 'express'
import PostsController from '../controllers/PostsController.js'
import multer from 'multer'
import { verifyToken } from '../../middleware/verifyToken.js'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/getPosts/:userId', verifyToken, PostsController.getPosts)
router.post('/createPost', upload.single('postPhoto'), verifyToken, PostsController.createPost)
router.get('/getPost/:userId/:postId', verifyToken, PostsController.getPost)
router.put('/updatePostTitle', verifyToken, PostsController.updatePostTitle)
router.put('/updatePostInformat', verifyToken, PostsController.updatePostInf)
router.delete('/deletePost/:postId', verifyToken, PostsController.deletePost)

export default router