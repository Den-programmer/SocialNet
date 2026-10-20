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
import { storagePolicy } from '../../config/storagePolicy.js'
import { rateLimitMiddleware } from '../../security/securityHeaders.js'
import Post from '../models/post.js'
import { enforceCountQuota, userQuota } from '../../middleware/quota.js'

dotenv.config()

const router = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage, limits: { fileSize: storagePolicy.maxUploadBytes, files: 1 } })

router.get('/getPosts/:userId', verifyToken, PostsController.getPosts)
router.post(
  '/createPost',
  verifyToken,
  rateLimitMiddleware(20, 60000, req => req.user || req.ip),
  upload.single('postPhoto'),
  createValidator(createPostSchema),
  enforceCountQuota(Post, req => ({ owner: req.user }), userQuota.maxUserPosts, 'post'),
  PostsController.createPost
)
router.get('/getPost/:userId/:postId', verifyToken, PostsController.getPost)
router.put('/updatePostTitle', verifyToken, createValidator(updatePostSchema), PostsController.updatePostTitle)
router.put('/updatePostInformat', verifyToken, createValidator(updatePostContentSchema), PostsController.updatePostInf)
router.put('/updatePostVisibility', verifyToken, createValidator(updatePostVisibilitySchema), PostsController.updatePostVisibility)
router.post('/:postId/like', verifyToken, rateLimitMiddleware(30, 60000, req => req.user || req.ip), PostsController.toggleLike)
router.delete('/:postId/like', verifyToken, rateLimitMiddleware(30, 60000, req => req.user || req.ip), PostsController.toggleLike)
router.post('/:postId/comment', verifyToken, rateLimitMiddleware(20, 60000, req => req.user || req.ip), PostsController.addComment)
router.post('/:postId/repost', verifyToken, rateLimitMiddleware(10, 60000, req => req.user || req.ip), PostsController.repostPost)
router.delete('/deletePost/:postId', verifyToken, PostsController.deletePost)

export default router