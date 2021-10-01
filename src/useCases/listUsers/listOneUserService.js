const User = require('../../model/User')

class ListOneUserService {

    static async execute(id) {
        const user = await User.getSingleUser({ id })

        if (!user) {
            throw new Error('Error! User is not found!')
        }

        user.password = undefined

        return user
    }
}

module.exports = ListOneUserService
