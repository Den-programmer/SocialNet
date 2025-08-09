import { Router } from 'express'
import UsersController from '../controllers/UsersController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = Router()

router.get('/getUsers/:pageSize?/:currentPage?/:term?', UsersController.getUsers)

router.use(verifyToken)

router.post('/followUser/:userId', UsersController.followUser)
router.delete('/unfollowUser/:userId', UsersController.unfollowUser)
router.get('/isFollowed/:userId', UsersController.isUserFollowed)
router.get('/getFriends', UsersController.getFriends)

export default router
