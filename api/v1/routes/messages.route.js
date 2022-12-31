const express = require('express')

const messagesControlller = require('../controllers/messages.controller')

const messagesRouter = express.Router()

messagesRouter.post('/', messagesControlller.httpFindMessage)

module.exports = messagesRouter