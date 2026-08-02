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
      if (contacts === undefined || contacts === null) {
        return res.status(400).json(new StandartRes(1, 'Contacts is undefined.'))
      }

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json(new StandartRes(1, 'User not found.'))
      }

      const currentProfile = user.profile?.toObject?.() ?? user.profile ?? {}
      const updatedProfile = {
        ...currentProfile,
        contacts: {
          ...(currentProfile.contacts ?? {}),
          ...(contacts ?? {})
        }
      }

      const updatedUser = await User.findByIdAndUpdate(userId, { profile: updatedProfile }, { new: true })
      res.json(new StandartRes(0, '', { contacts: updatedUser.profile.contacts }))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }
}

export default new ProfileController()