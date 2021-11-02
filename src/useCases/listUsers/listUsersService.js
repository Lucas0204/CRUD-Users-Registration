const User = require('../../model/User')

class ListUsersService {

    async execute() {
        let users = await User.getAllUsers()

        if (!users) {
            throw new Error('Error! No users found!')
        }

        users = this.filterUsersFields(users)

        return users
    }

    filterUsersFields(users) {
        const usersWithFilteredData = users.map(user => {
            const { password, 
                password_reset_expires, 
                password_reset_token,
                ...dataToBeDisplayed
            } = user

            return dataToBeDisplayed
        })

        return usersWithFilteredData
    }
}

module.exports = ListUsersService
