const { Router } = require('express')
const ProfileController = require('../controllers/ProfileController')
const router = Router()

router.get('/getProfile/:userId', ProfileController.getProfile)

router.put('/aboutMe/updateAboutMe', ProfileController.updateAboutMe)
router.put('/contacts/updateContacts', ProfileController.updateContacts)

module.exports = router