const forgotPasswordService = require('./forgotPasswordService')

class ForgotPasswordController {

    static async handle(req, res) {
        const { email } = req.body

        const mail = await forgotPasswordService.execute(email)

        return res.json(mail)
    }
}

module.exports = ForgotPasswordController
