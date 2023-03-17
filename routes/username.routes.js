const { Router } = require('express')
const UsernameController = require('../controllers/UsernameController')
const router = Router()

router.get('/username/:userId', UsernameController.getUsername)
router.put('/username', UsernameController.saveUsername)

module.exports = router