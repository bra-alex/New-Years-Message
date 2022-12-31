const express = require('express')

const isAuthenticated = require('../middleware/isAuthenticated')
const adminController = require('../controllers/admin.controller')

const adminRouter = express.Router()

adminRouter.post('/login', adminController.adminLogin)

adminRouter.post('/logout', adminController.logout)

adminRouter.get('/admin', isAuthenticated, adminController.getMessages)

adminRouter.post('/admin/add-message', isAuthenticated, adminController.addNewMessage)

adminRouter.put('/admin/edit-message/:messageId', isAuthenticated, adminController.editMessage)

adminRouter.delete('/admin/message/:messageId', isAuthenticated, adminController.deleteMessage)

module.exports = adminRouter