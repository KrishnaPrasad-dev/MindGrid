// backend/Routes/UserRouter.js
const express = require('express');
const { getAllUsers } = require('../Controllers/UserController'); // adjust path if Controller file is elsewhere
const router = express.Router();

console.log('Loading Routes/UserRouter'); // helpful for logs

router.get('/all', getAllUsers);

module.exports = router;
