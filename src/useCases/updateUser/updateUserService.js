const User = require('../../model/User')
const bcrypt = require('bcryptjs')

class UpdateUserService {
    constructor(currentPassword) {
        this.currentPassword = currentPassword
    }

    async execute(id, newData) {
        const { name, email, password } = newData

        const user = await User.getSingleUser({ id })

        if (!user) {
            throw new Error('User is not found!')
        }

        if (!this.passwordMatch(user.password)) {
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

    passwordMatch(password) {
        const passwordMatch = bcrypt.compareSync(this.currentPassword, password)
        return passwordMatch
    }
}

module.exports = UpdateUserService
