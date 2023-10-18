const express = require('express');
const protect = require('../middleware/authMiddleware')
const messageController = require('../controller/messageController')
const router = express.Router();

router.route('/').post(protect, messageController.sendMessage)
router.route('/getmsg').post(protect, messageController.getMessage)
router.route('/:messageId').delete(protect, messageController.DeleteMessage)

module.exports = router;