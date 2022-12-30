const adminModel = require('../models/admin/admin.model')

function getLogin(req, res) {
    res.status(200).render('auth/login', {
        pageTitle: 'New Years Messages',
        errorMessage: undefined
    })
}

async function getMessages(req, res) {
    res.status(200).render('admin/messages', {
        pageTitle: 'New Years Messages',
    })
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



module.exports = {
    getLogin,
    getMessages,
    createAdmin,
    adminLogin,
}