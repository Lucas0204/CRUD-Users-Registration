const User = require('../models/User')

const listUsersService = {

    execute: async () => {
        
        const users = await User.findAll()
        
        return users
    }
}

module.exports = listUsersService
