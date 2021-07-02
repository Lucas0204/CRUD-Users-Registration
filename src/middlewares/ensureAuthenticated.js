require('dotenv').config()
const jwt = require('jsonwebtoken')

const ensureAuthenticated = (req, res, next) => {

    const authToken = req.headers.authorization

    const token = authToken.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET)

    return res.send(token)
}

module.exports = ensureAuthenticated
