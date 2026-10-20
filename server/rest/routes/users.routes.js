import { Router } from 'express'
import UsersController from '../controllers/UsersController.js'
import { verifyToken } from '../../middleware/verifyToken.js'
import { rateLimitMiddleware } from '../../security/securityHeaders.js'

const router = Router()

router.get('/getUsers/:pageSize?/:currentPage?/:term?', UsersController.getUsers)

router.use(verifyToken)

router.post('/followUser/:userId', rateLimitMiddleware(30, 60000, req => req.user || req.ip), UsersController.followUser)
router.delete('/unfollowUser/:userId', rateLimitMiddleware(30, 60000, req => req.user || req.ip), UsersController.unfollowUser)
router.get('/isFollowed/:userId', UsersController.isUserFollowed)
router.get('/getFriends', UsersController.getFriends)

export default router
