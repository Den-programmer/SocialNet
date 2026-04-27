import User from '../models/user.js'
import Post from '../models/post.js'
import { catchRes, StandartRes } from '../routes/responses/responses.js'
import { generateUniqueId, compressImage } from '../functions/functions.js'
import { cloudinaryAPI as cloudinary } from '../../cloudinaryConfig.js'
import { deleteCloudinaryResource } from '../functions/cloudinaryHelper.js'

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

      const compressedBuffer = await compressImage(buffer, mimetype)

      const imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'post_images', resource_type: 'image' },
          (error, result) => {
            if (error) return reject(error)
            resolve(result.secure_url)
          }
        )
        stream.end(compressedBuffer)
      })

      const newPost = await Post.create({
        id: generateUniqueId(),
        postTitle: newPostTitle,
        postInf: newPostInformat,
        postImg: imageUrl,
        likesCount: 0,
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

  async updatePostTitle(req, res) {
    try {
      const { postId, updatedPostTitle } = req.body

      if (!postId || typeof updatedPostTitle !== 'string') {
        return res
          .status(400)
          .json(new StandartRes(1, 'Invalid payload'))
      }

      const title = updatedPostTitle.trim()

      if (!title) {
        return res
          .status(400)
          .json(new StandartRes(1, 'Title cannot be empty'))
      }

      if (!Post.db.base.Types.ObjectId.isValid(postId)) {
        return res
          .status(400)
          .json(new StandartRes(1, 'Invalid postId'))
      }

      const post = await Post.findByIdAndUpdate(
        postId,
        { $set: { postTitle: title } },
        { new: true, runValidators: true }
      )

      if (!post) {
        return res
          .status(404)
          .json(new StandartRes(1, 'Post not found'))
      }

      return res.json(
        new StandartRes(0, '', {
          postId,
          updatedPostTitle: post.postTitle
        })
      )

    } catch (e) {
      console.error(e)
      return res.status(500).json(catchRes)
    }
  }


  async updatePostInf(req, res) {
    try {
      const { postId, updatedPostInformat } = req.body

      if (!postId || typeof updatedPostInformat !== 'string') {
        return res
          .status(400)
          .json(new StandartRes(1, 'Invalid payload'))
      }

      const content = updatedPostInformat.trim()

      if (!content) {
        return res
          .status(400)
          .json(new StandartRes(1, 'Content cannot be empty'))
      }

      if (!Post.db.base.Types.ObjectId.isValid(postId)) {
        return res
          .status(400)
          .json(new StandartRes(1, 'Invalid postId'))
      }

      const post = await Post.findByIdAndUpdate(
        postId,
        { $set: { postInf: content } },
        { new: true, runValidators: true }
      )

      if (!post) {
        return res
          .status(404)
          .json(new StandartRes(1, 'Post not found'))
      }

      return res.json(
        new StandartRes(0, '', {
          postId,
          updatedPostInformat: post.postInf
        })
      )

    } catch (e) {
      console.error(e)
      return res.status(500).json(catchRes)
    }
  }
  async deletePost(req, res) {
    try {
      let postId = req.body?.postId || req.params?.postId

      if (!postId) {
        return res.status(400).json(new StandartRes(1, 'Post id is undefined.'))
      }

      const deletedPost = await Post.findByIdAndDelete(postId)

      if (!deletedPost) {
        return res.status(404).json(new StandartRes(1, 'Post not found.'))
      }

      // Delete the post image from Cloudinary if it exists
      if (deletedPost.postImg) {
        deleteCloudinaryResource(deletedPost.postImg).catch(err =>
          console.error('Failed to delete post image from Cloudinary:', err)
        )
      }

      res.json(new StandartRes(0, 'Post deleted successfully.', { deletedPost }))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }
}

export default new PostsController()