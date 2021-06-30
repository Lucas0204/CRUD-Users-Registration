const User = require('../models/User')

const deleteUserService = {

    execute: async (id) => {

        const user = await User.findOne({
            where: { id }
        })

        if (!user) {
            throw new Error('User is not found!')
        }

        const userDrop = await user.destroy()

        return userDrop
    }
}

module.exports = deleteUserService
