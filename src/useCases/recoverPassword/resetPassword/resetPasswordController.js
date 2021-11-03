const ResetPasswordService = require('./resetPasswordService')

class ResetPasswordController {

    static async handle(req, res) {
        const { email, token, password: newPassword } = req.body

        const resetPasswordService = new ResetPasswordService(email, token)

        const user = await resetPasswordService.execute(newPassword)
        
        return res.json(user)
    }
}

module.exports = ResetPasswordController
