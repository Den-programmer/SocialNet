import dotenv from 'dotenv'

dotenv.config()

const positiveInteger = (value, fallback) => {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

const megabytes = (value, fallback) => positiveInteger(value, fallback) * 1024 * 1024

// Keep application ceilings below the MongoDB deployment budget.
export const storagePolicy = Object.freeze({
  mongoPlanStorageBytes: megabytes(process.env.MONGO_PLAN_STORAGE_MB, 512),
  applicationStorageBytes: megabytes(process.env.APP_STORAGE_LIMIT_MB, 400),
  maxUploadBytes: megabytes(process.env.MAX_UPLOAD_MB, 8),
  maxJsonBytes: megabytes(process.env.MAX_JSON_MB, 2),
  maxUsersPageSize: positiveInteger(process.env.MAX_USERS_PAGE_SIZE, 50),
  maxPostsPageSize: positiveInteger(process.env.MAX_POSTS_PAGE_SIZE, 50),
  maxMessagesPageSize: positiveInteger(process.env.MAX_MESSAGES_PAGE_SIZE, 50),
  maxNotificationsPageSize: positiveInteger(process.env.MAX_NOTIFICATIONS_PAGE_SIZE, 50),
  maxConversationHistory: positiveInteger(process.env.MAX_CONVERSATION_HISTORY, 100),
  maxUserPosts: positiveInteger(process.env.MAX_USER_POSTS, 500),
  maxUserFollowing: positiveInteger(process.env.MAX_USER_FOLLOWING, 5000),
  maxPostLikes: positiveInteger(process.env.MAX_POST_LIKES, 10000),
  maxPostComments: positiveInteger(process.env.MAX_POST_COMMENTS, 1000),
  maxDialogMessages: positiveInteger(process.env.MAX_DIALOG_MESSAGES, 500),
  maxUserNotifications: positiveInteger(process.env.MAX_USER_NOTIFICATIONS, 500),
  maxUserConversations: positiveInteger(process.env.MAX_USER_CONVERSATIONS, 100),
  maxConversationMessages: positiveInteger(process.env.MAX_CONVERSATION_MESSAGES, 1000),
  maxWritesPerMinute: positiveInteger(process.env.MAX_WRITES_PER_MINUTE, 20),
  maxAiRequestsPerMinute: positiveInteger(process.env.MAX_AI_REQUESTS_PER_MINUTE, 5),
  maxAuthRequestsPerMinute: positiveInteger(process.env.MAX_AUTH_REQUESTS_PER_MINUTE, 10),
  ttlDays: positiveInteger(process.env.TEMPORARY_DATA_TTL_DAYS, 30)
})

export const storagePolicyBytes = () => ({
  mongoPlanStorageBytes: storagePolicy.mongoPlanStorageBytes,
  applicationStorageBytes: storagePolicy.applicationStorageBytes,
  maxUploadBytes: storagePolicy.maxUploadBytes,
  maxJsonBytes: storagePolicy.maxJsonBytes
})

