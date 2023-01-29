const { Router } = require('express')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const User = require('../models/user.js')
const router = Router()

dotenv.config()

class StandartRes {
    constructor(resultCode, message, data = {}) {
        this.resultCode = resultCode
        this.message = message
        this.data = data
    }
    getResultCode() {
        return this.resultCode
    }
    getMessage() {
        return this.message
    }
    getData() {
        return this.data
    }
}

const catchRes = new StandartRes(1, "Something is gone wrong...")

router.post('/register',
    [
        check('email', 'Invalid email').isEmail(),
        check('password')
        .exists().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Min password length is 6.'),
        check('username')
        .isLength({ max: 20 }).withMessage('User name length must be lesser than 20 chars.'),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json(new StandartRes(1, 'Invalid data in registration form.'))
            }

            const { email, password, username, rememberMe } = req.body
            console.log(email, password, username)
            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json(new StandartRes(1, 'There is user with this email.'))
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword, username, rememberMe })

            await user.save()

            res.status(201).json(new StandartRes(0, 'User is created.', { userId: user.id }))
        } catch (e) {
            res.status(500).json(catchRes)
        }
    })

router.post('/login',
    [
        check('email', 'Enter correct email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json(new StandartRes(1, 'Invalid data in login form.'))
            }

            const { email, password } = req.body

            const user = await User.findOne({ email })
            const epErrRes = new StandartRes(1, 'Invalid email or password.')

            if(!user) {
                return res.status(400).json(epErrRes)
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) {
                return res.status(400).json(epErrRes)
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )
            res.json({ token, userId: user.id })
        } catch (e) {
            res.status(500).json(catchRes)
        }
    })

module.exports = router