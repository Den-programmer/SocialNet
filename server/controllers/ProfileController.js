import User from '../models/user.js'
import { catchRes, StandartRes } from '../routes/responses/responses.js'

class ProfileController {
  async getProfile(req, res) {
    try {
      const { userId } = req.params
      if (!userId) {
        return res.status(400).json(new StandartRes(1, "User's id is undefined."))
      }
      const user = await User.findById(userId)
      const { profile } = user
      res.json(new StandartRes(0, '', { ...profile }))
    } catch (e) {
      res.status(500).json(catchRes)
    }
  }

  async updateAboutMe(req, res) {
    try {
      const { aboutMe, userId } = req.body
      if (!userId) {
        return res.status(400).json(new StandartRes(1, "User's id is undefined."))
      }
      if (!aboutMe) {
        return res.status(400).json(new StandartRes(1, 'About me information is undefined.'))
      }
      const user = await User.findById(userId)
      const updatedProfile = { ...user.profile, aboutMe }
      const updatedUser = await User.findByIdAndUpdate(userId, { profile: updatedProfile }, { new: true })
      res.json(new StandartRes(0, '', { aboutMe: updatedUser.profile.aboutMe }))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }

  async updateContacts(req, res) {
    try {
      const { contacts, userId } = req.body
      if (!userId) {
        return res.status(400).json(new StandartRes(1, "User's id is undefined."))
      }
      if (!contacts) {
        return res.status(400).json(new StandartRes(1, 'Contacts is undefined.'))
      }
      const user = await User.findById(userId)
      const updatedProfile = { ...user.profile, contacts }
      const updatedUser = await User.findByIdAndUpdate(userId, { profile: updatedProfile }, { new: true })
      res.json(new StandartRes(0, '', { contacts: updatedUser.profile.contacts }))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }
}

export default new ProfileController()