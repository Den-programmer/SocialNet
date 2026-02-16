import { Router } from 'express'
import dotenv from 'dotenv'
import { createValidator, registerSchema, loginSchema } from '../../security/validation.js'
import AuthController from '../controllers/AuthController.js'

dotenv.config()
const router = Router()

router.post('/register', createValidator(registerSchema), AuthController.register)
router.post('/login', createValidator(loginSchema), AuthController.login)
router.post('/logout', AuthController.logout)

export default router