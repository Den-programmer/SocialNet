const { Router } = require('express')
const UsersController = require('../controllers/UsersController')
const router = Router()

router.get('/getUsers/:pageSize?/:currentPage?/:term?', UsersController.getUsers)

module.exports = router