const createUserService = require('./createUserService')

class CreateUserController {

    static async handle(req, res) {
        const { name, email, password, admin } = req.body

        const user = await createUserService.execute({ name, email, password, admin })

        return res.json(user)
    }
}

module.exports = CreateUserController
