const { Router } = require('express')
const UsernameController = require('../controllers/UsernameController')
const router = Router()

router.get('/getUsername/:userId', UsernameController.getUsername)
router.put('/saveUsername', UsernameController.saveUsername)

module.exports = router