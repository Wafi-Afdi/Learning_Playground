const express = require('express');
const chatController = require('../controller/chatController');
const protect = require('../middleware/authMiddleware')
const router = express.Router();

router.route('/fetchChat/:userId').get(protect, chatController.fetchChats)

module.exports = router