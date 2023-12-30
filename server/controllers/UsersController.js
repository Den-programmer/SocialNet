const User = require('../models/user.js')
const { catchRes, StandartRes } = require('../routes/responses/responses.js')

class UsersController {
    async getUsers(req, res) {
        try {
            const { pageSize, currentPage, term } = req.params

            const searchCriteria = []
            const searchableProperties = ['name', 'email']

            searchableProperties.forEach(property => {
                const criterion = {}
                criterion[property] = { $regex: new RegExp(term, 'i') }
                searchCriteria.push(criterion)
            })

            const query = { $or: searchCriteria }
            const users = await User.find(query)
                .limit(parseInt(pageSize))
                .skip(parseInt(pageSize) * (parseInt(currentPage) - 1))

            const usersWithoutPass = users.map(({ id, username, profile = {} }) => ({
                id,
                username,
                profile: {
                    photos: profile.photos,
                    status: profile.status
                },
                followed: false
            }))
            res.json(new StandartRes(0, '', { items: usersWithoutPass, totalCount: users.length }))
        } catch (e) {
            console.error('Error:', e)
            res.status(500).json(catchRes)
        }
    }
}

module.exports = new UsersController()