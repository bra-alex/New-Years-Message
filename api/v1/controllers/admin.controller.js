require('dotenv').config
const jwt = require('jsonwebtoken')

const adminModel = require('../../../models/admin/admin.model')
const messagesModel = require('../../../models/messages/messages.model')

async function getMessages(req, res, next) {
    try {
        const messages = await messagesModel.findMessages()

        res.status(200).json(messages)
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
            return res.status(422).json({
                error: 'Invalid email or password'
            })
        }

        const token = jwt.sign({
            userId: user._id.toString(),
            email: user.email
        }, process.env.TOKEN_SECRET, {
            expiresIn: '48h'
        })

        res.status(200).json({
            message: 'Logged in successfully',
            token,
            userId: user._id.toString()
        })

    } catch (e) {
        next(e)
    }
}

async function addNewMessage(req, res, next) {
    try {
        const recipient = req.body.recipient
        const message = req.body.message

        await messagesModel.postMessage({ recipient, message })

        res.status(201).json({
            recipient,
            message
        })
    } catch (e) {
        next(e)
    }
}

async function editMessage(req, res, next) {
    try {
        const recipient = req.body.recipient
        const message = req.body.message
        const messageId = req.params.messageId

        await messagesModel.updateMessage(messageId, { recipient, message })

        res.status(200).json({
            recipient,
            message
        })
    } catch (e) {
        next(e)
    }
}

async function deleteMessage(req, res, next) {
    try {
        const id = req.params.messageId

        await messagesModel.deleteMessage(id)

        res.status(200).json({
            message: 'Success'
        })

    } catch (e) {
        console.log(e)

        res.status(500).json({
            message: 'Failed'
        })
    }
}

async function logout(req, res) {
    const authHeader = req.headers["authorization"]
    jwt.sign(authHeader, '', {expiresIn: 1}, (logout, err) => {
        if (err) {
            return res.status(500).json({
                message: 'Failed to logout'
            })
        }

        res.status(200).json({
            message: 'Logged out'
        })
    })
}

module.exports = {
    getMessages,
    createAdmin,
    adminLogin,
    addNewMessage,
    editMessage,
    deleteMessage,
    logout
}