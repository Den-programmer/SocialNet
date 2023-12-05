const { Router } = require('express')
const GenderController = require('../controllers/GenderController')
const router = Router()

router.get('/getGender/:userId', GenderController.getGender)
router.put('/updateGender', GenderController.updateGender)

module.exports = router