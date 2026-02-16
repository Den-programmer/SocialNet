import { Router } from 'express'
import NotificationsController from '../controllers/NotificationsController.js'
import { verifyToken } from '../../middleware/verifyToken.js'
import { createValidator, notificationSchema } from '../../security/validation.js'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.use(verifyToken)

router.get('/getNotifications', NotificationsController.getNotifications)
router.post('/addNotification', createValidator(notificationSchema), NotificationsController.addNotification)
router.delete('/deleteNotification/:notificationId', NotificationsController.deleteNotification)
router.delete('/deleteNotifications', NotificationsController.deleteNotifications)
router.put('/checkNotification/:notificationId', NotificationsController.checkNotification)

export default router