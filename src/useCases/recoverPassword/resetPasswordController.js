const resetPasswordService = require('./resetPasswordService')

class ResetPasswordController {

    static async handle (req, res) {
        const { email, token, password } = req.body

        const user = await resetPasswordService.execute(email, token, password)
        
        return res.json(user)
    }
}

module.exports = ResetPasswordController
