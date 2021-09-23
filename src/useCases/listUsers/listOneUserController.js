const listOneUserService = require('./listOneUserService')

class ListOneUserController {

    static async handle(req, res) {
        const { id } = req.params

        const user = await listOneUserService.execute(id)

        return res.json(user)
    }
}

module.exports = ListOneUserController
