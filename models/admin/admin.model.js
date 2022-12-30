const User = require('./admin.mongo')
const bcrypt = require('bcrypt')

async function adminExists() {
    try {
        return await User.findOne({role: 'admin'})
    } catch (e) {
        console.log(e)
        e.message = 'Could not find user from database'
        throw e
    }
}

async function createUser(user) {
    try {
        user.password = await hashPassword(user.password)
        const newUser = new User(user)
        await newUser.save()
    } catch (e) {
        console.log(e)
        e.message = 'Could not save user to database'
        throw e
    }
}

async function userExists(username) {
    try {
        return await User.findOne({username: username, role: 'admin'})
    } catch (e) {
        console.log(e)
        e.message = 'Could not find user from database'
        throw e
    }
}

async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, 12)
    } catch (e) {
        console.log(e)
        e.message = 'Could not hash password'
        throw e
    }
}

async function comparePassword(newPassword, oldPassword) {
    try {
        return await bcrypt.compare(newPassword, oldPassword)
    } catch (e) {
        console.log(e)
        e.message = 'Could not hash password'
        throw e
    }
}

module.exports = {
    adminExists,
    createUser,
    userExists,
    comparePassword
}