const User = require('../../model/User')

class DeleteUserService {

    async execute(id) {
        const user = await User.getSingleUser({ id })

        if (!user) {
            throw new Error('User is not found!')
        }

        const status = await this.deleteUser(id)

        return status
    }

    async deleteUser(id) {
        try {
            await User.delete(id)

            return {
                status: 'Deleted successfully!'
            }
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

module.exports = DeleteUserService
