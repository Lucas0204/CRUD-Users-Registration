const CreateUserService = require('./createUserService')

class CreateUserController {

    static async handle(req, res) {
        const createUserService = new CreateUserService(req.body)

        const user = await createUserService.execute()

        return res.json(user)
    }
}

module.exports = CreateUserController
