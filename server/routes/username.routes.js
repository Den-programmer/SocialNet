const { Router } = require('express')
const UsernameController = require('../controllers/UsernameController')
const {verifyToken} = require('../middleware/verifyToken.js')
const dotenv = require('dotenv')

dotenv.config()
const router = Router()

router.use(verifyToken)

router.get('/getUsername/:userId', UsernameController.getUsername)
router.put('/saveUsername', UsernameController.saveUsername)

module.exports = router