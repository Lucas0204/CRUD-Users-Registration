const ForgotPasswordService = require('./forgotPasswordService')

class ForgotPasswordController {

    static async handle(req, res) {
        const { email } = req.body

        const forgotPasswordService = new ForgotPasswordService(email)

        const response = await forgotPasswordService.execute()

        return res.json(response)
    }
}

module.exports = ForgotPasswordController
