const User = require('../models/user.js');
const { catchRes, StandartRes } = require('../routes/responses/responses.js');

class UsersController {
    async getUsers(req, res) {
        try {
            const { pageSize, currentPage, term } = req.query;

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

            res.json(new StandartRes(0, '', { items: usersWithoutPass, totalCount: await User.countDocuments(query) }));
        } catch (e) {
            console.error('Error:', e);
            res.status(500).json(new StandartRes(1, 'Internal server error'));
        }
    }

    async followUser(req, res) {
        try {
            const { userId } = req.params
            const currentUserId = req.user
            
            if (!currentUserId) {
                return res.status(401).json(new StandartRes(1, 'Unauthorized'));
            }

            console.log('Current user ID:', currentUserId);
            console.log('User ID to follow:', userId);

            const userToFollow = await User.findById(userId);

            if (!userToFollow) {
                return res.status(404).json(new StandartRes(1, 'User not found'));
            }

            if (userToFollow.followers.includes(currentUserId)) {
                return res.status(400).json(new StandartRes(1, 'User already followed'));
            }

            userToFollow.followers.push(currentUserId);
            await userToFollow.save();

            res.json(new StandartRes(0, 'Followed successfully', {}));
        } catch (e) {
            console.error('Error:', e);
            res.status(500).json(new StandartRes(1, 'Internal server error'));
        }
    }

    async unfollowUser(req, res) {
        try {
            const { userId } = req.params
            const currentUserId = req.user

            if (!currentUserId) {
                return res.status(401).json(new StandartRes(1, 'Unauthorized'));
            }

            const userToUnfollow = await User.findById(userId);

            if (!userToUnfollow) {
                return res.status(404).json(new StandartRes(1, 'User not found'));
            }

            const index = userToUnfollow.followers.indexOf(currentUserId);
            if (index !== -1) {
                userToUnfollow.followers.splice(index, 1);
                await userToUnfollow.save();
            } else {
                return res.status(400).json(new StandartRes(1, 'You are not following this user'));
            }

            res.json(new StandartRes(0, 'Unfollowed successfully', {}));
        } catch (e) {
            console.error('Error:', e);
            res.status(500).json(new StandartRes(1, 'Internal server error'));
        }
    }

    async getFriends(req, res) {
        try {
            const currentUserId = req.user

            if (!currentUserId) {
                return res.status(401).json(new StandartRes(1, 'Unauthorized'));
            }

            const currentUser = await User.findById(currentUserId).populate('following'); // Ensure following is properly populated.

            if (!currentUser) {
                return res.status(404).json(new StandartRes(1, 'User not found'));
            }

            console.log('Mine following:', currentUser.following);

            res.json(new StandartRes(0, '', { following: currentUser.following, totalCount: currentUser.following.length }));
        } catch (e) {
            console.error('Error:', e);
            res.status(500).json(new StandartRes(1, 'Internal server error'));
        }
    }
}

module.exports = new UsersController()