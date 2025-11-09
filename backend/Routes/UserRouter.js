// Routes/userRoutes.js (CommonJS)
const express = require('express');
const { getAllUsers } = require('../Controllers/UserController');
const router = express.Router();

router.get('/all', getAllUsers);

module.exports = router;
