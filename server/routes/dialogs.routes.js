const { Router } = require('express')
const DialogsController = require('../controllers/DialogsController')
const {verifyToken} = require('../middleware/verifyToken.js')
const dotenv = require('dotenv')

dotenv.config()
const router = Router()

router.use(verifyToken)

router.get('/getAllDialogs', verifyToken, DialogsController.getAllDialogs)
router.post('/addDialog/:userId', verifyToken, DialogsController.addDialog)
router.delete('/deleteDialog', verifyToken, DialogsController.deleteDialog)

module.exports = router;