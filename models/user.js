const { Schema, model } = require('mongoose')

const User = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: false },
    rememberMe: { type: Boolean, required: false },
    captcha: { type: String, required: false }
})

module.exports = model('User', User)