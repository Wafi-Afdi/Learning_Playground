const express = require('express');
const userController = require('../controller/userController');
const protect = require('../middleware/authMiddleware')
const router = express.Router();

router.post('/register', userController.registerUser)
router.route('/login').post(userController.loginUser)
router.route('/').get(userController.searchUser)

module.exports = router;