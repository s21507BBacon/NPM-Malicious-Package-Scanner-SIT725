// src/routes/weeklyUpdateRoutes.js
const express = require('express');
const weeklyUpdateController = require('../controllers/weeklyUpdateController'); // Make sure this is correct

const router = express.Router();

// Define the POST route and make sure the callback function exists
router.post('/send', weeklyUpdateController.sendWeeklyUpdate);

module.exports = router;
