const express = require('express')

const messagesRouter = require('./v1/routes/messages.route')
const adminRouter = require('./v1/routes/admin.route')

const apiRouter = express.Router()

apiRouter.use('/v1', messagesRouter)
apiRouter.use('/v1', adminRouter)

module.exports = apiRouter