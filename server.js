require('dotenv').config()

const fs = require('fs')
const path = require('path')
const https = require('https')

const app = require('./app')
const mongoConnect = require('./services/mongo')

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}

const httpsServer = https.createServer(options, app)

async function startServer(){
    await mongoConnect()
    httpsServer.listen(process.env.PORT, () => console.log('Connected on port:', process.env.PORT))
}

startServer()