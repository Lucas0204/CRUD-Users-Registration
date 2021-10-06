const User = require('../../model/User')
const bcrypt = require('bcryptjs')

class UpdateUserService {
    constructor(currentPassword) {
        this.currentPassword = currentPassword
    }

    async execute(id, newData) {
        const user = await User.getSingleUser({ id })

        if (!user) {
            throw new Error('User is not found!')
        }

        if (!this.passwordMatch(user.password)) {
            throw new Error('Error! Password incorrect!')
        }

        const updateData = this.getWhatWillBeUpdated(newData)

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

    getWhatWillBeUpdated(data) {
        const { name, email, password } = data
        let updateData = {}

        if (name) updateData.name = name

        if (email) updateData.email = email

        if (password) updateData.password = bcrypt.hashSync(password)

        return updateData
    }
}

module.exports = UpdateUserService
