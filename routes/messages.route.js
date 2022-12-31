const express = require('express')
const {body} = require('express-validator')

const messagesControlller = require('../controllers/messages.controller')

const messagesRouter = express.Router()

messagesRouter.get('/', messagesControlller.getIndex)
messagesRouter.post('/', body('recipient').trim(), messagesControlller.httpFindMessage)

messagesRouter.get('/message/:recipient', messagesControlller.getMessage)

module.exports = messagesRouter