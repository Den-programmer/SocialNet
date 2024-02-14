const { Router } = require('express')
const NewsController = require('../controllers/NewsController')
const router = Router()

router.get('/getNews', NewsController.getNews)
router.get('/getPopularNews', NewsController.getPopularNews)

module.exports = router