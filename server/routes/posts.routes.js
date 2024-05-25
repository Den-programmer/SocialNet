const { Router } = require('express')
const PostsController = require('../controllers/PostsController')
const multer = require('multer')
const {verifyToken} = require('../middleware/verifyToken.js')
const dotenv = require('dotenv')

dotenv.config()
const router = Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.use(verifyToken)

router.get('/getPosts/:userId', PostsController.getPosts)
router.post('/createPost', upload.single('postPhoto'), PostsController.createPost)
router.get('/getPost/:userId/:postId', PostsController.getPost)
router.put('/updatePost/:postId', PostsController.updatePost)
router.delete('/deletePost/:postId', PostsController.deletePost)


module.exports = router