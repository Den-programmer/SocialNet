const { Router } = require('express')
const NotificationsController = require('../controllers/NotificationsController')
const {verifyToken} = require('../middleware/verifyToken.js')
const dotenv = require('dotenv')

dotenv.config()
const router = Router()

router.use(verifyToken)

router.get('/getNotifications', NotificationsController.getNotifications)
router.post('/addNotification', NotificationsController.addNotification)
router.delete('/deleteNotification/:notificationId', NotificationsController.deleteNotification)
router.delete('/deleteNotifications', NotificationsController.deleteNotifications)

module.exports = router