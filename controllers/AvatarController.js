const User = require('../models/user.js')
const { catchRes, StandartRes } = require('../routes/responses/responses.js')
const fs = require('fs').promises

class AvatarController {
    async getAvatar(req, res) {
        try {
            const { userId } = req.params
            if (!userId) {
                res.status(400).json(new StandartRes(1, 'User\'s id is undefined.'))
                return
            }
            const user = await User.findById(userId)
            const { photos } = user
            return res.json(new StandartRes(0, '', { photos }))
        } catch (e) {
            res.status(500).json(catchRes)
        }
    }

    async updateAvatar(req, res) {
        try {
            const { userId } = req.body;
            const { buffer, mimetype, path } = req.file

            if (!userId || !buffer || !mimetype) {
                res.status(400).json(new StandartRes(1, 'Incomplete data for updating avatar.'))
                return
            }

            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $set: {
                        'profile.photos.large.data': buffer,
                        'profile.photos.large.contentType': mimetype,
                        'profile.photos.small.data': buffer,
                        'profile.photos.small.contentType': mimetype
                    }
                },
                { new: true }
            )

            if (!updatedUser) {
                console.error('User not found or update failed.')
                res.status(404).json(new StandartRes(1, 'User not found or update failed.'))
                return
            }

            console.log('Updated User:', updatedUser)

            const { photos } = updatedUser.profile
            if (!photos) {
                console.error('User does not have photos property.')
                res.status(500).json(new StandartRes(1, 'User does not have photos property.'))
                return
            }

            if (path) {
                await fs.unlink(path)
            }

            return res.json(new StandartRes(0, '', { photos }))
        } catch (e) {
            console.error('Error:', e)
            res.status(500).json(catchRes)
        }
    }
}

module.exports = new AvatarController()