import User from '../models/user.js'
import Post from '../models/post.js'
import { catchRes, StandartRes } from '../routes/responses/responses.js'
import { generateUniqueId } from '../functions/functions.js'

class PostsController {
  async getPosts(req, res) {
    try {
      const { userId } = req.params
      if (!userId) {
        return res.status(400).json(new StandartRes(1, "User's id is undefined."))
      }

      const user = await User.findById(userId).populate({
        path: 'posts',
        model: 'Post'
      })

      const posts = user.posts.map(post => ({
        ...post._doc,
        createdAt: post.createdAt.toLocaleDateString('en-GB')
      }))

      res.json(new StandartRes(0, '', posts))
    } catch (e) {
      res.status(500).json(catchRes)
    }
  }

  async createPost(req, res) {
    try {
      const { userId, newPostTitle, newPostInformat } = req.body
      const { buffer, mimetype } = req.file

      if (!userId || !newPostTitle || !newPostInformat || !buffer || !mimetype) {
        return res.status(400).json(new StandartRes(1, 'Incomplete data for creating post.'))
      }

      const newPost = await Post.create({
        id: generateUniqueId(),
        postTitle: newPostTitle,
        postInf: newPostInformat,
        postImg: {
          data: buffer,
          contentType: mimetype
        },
        likesCount: 0,
        isEditTitle: false,
        isEditPostInf: false,
        owner: userId
      })

      await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } })

      res.json(new StandartRes(0, '', { ...newPost }))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }

  async getPost(req, res) {
    try {
      const { userId, postId } = req.params
      if (!userId || !postId) {
        return res.status(400).json(new StandartRes(1, 'User or Post id is undefined.'))
      }

      const user = await User.findById(userId).populate('posts')
      if (!user) {
        return res.status(404).json(new StandartRes(1, 'User not found.'))
      }

      const post = user.posts.find(p => p._id.toString() === postId)
      if (!post) {
        return res.status(404).json(new StandartRes(1, 'Post not found.'))
      }

      res.json(new StandartRes(0, '', { post }))
    } catch (e) {
      res.status(500).json(catchRes)
    }
  }

  async updatePost(req, res) {
    try {
      const { postId, updatedPostTitle, updatedPostInformat, updatedPostPhoto } = req.body

      if (!postId || !updatedPostTitle || !updatedPostInformat || !updatedPostPhoto) {
        return res.status(400).json(new StandartRes(1, 'Incomplete data for updating post.'))
      }

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          postTitle: updatedPostTitle,
          postInf: updatedPostInformat,
          postImg: updatedPostPhoto
        },
        { new: true }
      )

      if (!updatedPost) {
        return res.status(404).json(new StandartRes(1, 'Post not found.'))
      }

      res.json(new StandartRes(0, '', { updatedPost }))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }

  async deletePost(req, res) {
    try {
      const { postId } = req.body

      if (!postId) {
        return res.status(400).json(new StandartRes(1, 'Post id is undefined.'))
      }

      const deletedPost = await Post.findByIdAndDelete(postId)

      if (!deletedPost) {
        return res.status(404).json(new StandartRes(1, 'Post not found.'))
      }

      res.json(new StandartRes(0, 'Post deleted successfully.', { deletedPost }))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }
}

export default new PostsController()