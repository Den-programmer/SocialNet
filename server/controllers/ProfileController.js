const User = require('../models/user.js')
const { catchRes, StandartRes } = require('../routes/responses/responses.js')

class ProfileController {
    async getProfile(req, res) {
        try {
            const { userId } = req.params
            if(!userId) {
                res.status(400).json(new StandartRes(1, 'User\'s id is undefined.'))
            }
            const user = await User.findById(userId)
            const { profile } = user
            return res.json(new StandartRes(0, '', { profile }))
        } catch (e) {
            res.status(500).json(catchRes)
        }
    }

    async updateAboutMe(req, res) {
        try {
            const { aboutMe, userId } = req.body
            if(!userId) {
                res.status(400).json(new StandartRes(1, 'User\'s id is undefined.'))
            }
            if(!aboutMe) {
                res.status(400).json(new StandartRes(1, 'About me information is undefined.'))
            }
            const user = await User.findById(userId)
            const profile = user.profile
            const updatedProfile = { ...profile, aboutMe }
            const updatedUser = await User.findByIdAndUpdate(userId, { profile: updatedProfile }, { new: true })
            const updatedAboutMe = updatedUser.profile.aboutMe
            return res.json(new StandartRes(0, '', { aboutMe: updatedAboutMe }))
        } catch (e) {
            console.error(e)
            res.status(500).json(catchRes)
        }
    }

    async updateContacts(req, res) {
        try {
            const { contacts, userId } = req.body
            if(!userId) {
                res.status(400).json(new StandartRes(1, 'User\'s id is undefined.'))
            }
            if(!contacts) {
                res.status(400).json(new StandartRes(1, 'Contacts is undefined.'))
            }
            const user = await User.findById(userId)
            const profile = user.profile
            const updatedProfile = { ...profile, contacts }
            const updatedUser = await User.findByIdAndUpdate(userId, { profile: updatedProfile }, { new: true })
            const updatedContacts = updatedUser.profile.contacts
            return res.json(new StandartRes(0, '', { contacts: updatedContacts }))
        } catch(e) {
            console.error(e)
            res.status(500).json(catchRes)
        }
    }
}

module.exports = new ProfileController()