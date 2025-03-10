const { Router } = require('express')
const MessagesController = require('../controllers/MessagesController')
const {verifyToken} = require('../middleware/verifyToken.js')
const dotenv = require('dotenv')

dotenv.config()
const router = Router()

router.use(verifyToken)

router.get(`/getMessagesBetweenUsers/:user1/:user2`, MessagesController.getMessagesBetweenUsers)
router.delete('/deleteMessage/:id', MessagesController.deleteMessage)
router.post('/addMessage', MessagesController.addMessage)

module.exports = router;