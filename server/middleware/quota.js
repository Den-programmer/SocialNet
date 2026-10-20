import { storagePolicy } from '../config/storagePolicy.js'

export const enforceCountQuota = (model, filter, quota, label) => async (req, res, next) => {
  try {
    const resolvedFilter = typeof filter === 'function' ? filter(req) : filter
    const count = await model.countDocuments(resolvedFilter)
    if (count >= quota) {
      return res.status(429).json({
        message: `${label} quota reached`,
        quota
      })
    }
    next()
  } catch (error) {
    console.error(`Failed to check ${label} quota:`, error)
    res.status(500).json({ message: 'Unable to verify application quota' })
  }
}

export const userQuota = {
  maxUserPosts: storagePolicy.maxUserPosts,
  maxUserConversations: storagePolicy.maxUserConversations,
  maxUserNotifications: storagePolicy.maxUserNotifications
}
