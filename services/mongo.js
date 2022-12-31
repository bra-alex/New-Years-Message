require('dotenv').config()
const mongoose = require('mongoose')

async function mongoConnect() {
    await mongoose.connect(process.env.MONGO_URL)
}

module.exports = mongoConnect