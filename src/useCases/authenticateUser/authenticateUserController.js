const AuthenticateUserService = require('./authenticateUserService')

class AuthenticateUserController {

    static async handle(req, res) {
        const { email, password } = req.body

        const authenticateUserService = new AuthenticateUserService(email, password)

        const userToken = await authenticateUserService.execute()

        return res.json(userToken)
    }
}

module.exports = AuthenticateUserController
