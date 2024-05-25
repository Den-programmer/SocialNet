const { Router } = require('express')
const NewsController = require('../controllers/NewsController')
const {verifyToken} = require('../middleware/verifyToken.js')
const dotenv = require('dotenv')

dotenv.config()
const router = Router()

router.use(verifyToken)

router.get('/getNews', NewsController.getNews)
router.get('/getPopularNews', NewsController.getPopularNews)

module.exports = router