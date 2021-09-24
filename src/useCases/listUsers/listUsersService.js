const User = require('../../models/User')

class ListUsersService {

    static async execute() {
        let users = await User.findAll()
        
        if (users) {
            users = users.map(user => {
                const { id, name, email, admin, createdAt, updatedAt } = user

                return {
                    id,
                    name,
                    email,
                    admin,
                    createdAt,
                    updatedAt
                }
            })
        }

        return users
    }
}

module.exports = ListUsersService