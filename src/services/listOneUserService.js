const User = require('../models/User')

const listOneUserService = {

    execute: async (id) => {

        const user = await User.findOne({
            where: { id }
        })

        if (!user) {
            throw new Error('Error! User is not found!')
        }

        return user
    }
}

module.exports = listOneUserService
