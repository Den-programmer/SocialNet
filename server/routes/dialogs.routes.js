const { Router } = require('express')
const DialogsController = require('../controllers/DialogsController')
const {verifyToken} = require('../middleware/verifyToken.js')
const dotenv = require('dotenv')

dotenv.config()
const router = Router()

router.use(verifyToken)

router.get('/getAllDialogs', DialogsController.getAllDialogs)

module.exports = router;