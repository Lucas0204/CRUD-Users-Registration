const User = require('../models/User')
const bcrypt = require('bcryptjs')

const updateUserService = {

    execute: async (id, newData) => {

        const { name, email, password, oldPassword } = newData

        const user = await User.findOne({
            where: { id }
        })

        if (!user) {
            throw new Error('User is not found!')
        }

        const passwordMatch = bcrypt.compareSync(oldPassword, user.password)

        if (!passwordMatch) {
            throw new Error('Error! Password incorrect!')
        }

        // See what will be updated
        let updateData = {}

        if (name) {
            updateData.name = name
        }

        if (email) {
            updateData.email = email
        }

        if (password) {
            updateData.password = bcrypt.hashSync(password)
        }

        const updatedUser = await user.update(updateData)

        return updatedUser
    }
}

module.exports = updateUserService
