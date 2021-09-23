const User = require('../../models/User')
const bcrypt = require('bcryptjs')

const updateUserService = {

    execute: async (id, newData) => {

        const { name, email, password, currentPassword } = newData

        const user = await User.findOne({
            where: { id }
        })

        if (!user) {
            throw new Error('User is not found!')
        }

        const passwordMatch = bcrypt.compareSync(currentPassword, user.password)

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

        let updatedUser = await user.update(updateData)

        updatedUser.password = undefined

        return updatedUser
    }
}

module.exports = updateUserService
