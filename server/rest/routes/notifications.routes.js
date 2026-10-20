import { Router } from 'express'
import NotificationsController from '../controllers/NotificationsController.js'
import { verifyToken } from '../../middleware/verifyToken.js'
import { createValidator, notificationSchema } from '../../security/validation.js'
import dotenv from 'dotenv'
import { rateLimitMiddleware } from '../../security/securityHeaders.js'
import Notification from '../models/notification.js'
import { enforceCountQuota, userQuota } from '../../middleware/quota.js'

dotenv.config()

const router = Router()

router.use(verifyToken)

router.get('/getNotifications', NotificationsController.getNotifications)
router.post(
  '/addNotification',
  rateLimitMiddleware(20, 60000, req => req.user || req.ip),
  createValidator(notificationSchema),
  enforceCountQuota(Notification, req => ({ owner: req.user }), userQuota.maxUserNotifications, 'notification'),
  NotificationsController.addNotification
)
router.delete('/deleteNotification/:notificationId', NotificationsController.deleteNotification)
router.delete('/deleteNotifications', NotificationsController.deleteNotifications)
router.put('/checkNotification/:notificationId', NotificationsController.checkNotification)

export default router