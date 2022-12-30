const express = require('express')

const messagesControlller = require('../controllers/messages.controller')

const messagesRouter = express.Router()

messagesRouter.get('/', messagesControlller.getIndex)
messagesRouter.get('/message', messagesControlller.httpFindMessage)

module.exports = messagesRouter