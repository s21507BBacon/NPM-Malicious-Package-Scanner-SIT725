// src/routes/repositoryRoutes.js
const express = require('express');
const repoController = require('../controllers/repoController');

const router = express.Router();

// Define your routes here
router.post('/upload', repoController.uploadRepoAddress); // POST request to upload a repo

module.exports = router;  // Ensure the router is exported correctly
