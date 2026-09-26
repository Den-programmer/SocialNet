import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeVisibility, canViewPost, matchesCommentAuthor, canDeletePost } from './postLogic.js'

test('normalizes visibility values to public or private', () => {
  assert.equal(normalizeVisibility('PUBLIC'), 'public')
  assert.equal(normalizeVisibility('private'), 'private')
  assert.equal(normalizeVisibility(undefined), 'public')
})

test('public posts are visible to any viewer, and private posts stay visible only to the owner', () => {
  const publicPost = { visibility: 'public', owner: 'owner-1' }
  const privateOwnerPost = { visibility: 'private', owner: 'owner-1' }

  assert.equal(canViewPost(publicPost, 'viewer-2'), true)
  assert.equal(canViewPost(publicPost, 'owner-1'), true)
  assert.equal(canViewPost(publicPost, undefined), true)
  assert.equal(canViewPost(privateOwnerPost, 'viewer-2'), false)
  assert.equal(canViewPost(privateOwnerPost, undefined), false)
  assert.equal(canViewPost(privateOwnerPost, 'owner-1'), true)
})

test('matches comments by username or user id for the current user', () => {
  const post = {
    comments: [
      { author: 'alice', text: 'first' },
      { author: '507f1f77bcf86cd799439011', text: 'second' }
    ]
  }

  assert.equal(matchesCommentAuthor(post, 'alice', 'viewer-2'), true)
  assert.equal(matchesCommentAuthor(post, 'bob', '507f1f77bcf86cd799439011'), true)
  assert.equal(matchesCommentAuthor(post, 'bob', 'viewer-3'), false)
})

test('only the post owner can delete a post', () => {
  const post = { owner: '507f1f77bcf86cd799439011' }

  assert.equal(canDeletePost(post, '507f1f77bcf86cd799439011'), true)
  assert.equal(canDeletePost(post, '507f1f77bcf86cd799439012'), false)
  assert.equal(canDeletePost(post, undefined), false)
})

test('private posts stay hidden from other viewers even when they are related to the user profile', () => {
  const privatePost = { owner: 'owner-1', visibility: 'private' }
  const publicPost = { owner: 'owner-1', visibility: 'public' }

  assert.equal(canViewPost(privatePost, 'viewer-2'), false)
  assert.equal(canViewPost(publicPost, 'viewer-2'), true)
  assert.equal(canViewPost(privatePost, 'owner-1'), true)
})
