const User = require('../models/User')

const deleteUserService = {

    execute: async (id) => {

        const user = await User.findOne({
            where: { id }
        })

        if (!user) {
            throw new Error('User is not found!')
        }

        let userDrop = await user.destroy()

        userDrop.password = undefined

        return userDrop
    }
}

module.exports = deleteUserService
