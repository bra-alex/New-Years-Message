require('dotenv').config()

const fs = require('fs')
const path = require('path')
const http = require('http')

const app = require('./app')
const mongoConnect = require('./services/mongo')
const { createAdmin } = require('./controllers/admin.controller')

// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// }

// const httpsServer = https.createServer(options, app)
const httpServer = http.createServer(app)

async function startServer() {
    await mongoConnect()
    await createAdmin()
    httpServer.listen(process.env.PORT, () => console.log('Connected on port:', process.env.PORT))
}

startServer()