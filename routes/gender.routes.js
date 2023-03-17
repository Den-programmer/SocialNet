const { Router } = require('express')
const GenderController = require('../controllers/GenderController')
const router = Router()

router.get('/gender/:userId', GenderController.getGender)
router.put('/gender', GenderController.updateGender)

module.exports = router