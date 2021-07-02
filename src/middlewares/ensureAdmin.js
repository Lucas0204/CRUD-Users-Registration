const User = require('../models/User')

const ensureAdmin = async (req, res, next) => {

    const { user_id } = req

    const user = await User.findOne({
        where: { id: user_id }
    })

    const admin = user.admin ? true : false

    if (admin) {
        return next()
    }

    

    return res.json(admin)
}

module.exports = ensureAdmin
