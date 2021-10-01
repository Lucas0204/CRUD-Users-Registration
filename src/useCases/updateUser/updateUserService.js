const User = require('../../model/User')
const bcrypt = require('bcryptjs')

class UpdateUserService {

    static async execute(id, newData) {
        const { name, email, password, currentPassword } = newData

        const user = await User.getSingleUser({ id })

        if (!user) {
            throw new Error('User is not found!')
        }

        const passwordMatch = bcrypt.compareSync(currentPassword, user.password)

        if (!passwordMatch) {
            throw new Error('Error! Password incorrect!')
        }

        // See what will be updated
        let updateData = {}

        if (name) updateData.name = name

        if (email) updateData.email = email

        if (password) updateData.password = bcrypt.hashSync(password)

        let updatedUser = await User.update({
            where: { id },
            data: updateData
        })

        updatedUser.password = undefined

        return updatedUser
    }
}

module.exports = UpdateUserService
