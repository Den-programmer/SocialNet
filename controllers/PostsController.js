const User = require('../models/user.js')
const Post = require('../models/post.js')
const { catchRes, StandartRes } = require('../routes/responses/responses.js')
const { makeRandomIdString } = require('../functions/functions.js')

class PostsController {
    async getPosts(req, res) {
        try {
            const { userId } = req.params
            if (!userId) {
                res.status(400).json(new StandartRes(1, 'User\'s id is undefined.'))
            }
            const user = await User.findById(userId)
            const { posts } = user
            return res.json(new StandartRes(0, '', { posts }))
        } catch (e) {
            res.status(500).json(catchRes)
        }
    }
    async createPost(req, res) {
        try {
            const { newPostTitle, newPostInformat, postPhoto } = req.body
            if (!newPostTitle || !newPostInformat || !postPhoto) {
                res.status(400).json(new StandartRes(1, 'Post is undefined.'))
            }
            const post = {
                id: makeRandomIdString(100),
                postTitle: newPostTitle,
                postInf: newPostInformat,
                postImg: postPhoto,
                likesCount: 0,
                isEditTitle: false,
                isEditPostInf: false
            }
            const newPost = await Post.create(post)
            return res.json(new StandartRes(0, '', { newPost }))
        } catch (e) {
            console.error(e)
            res.status(500).json(catchRes)
        }
    }
    async getPost(req, res) {
        try {
            const { userId, postId } = req.params;
            if (!userId || !postId) {
                return res.status(400).json(new StandartRes(1, 'User or Post id is undefined.'));
            }
    
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json(new StandartRes(1, 'User not found.'));
            }
    
            const post = user.posts.find((p) => p._id.toString() === postId);
            if (!post) {
                return res.status(404).json(new StandartRes(1, 'Post not found.'));
            }
    
            return res.json(new StandartRes(0, '', { post }));
        } catch (e) {
            res.status(500).json(catchRes);
        }
    }
    async updatePost(req, res) {
        try {
            const { postId, updatedPostTitle, updatedPostInformat, updatedPostPhoto } = req.body;
    
            if (!postId || !updatedPostTitle || !updatedPostInformat || !updatedPostPhoto) {
                return res.status(400).json(new StandartRes(1, 'Incomplete data for updating post.'));
            }
    
            const updatedPost = await Post.findByIdAndUpdate(
                postId,
                {
                    postTitle: updatedPostTitle,
                    postInf: updatedPostInformat,
                    postImg: updatedPostPhoto,
                },
                { new: true }
            );
    
            if (!updatedPost) {
                return res.status(404).json(new StandartRes(1, 'Post not found.'));
            }
    
            return res.json(new StandartRes(0, '', { updatedPost }));
        } catch (e) {
            console.error(e);
            res.status(500).json(catchRes);
        }
    }
    
    async deletePost(req, res) {
        try {
            const { postId } = req.body;
    
            if (!postId) {
                return res.status(400).json(new StandartRes(1, 'Post id is undefined.'));
            }
    
            const deletedPost = await Post.findByIdAndDelete(postId);
    
            if (!deletedPost) {
                return res.status(404).json(new StandartRes(1, 'Post not found.'));
            }
    
            return res.json(new StandartRes(0, 'Post deleted successfully.', { deletedPost }));
        } catch (e) {
            console.error(e);
            res.status(500).json(catchRes);
        }
    }
}

module.exports = new PostsController()