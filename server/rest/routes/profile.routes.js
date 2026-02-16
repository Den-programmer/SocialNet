import { Router } from 'express'
import ProfileController from '../controllers/ProfileController.js'
import { verifyToken } from '../../middleware/verifyToken.js'
import { createValidator, updateAboutMeSchema, updateContactsSchema } from '../../security/validation.js'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.use(verifyToken)

router.get('/getProfile/:userId', ProfileController.getProfile)

router.put('/aboutMe/updateAboutMe', createValidator(updateAboutMeSchema), ProfileController.updateAboutMe)
router.put('/contacts/updateContacts', createValidator(updateContactsSchema), ProfileController.updateContacts)

export default router