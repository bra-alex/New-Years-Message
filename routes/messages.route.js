const express = require('express')

const messagesControlller = require('../controllers/messages.controller')

const messagesRouter = express.Router()

messagesRouter.get('/', messagesControlller.getIndex)

module.exports = messagesRouter