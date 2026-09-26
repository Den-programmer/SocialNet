import { Router } from 'express'
import PostsController from '../controllers/PostsController.js'
import multer from 'multer'
import { verifyToken } from '../../middleware/verifyToken.js'
import {
  createValidator,
  createPostSchema,
  updatePostSchema,
  updatePostContentSchema,
  updatePostVisibilitySchema
} from '../../security/validation.js'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.get('/getPosts/:userId', verifyToken, PostsController.getPosts)
router.post('/createPost', upload.single('postPhoto'), verifyToken, createValidator(createPostSchema), PostsController.createPost)
router.get('/getPost/:userId/:postId', verifyToken, PostsController.getPost)
router.put('/updatePostTitle', verifyToken, createValidator(updatePostSchema), PostsController.updatePostTitle)
router.put('/updatePostInformat', verifyToken, createValidator(updatePostContentSchema), PostsController.updatePostInf)
router.put('/updatePostVisibility', verifyToken, createValidator(updatePostVisibilitySchema), PostsController.updatePostVisibility)
router.post('/:postId/like', verifyToken, PostsController.toggleLike)
router.delete('/:postId/like', verifyToken, PostsController.toggleLike)
router.post('/:postId/comment', verifyToken, PostsController.addComment)
router.post('/:postId/repost', verifyToken, PostsController.repostPost)
router.delete('/deletePost/:postId', verifyToken, PostsController.deletePost)

export default router