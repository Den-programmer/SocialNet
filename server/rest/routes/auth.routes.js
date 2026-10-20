import { Router } from 'express'
import dotenv from 'dotenv'
import { createValidator, registerSchema, loginSchema } from '../../security/validation.js'
import { rateLimitMiddleware } from '../../security/securityHeaders.js'
import AuthController from '../controllers/AuthController.js'

dotenv.config()
const router = Router()

router.post('/register', rateLimitMiddleware(10, 60000), createValidator(registerSchema), AuthController.register)
router.post('/login', rateLimitMiddleware(10, 60000), createValidator(loginSchema), AuthController.login)
router.post('/logout', AuthController.logout)

export default router