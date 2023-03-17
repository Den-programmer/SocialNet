const { StandartRes, catchRes } = require('../routes/responses/responses')
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

class AuthController {
    async register(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json(new StandartRes(1, 'Invalid data in registration form.'))
            }

            const { email, password, username, rememberMe } = req.body
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
    }
    async login(req, res) {
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
            res.json(new StandartRes(0, 'Successful authorizing', { token, userId: user.id }))
        } catch (e) {
            res.status(500).json(catchRes)
        }
    }
}

module.exports = new AuthController()
