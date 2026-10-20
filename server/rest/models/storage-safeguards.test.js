import test from 'node:test'
import assert from 'node:assert/strict'
import User from './user.js'
import Post from './post.js'
import Dialog from './dialog.js'
import Notification from './notification.js'
import AIMessage from '../ai/models/message.model.js'
import Conversation from '../ai/models/conversation.model.js'
import { storagePolicy } from '../../config/storagePolicy.js'

test('high-cardinality arrays declare configured safety caps', () => {
  assert.equal(User.schema.obj.posts[0].maxItems, storagePolicy.maxUserPosts)
  assert.equal(User.schema.obj.notifications[0].maxItems, storagePolicy.maxUserNotifications)
  assert.equal(User.schema.obj.following[0].maxItems, storagePolicy.maxUserFollowing)
  assert.equal(Post.schema.obj.likedBy.maxItems, storagePolicy.maxPostLikes)
  assert.equal(Post.schema.obj.comments.maxItems, storagePolicy.maxPostComments)
  assert.equal(Dialog.schema.obj.messages[0].maxItems, storagePolicy.maxDialogMessages)
})

test('array safety caps are finite positive integers', () => {
  const cappedPaths = [
    User.schema.obj.posts[0],
    User.schema.obj.notifications[0],
    User.schema.obj.following[0],
    Post.schema.obj.likedBy,
    Post.schema.obj.comments,
    Dialog.schema.obj.messages[0]
  ]

  cappedPaths.forEach(path => {
    assert.equal(Number.isInteger(path.maxItems) && path.maxItems > 0, true)
  })
})

test('temporary collections define TTL indexes', () => {
  assert.ok(Notification.schema.path('createdAt').options.expires > 0)
  assert.equal(AIMessage.schema.path('expiresAt').options.expires, 0)
  assert.equal(Conversation.schema.path('expiresAt').options.expires, 0)
})
