const { Router } = require('express')
const dotenv = require('dotenv')
const { check } = require('express-validator')
const router = Router()
const AuthController = require('../controllers/AuthController.js')

dotenv.config()

router.post('/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password')
        .exists().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Min password length is 6.'),
        check('username')
        .isLength({ max: 20 }).withMessage('User name length must be lesser than 20 chars.'),
    ],
    AuthController.register)

router.post('/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    AuthController.login)

module.exports = router