require('dotenv').config
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')

    if (!authHeader) {
        res.status(401).json({
            message: 'Not authenticated'
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

        if (!decodedToken) {
            res.status(401).json({
                message: 'Not authenticated'
            })
        }

        req.userId = decodedToken.userId
    } catch (e) {
        e.statusCode = 500
        throw e
    }
    
    next()
}