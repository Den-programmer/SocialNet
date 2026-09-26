import User from '../models/user.js'
import Post from '../models/post.js'
import { catchRes, StandartRes } from '../routes/responses/responses.js'
import { generateUniqueId, compressImage } from '../functions/functions.js'
import { cloudinaryAPI as cloudinary } from '../../cloudinaryConfig.js'
import { deleteCloudinaryResource } from '../functions/cloudinaryHelper.js'
import embeddingProvider from '../ai/providers/embedding.provider.js'
import qdrantProvider from '../ai/providers/vector/qdrant.provider.js'
import { canViewPost, buildPostInteractions, canDeletePost, canDisplayProfilePost } from '../functions/postLogic.js'

class PostsController {
  async getPosts(req, res) {
    try {
      const { userId } = req.params // Тот юзер, чьи посты мы хотим получить (профиль пользователя)
      if (!userId) {
        return res.status(400).json(new StandartRes(1, "User's id is undefined."))
      }

      /// Check userId, it should be a value of profile that is not owner or owner

      const viewerId = req.user // Тот юзер, который делает запрос (тот, кто просматривает профиль)
      const targetUser = await User.findById(userId).populate({
        path: 'posts',
        model: 'Post'
      })

      if (!targetUser) {
        return res.status(404).json(new StandartRes(1, 'User not found.'))
      }

      const targetUserId = targetUser._id
      const isOwnerViewing = viewerId && targetUserId.toString() === viewerId.toString()

      const profilePostsQuery = {
        owner: targetUserId
      }

      if (!isOwnerViewing) {
        profilePostsQuery.visibility = 'public'
      }

      const profilePosts = await Post.find(profilePostsQuery).sort({ createdAt: -1 })

      const posts = profilePosts
        .filter(post => canDisplayProfilePost(post.toObject ? post.toObject() : post, viewerId, targetUserId))
        .map(post => {
          const plainPost = post.toObject ? post.toObject() : post
          const createdAt = plainPost.createdAt ? new Date(plainPost.createdAt) : new Date()

          return {
            ...buildPostInteractions({ ...plainPost, createdAt }, viewerId),
            createdAt
          }
        })
        .map(post => ({
          ...post,
          createdAt: post.createdAt.toLocaleDateString('en-GB')
        }))

      res.json(new StandartRes(0, '', posts))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }

  async createPost(req, res) {
    try {
      const { userId, newPostTitle, newPostInformat, visibility } = req.body
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

      const embeddingText = `
      ${newPostTitle}
      ${newPostInformat}
      `

      let embedding = null
      try {
        embedding = await embeddingProvider.embed(embeddingText)
      } catch (err) {
        console.error('Embedding generation failed, continuing without embedding:', err)
      }

      const newPostPayload = {
        id: generateUniqueId(),
        postTitle: newPostTitle,
        postInf: newPostInformat,
        postImg: imageUrl,
        likesCount: 0,
        likedBy: [],
        comments: [],
        repostsCount: 0,
        visibility,
        owner: userId
      }

      if (embedding && Array.isArray(embedding)) {
        newPostPayload.embedding = embedding
      }

      const newPost = await Post.create(newPostPayload)

      if (embedding && Array.isArray(embedding)) {
        try {
          await qdrantProvider.upsertPost(
            newPost._id.toString(),
            embedding,
            {
              postTitle: newPostTitle,
              owner: userId
            }
          )
        } catch (err) {
          console.error('Qdrant upsert failed:', err)
        }
      }

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

      const viewerId = req.user
      const user = await User.findById(userId).populate('posts')
      if (!user) {
        return res.status(404).json(new StandartRes(1, 'User not found.'))
      }

      const post = user.posts.find(p => p._id.toString() === postId)
      if (!post) {
        return res.status(404).json(new StandartRes(1, 'Post not found.'))
      }

      if (!canViewPost(post, viewerId)) {
        return res.status(403).json(new StandartRes(1, 'This post is private.'))
      }

      res.json(new StandartRes(0, '', { post: buildPostInteractions(post, viewerId) }))
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

      const currentPost =
        await Post.findById(postId)

      if (!currentPost) {
        return res
          .status(404)
          .json(new StandartRes(1, 'Post not found'))
      }

      const embeddingText = `
      ${title}
      ${currentPost.postInf}
      `

      const embedding =
        await embeddingProvider.embed(
          embeddingText
        )

      const post = await Post.findByIdAndUpdate(
        postId,
        { $set: { postTitle: title, embedding } },
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

      const currentPost =
        await Post.findById(postId)

      const embeddingText = `
      ${currentPost.postTitle}
      ${content}
      `

      const embedding =
        await embeddingProvider.embed(
          embeddingText
        )

      const post = await Post.findByIdAndUpdate(
        postId,
        { $set: { postInf: content, embedding } },
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
  async toggleLike(req, res) {
    try {
      const { postId } = req.params
      if (!postId) {
        return res.status(400).json(new StandartRes(1, 'Post id is undefined.'))
      }

      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json(new StandartRes(1, 'Post not found.'))
      }

      if (!canViewPost(post, req.user)) {
        return res.status(403).json(new StandartRes(1, 'This post is private.'))
      }

      const userId = req.user.toString()
      const liked = post.likedBy.some(id => id.toString() === userId)
      const update = liked
        ? { $pull: { likedBy: userId }, $inc: { likesCount: -1 } }
        : { $addToSet: { likedBy: userId }, $inc: { likesCount: 1 } }

      const updatedPost = await Post.findByIdAndUpdate(postId, update, { new: true })
      res.json(new StandartRes(0, 'Like updated.', buildPostInteractions(updatedPost, req.user)))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }

  async addComment(req, res) {
    try {
      const { postId } = req.params
      const { comment } = req.body

      if (!postId || !comment || typeof comment !== 'string') {
        return res.status(400).json(new StandartRes(1, 'Invalid comment payload.'))
      }

      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json(new StandartRes(1, 'Post not found.'))
      }

      if (!canViewPost(post, req.user)) {
        return res.status(403).json(new StandartRes(1, 'This post is private.'))
      }

      const currentUser = await User.findById(req.user).select('username')
      const newComment = {
        id: generateUniqueId(),
        author: currentUser?.username || 'Unknown user',
        text: comment.trim(),
        createdAt: new Date().toISOString()
      }

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: newComment } },
        { new: true }
      )

      res.json(new StandartRes(0, 'Comment added.', buildPostInteractions(updatedPost, req.user)))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }

  async repostPost(req, res) {
    try {
      const { postId } = req.params
      if (!postId) {
        return res.status(400).json(new StandartRes(1, 'Post id is undefined.'))
      }

      const originalPost = await Post.findById(postId)
      if (!originalPost) {
        return res.status(404).json(new StandartRes(1, 'Post not found.'))
      }

      if (!canViewPost(originalPost, req.user)) {
        return res.status(403).json(new StandartRes(1, 'This post is private.'))
      }

      const repostPayload = {
        id: generateUniqueId(),
        postTitle: `Repost: ${originalPost.postTitle}`,
        postInf: originalPost.postInf,
        postImg: originalPost.postImg,
        likesCount: 0,
        likedBy: [],
        comments: [],
        repostsCount: 0,
        visibility: originalPost.visibility,
        owner: req.user,
        repostOf: originalPost._id
      }

      const repost = await Post.create(repostPayload)
      await User.findByIdAndUpdate(req.user, { $push: { posts: repost._id } })
      await Post.findByIdAndUpdate(postId, { $inc: { repostsCount: 1 } })

      res.json(new StandartRes(0, 'Post reposted.', buildPostInteractions(repost, req.user)))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }

  async updatePostVisibility(req, res) {
    try {
      const { postId, visibility } = req.body

      if (!postId || !visibility) {
        return res.status(400).json(new StandartRes(1, 'Invalid visibility payload.'))
      }

      const post = await Post.findById(postId)
      if (!post) {
        return res.status(404).json(new StandartRes(1, 'Post not found.'))
      }

      if (post.owner.toString() !== req.user.toString()) {
        return res.status(403).json(new StandartRes(1, 'You are not allowed to change this post visibility.'))
      }

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $set: { visibility } },
        { new: true, runValidators: true }
      )

      res.json(new StandartRes(0, 'Visibility updated.', {
        postId: updatedPost._id,
        visibility: updatedPost.visibility
      }))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }

  async deletePost(req, res) {
    try {
      const postId = req.body?.postId || req.params?.postId

      if (!postId) {
        return res.status(400).json(new StandartRes(1, 'Post id is undefined.'))
      }

      if (!Post.db.base.Types.ObjectId.isValid(postId)) {
        return res.status(400).json(new StandartRes(1, 'Invalid postId'))
      }

      const post = await Post.findById(postId)

      if (!post) {
        return res.status(404).json(new StandartRes(1, 'Post not found.'))
      }

      if (!canDeletePost(post, req.user)) {
        return res.status(403).json(new StandartRes(1, 'You are not allowed to delete this post.'))
      }

      const deletedPost = await Post.findByIdAndDelete(postId)

      await User.findByIdAndUpdate(deletedPost.owner, { $pull: { posts: postId } })

      if (deletedPost.postImg) {
        deleteCloudinaryResource(deletedPost.postImg).catch(err =>
          console.error('Failed to delete post image from Cloudinary:', err)
        )
      }

      try {
        await qdrantProvider.deletePost(postId)
      } catch (err) {
        console.error('Qdrant delete failed:', err)
      }

      res.json(new StandartRes(0, 'Post deleted successfully.', { deletedPost }))
    } catch (e) {
      console.error(e)
      res.status(500).json(catchRes)
    }
  }
}

export default new PostsController()