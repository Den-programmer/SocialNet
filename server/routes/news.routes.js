const { Router } = require('express')
const NewsController = require('../controllers/NewsController')
const router = Router()

router.get('/getNews', NewsController.getNews)

module.exports = router