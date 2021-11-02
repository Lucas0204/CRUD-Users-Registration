const ListUsersService = require('./listUsersService')

class ListUsersController {

    static async handle(req, res) {
        const listUsersService = new ListUsersService()
        const users = await listUsersService.execute()

        return res.json(users)
    }
}

module.exports = ListUsersController
