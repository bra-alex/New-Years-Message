const messagesModel = require('../models/messages/messages.model')

function getIndex(req, res) {
    res.status(200).render('index', {
        pageTitle: 'New Years Messages',
        errorMessage: undefined
    })
}

async function httpFindMessage(req, res, next) {
    try {
        const recipient = req.body.name
        const message = await messagesModel.findMessage(recipient)

        if(!message) {
            const message = `
            I probably forgot about you or we are not really close but that doesn't mean I don't have  message for you.
            Inasmuch as you weren't included in this, I want you to know I appreciate the fact that you exist and you're in my life.
            I hope that this year, we become closer and enjoy the time we share together.
            I appreciate you and wish you a Happy New Year and may everything you wish for be fulfilled this year. 
            `
            return res.status(404).render('index', {
                pageTitle: 'New Years Messages',
                errorMessage: message
            })
        }

        res.status(200).render('messages/message', {
            pageTitle: 'New Years Messages',
            message: message
        })

    } catch (e) {
        next(e)
    }
    
}


module.exports = {
    getIndex,
    httpFindMessage
}