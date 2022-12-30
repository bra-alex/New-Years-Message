const mongoose = require('mongoose')

const messagesSchema = new mongoose.Schema({
    recipient: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('message', messagesSchema)