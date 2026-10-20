import test from 'node:test'
import assert from 'node:assert/strict'
import { storagePolicy } from './storagePolicy.js'

test('application storage budget remains below the MongoDB plan budget', () => {
  assert.ok(storagePolicy.applicationStorageBytes < storagePolicy.mongoPlanStorageBytes)
})

test('storage policy exposes positive bounded safety limits', () => {
  const limits = [
    storagePolicy.maxUploadBytes,
    storagePolicy.maxJsonBytes,
    storagePolicy.maxUsersPageSize,
    storagePolicy.maxPostsPageSize,
    storagePolicy.maxMessagesPageSize,
    storagePolicy.maxNotificationsPageSize,
    storagePolicy.maxConversationHistory,
    storagePolicy.maxUserPosts,
    storagePolicy.maxPostLikes,
    storagePolicy.maxPostComments,
    storagePolicy.maxDialogMessages,
    storagePolicy.maxUserNotifications,
    storagePolicy.maxUserConversations,
    storagePolicy.ttlDays
  ]

  limits.forEach(limit => assert.equal(Number.isInteger(limit) && limit > 0, true))
})

test('request and collection limits stay below the application storage budget', () => {
  assert.ok(storagePolicy.maxUploadBytes < storagePolicy.applicationStorageBytes)
  assert.ok(storagePolicy.maxJsonBytes < storagePolicy.applicationStorageBytes)
  assert.ok(storagePolicy.maxUserPosts < storagePolicy.maxUserFollowing)
  assert.ok(storagePolicy.maxPostComments < storagePolicy.maxPostLikes)
  assert.ok(storagePolicy.maxConversationMessages > storagePolicy.maxConversationHistory)
})
