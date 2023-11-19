const { Router } = require('express')
const PostsController = require('../controllers/PostsController')
const router = Router()

router.get('/getPosts/:userId', PostsController.getPosts)
router.post('/createPost', PostsController.createPost)
router.get('/getPost/:userId/:postId', PostsController.getPost)
router.put('/updatePost', PostsController.updatePost)
router.delete('/deletePost', PostsController.deletePost)

module.exports = router