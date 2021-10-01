const User = require('../model/User')

const ensureAdmin = async (req, res, next) => {

    const id = parseInt(req.user_id)

    const user = await User.getSingleUser({ id })

    const admin = user.admin ? true : false

    if (admin) {
        return next()
    }

    return res.status(401).json({
        status: 401,
        error: 'Unauthorized!'
    })
}

module.exports = ensureAdmin
