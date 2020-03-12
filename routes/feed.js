const express = require('express');

const feedController = require('../controllers/feed');

const { body } = require('express-validator');

const isAuth = require('../middleware/is-auth');



const router = express.Router();

// GET /feed/userlist
router.get('/userlist/:userId', isAuth, feedController.getUsers);

module.exports = router;