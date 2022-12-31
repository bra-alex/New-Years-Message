const express = require('express')

// const isAuthenticated = require('../middleware/isAuthenticated')
// const adminController = require('../controllers/admin.controller')

const adminRouter = express.Router()

// adminRouter.get('/login', adminController.getLogin)
// adminRouter.post('/login', adminController.adminLogin)

// adminRouter.post('/logout', adminController.logout)

// adminRouter.get('/admin', isAuthenticated, adminController.getMessages)

// adminRouter.get('/admin/add-message', isAuthenticated, adminController.getAddMessage)
// adminRouter.post('/admin/add-message', isAuthenticated, adminController.addNewMessage)

// adminRouter.get('/admin/edit-message/:messageId', isAuthenticated, adminController.getEditMessage)
// adminRouter.post('/admin/edit-message/', isAuthenticated, adminController.editMessage)

// adminRouter.delete('/admin/message/:messageId', isAuthenticated, adminController.deleteMessage)

module.exports = adminRouter