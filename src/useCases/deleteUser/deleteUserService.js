const User = require('../../model/User')

class DeleteUserService {

    static async execute(id) {
        const user = await User.getSingleUser({ id })

        if (!user) {
            throw new Error('User is not found!')
        }

        try {
            await User.delete(id)

            const res = {
                status: 'Deleted successfully!'
            }

            return res
        } catch(err) {
            throw new Error(err.message)
        }
    }
}

module.exports = DeleteUserService
