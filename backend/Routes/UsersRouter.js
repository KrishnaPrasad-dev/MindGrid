// Routes/UsersRouter.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /users/all
router.get('/all', userController.getAllUsers);

module.exports = router;
