const path = require('path')
const csrf = require('csrf')
const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(helmet())
app.use(csrf())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app