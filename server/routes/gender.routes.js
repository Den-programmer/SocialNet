const { Router } = require('express')
const GenderController = require('../controllers/GenderController')
const {verifyToken} = require('../middleware/verifyToken.js')
const dotenv = require('dotenv')

dotenv.config()
const router = Router()

router.use(verifyToken)

router.get('/getGender/:userId', GenderController.getGender)
router.put('/updateGender', GenderController.updateGender)

module.exports = router