const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

// router.get('/', siteController.index)
router.get('/', siteController.login);

module.exports = router;
