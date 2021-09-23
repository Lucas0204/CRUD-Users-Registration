const listUsersService = require('./listUsersService')

class ListUsersController {

    static async handle(req, res) {
        const users = await listUsersService.execute()

        return res.json(users)
    }
}

module.exports = ListUsersController
