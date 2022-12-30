const Messages = require('./messages.mongo')

async function postMessage(message) {
    try {
        
    } catch (e) {
        console.log(e)
        // e.message = 
    }
    const msg = new Messages(message)
    await msg.save()
}

async function findMessage(recipient) {
    try {
        return await Messages.findOne({ recipient: recipient }, {
            '_id': 0,
            '__v': 0
        })
    } catch (e) {
        console.log(e)
        e.message = 'Error fetching recipient from database'
        throw e
    }
}

module.exports = {
    postMessage,
    findMessage
}