const forgotPasswordService = require('./forgotPasswordService')

class ForgotPasswordController {

    static async handle(req, res) {
        const { email } = req.body

        const response = await forgotPasswordService.execute(email)

        return res.json(response)
    }
}

module.exports = ForgotPasswordController
