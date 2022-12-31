const path = require('path')
const csrf = require('csurf')
const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

const Admin = require('./models/admin/admin.mongo')
const adminRouter = require('./routes/admin.route')
const apiRouter = require('./api/api')
const messagesRouter = require('./routes/messages.route')

const sessionStore = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: 'sessions',
})

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(helmet())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', apiRouter)

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}))

app.use(csrf())

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn
    res.locals.csrfToken = req.csrfToken()
    next()
})

app.use(async (req, res, next) => {
    if (!req.session.user) {
        return next()
    }

    try {
        const user = await Admin.findById(req.session.user._id)

        if (!user) {
            return next()
        }

        req.user = user
        next()
    } catch (e) {
        console.log(e);
        next(e)
    }
})

app.use(messagesRouter)
app.use(adminRouter)

app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message
    })
})

module.exports = app