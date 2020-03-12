const express = require('express');

const chatController = require('../controllers/chat');


const { body } = require('express-validator');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/posts
router.get('/chats/:sender_id/:reciever_id', isAuth, chatController.getChats);

// POST /feed/post
router.post('/send', isAuth, chatController.sendMessage);


module.exports = router;