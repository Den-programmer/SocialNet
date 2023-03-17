const { Router } = require('express')
const ProfileController = require('../controllers/ProfileController')
const router = Router()

router.get('/profile/:userId', ProfileController.getProfile)
router.put('/profile', ProfileController.saveProfile)

module.exports = router