const authenticateUserService = require('./authenticateUserService')

class AuthenticateUserController {

    static async handle(req, res) {
        const { email, password } = req.body

        const userToken = await authenticateUserService.execute({ email, password })

        return res.json(userToken)
    }
}

module.exports = AuthenticateUserController
