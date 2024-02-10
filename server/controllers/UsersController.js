const User = require('../models/user.js')
const { catchRes, StandartRes } = require('../routes/responses/responses.js')

class UsersController {
    async getUsers(req, res) {
        try {
            const { pageSize, currentPage } = req.params;
            const { term } = req.query;

            console.log('Term from the start is:', term);

            const searchCriteria = [];
            const searchableProperties = ['username'];

            if (term) {
                searchableProperties.forEach(property => {
                    const criterion = {};
                    criterion[property] = { $regex: term, $options: 'i' };
                    console.log('Criterion is:', JSON.stringify(criterion));
                    searchCriteria.push(criterion);
                });
            }

            const query = searchCriteria.length > 0 ? { $or: searchCriteria } : {};

            console.log('Constructed query:', JSON.stringify(query));

            const users = await User.find(query)
                .limit(parseInt(pageSize))
                .skip(parseInt(pageSize) * (parseInt(currentPage) - 1));

            const usersWithoutPass = users.map(({ id, username, profile = {} }) => ({
                id,
                username,
                profile: {
                    photos: profile.photos,
                    status: profile.status
                },
                followed: false
            }));

            res.json(new StandartRes(0, '', { items: usersWithoutPass, totalCount: users.length }));
        } catch (e) {
            console.error('Error:', e);
            res.status(500).json(catchRes);
        }
    }
}


module.exports = new UsersController()