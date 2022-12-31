const messagesModel = require('../../../models/messages/messages.model')

async function httpFindMessage(req, res, next) {
    try {
        const recipient = req.body.recipient
        const message = await messagesModel.findMessage(recipient)

        if(!message) {
            const message = `
            I probably forgot about you or we are not really close but that doesn't mean I don't have  message for you.
            Inasmuch as you weren't included in this, I want you to know I appreciate the fact that you exist and you're in my life.
            I hope that this year, we become closer and enjoy the time we share together.
            I appreciate you and wish you a Happy New Year and may everything you wish for be fulfilled this year. 
            `
            return res.status(200).json({message})
        }

        res.status(200).json({message})

    } catch (e) {
        next(e)
    } 
}

module.exports = {
    httpFindMessage
}