require('dotenv').config()
const jwt = require('jsonwebtoken')

const ensureAuthenticated = (req, res, next) => {

    const authToken = req.headers.authorization

    if (!authToken) {
        return res.status(401).json({ error: 'Unauthorized!' })
    }

    const token = authToken.split(' ')[1]

    const { sub } = jwt.verify(token, process.env.JWT_SECRET)

    req.user_id = sub

    return next()
}

module.exports = ensureAuthenticated
