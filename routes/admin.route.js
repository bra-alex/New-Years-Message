const express = require('express')

const isAuthenticated = require('../middleware/isAuthenticated')
const adminController = require('../controllers/admin.controller')

const adminRouter = express.Router()

adminRouter.get('/login', adminController.getLogin)
adminRouter.post('/login', adminController.adminLogin)

adminRouter.get('/admin', isAuthenticated, adminController.getMessages)
// adminRouter.get('/message', messagesControlller.httpFindMessage)

module.exports = adminRouter