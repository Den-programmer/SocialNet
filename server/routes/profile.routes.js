const { Router } = require('express')
const ProfileController = require('../controllers/ProfileController')
const {verifyToken} = require('../middleware/verifyToken.js')
const dotenv = require('dotenv')

dotenv.config()
const router = Router()

router.use(verifyToken)

router.get('/getProfile/:userId', ProfileController.getProfile)

router.put('/aboutMe/updateAboutMe', ProfileController.updateAboutMe)
router.put('/contacts/updateContacts', ProfileController.updateContacts)


module.exports = router