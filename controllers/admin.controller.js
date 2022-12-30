const adminModel = require('../models/admin/admin.model')
const messagesModel = require('../models/messages/messages.model')

function getLogin(req, res) {
    res.status(200).render('auth/login', {
        pageTitle: 'New Years Messages',
        errorMessage: undefined
    })
}

async function getMessages(req, res, next) {
    try {
        const messages = await messagesModel.findMessages()

        res.status(200).render('admin/messages', {
            pageTitle: 'New Years Messages',
            messages
        })
    } catch (e) {
        next(e)
    }
}

async function getAddMessage(req, res) {
    res.status(200).render('admin/edit-message', {
        pageTitle: 'New Years Messages',
        oldInput: {
            recipient: '',
            message: ''
        },
        errorMessage: undefined,
        editing: false
    })
}

async function getEditMessage(req, res, next) {
    try {
        const edit = req.query.edit
        const messageId = req.params.messageId

        const message = await messagesModel.findMessageById(messageId)

        if (!message) {
            return res.status(404).json({
                message: 'Could not find message'
            })
        }

        res.status(200).render('admin/edit-message', {
            pageTitle: 'New Years Messages',
            oldInput: {
                recipient: message.recipient,
                message: message.message
            },
            errorMessage: undefined,
            message: message,
            editing: edit
        })
    } catch (e) {
        next(e)
    }
}

async function createAdmin(req, res, next) {
    try {
        const admin = await adminModel.adminExists()

        if (admin) return

        const newAdmin = {
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
            role: 'admin'
        }

        await adminModel.createUser(newAdmin)
    } catch (e) {
        next(e)
    }
}

async function adminLogin(req, res, next) {
    try {
        const username = req.body.username
        const password = req.body.password
        const user = await adminModel.userExists(username)

        if (!user) {
            return res.status(404).json({
                message: 'User does not exist'
            })
        }

        const correctPassword = await adminModel.comparePassword(password, user.password)

        if (!correctPassword) {
            return res.status(422).render('auth/login', {
                pageTitle: 'Login',
                errorMessage: 'Invalid email or password'
            })
        }

        req.session.user = user
        req.session.isLoggedIn = true

        req.session.save((err) => {
            if (err) {
                return console.error(err);
            }
            res.redirect('/admin')
        })
    } catch (e) {
        throw e
    }
}

async function addNewMessage(req, res, next) {
    try {
        const recipient = req.body.recipient
        const message = req.body.message

        await messagesModel.postMessage({ recipient, message })

        res.redirect('/admin')
    } catch (e) {
        next(e)
    }
}

async function editMessage(req, res, next) {
    try {
        const recipient = req.body.recipient
        const message = req.body.message
        const messageId = req.body.messageId

        await messagesModel.updateMessage(messageId, { recipient, message })

        res.redirect('/admin')
    } catch (e) {
        next(e)
    }
}

async function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);

            errorHandler(e, next)
        }
        res.redirect('/login')
    })
}

module.exports = {
    getLogin,
    getMessages,
    getAddMessage,
    getEditMessage,
    createAdmin,
    adminLogin,
    addNewMessage,
    editMessage,
    logout
}