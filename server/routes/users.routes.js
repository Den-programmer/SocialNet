const { Router } = require('express')
const UsersController = require('../controllers/UsersController')
const { verifyToken } = require('../middleware/verifyToken')
const router = Router()

router.get('/getUsers/:pageSize?/:currentPage?/:term?', UsersController.getUsers)
router.post('/followUser/:userId', verifyToken, UsersController.followUser)
router.delete('/unfollowUser/:userId', verifyToken, UsersController.unfollowUser)
router.get('/getFriends', verifyToken, UsersController.getFriends)

module.exports = router