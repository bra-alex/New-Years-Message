const Messages = require('./messages.mongo')

async function postMessage(message) {
    try {
        const msg = new Messages(message)
        await msg.save()
    } catch (e) {
        console.log(e)
        e.message = 'Error saving message to database'
        throw e 
    }
    
}

async function findMessage(recipient) {
    try {
        return await Messages.findOne({ recipient: recipient })
    } catch (e) {
        console.log(e)
        e.message = 'Error fetching message from database'
        throw e
    }
}

async function findMessages(){
    try {
        return await Messages.find()
    } catch (e) {
        console.log(e)
        e.message = 'Error fetching messages from database'
        throw e
    }
}

async function findMessageById(id){
    try {
        return await Messages.findById(id)
    } catch (e) {
        console.log(e)
        e.message = 'Error fetching messages from database'
        throw e
    }
}

async function updateMessage(id, message){
    try {
        await Messages.findByIdAndUpdate(id, message)
    } catch (e) {
        console.log(e)
        e.message = 'Error fetching messages from database'
        throw e
    }
}

async function deleteMessage(id){
    try {
        await Messages.deleteOne({_id: id})
    } catch (e) {
        console.log(e)
        e.message = 'Error deleting message from database'
        throw e
    }
}

module.exports = {
    postMessage,
    findMessage,
    findMessages,
    findMessageById,
    updateMessage,
    deleteMessage
}