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
