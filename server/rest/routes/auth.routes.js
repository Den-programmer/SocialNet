import { Router } from 'express'
import dotenv from 'dotenv'
import { z } from 'zod'
import AuthController from '../controllers/AuthController.js'

dotenv.config()
const router = Router()

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body)
    next()
  } catch (err) {
    return res.status(400).json({ errors: err.errors })
  }
}

const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string()
    .min(6, 'Min password length is 6')
    .max(100, 'Password too long'),
  username: z.string()
    .max(20, 'User name length must be lesser than 20 chars'),
})

const loginSchema = z.object({
  email: z.string().email('Enter correct email'),
  password: z.string().min(1, 'Enter password'),
})

// --- Роуты ---
router.post('/register', validate(registerSchema), AuthController.register)
router.post('/login', validate(loginSchema), AuthController.login)
router.post('/logout', AuthController.logout)

export default router