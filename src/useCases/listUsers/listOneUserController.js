const ListOneUserService = require('./listOneUserService')

class ListOneUserController {

    static async handle(req, res) {
        const { id } = req.params

        const listOneUserService = new ListOneUserService()
        const user = await listOneUserService.execute(parseInt(id))

        return res.json(user)
    }
}

module.exports = ListOneUserController
