const { Router } = require('express')
const ProfileController = require('../controllers/ProfileController')
const router = Router()

router.get('/getProfile/:userId', ProfileController.getProfile)
router.put('/saveProfile', ProfileController.saveProfile)

module.exports = router