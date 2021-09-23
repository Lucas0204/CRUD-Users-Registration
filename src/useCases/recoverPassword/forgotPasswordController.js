const forgotPasswordService = require('./forgotPasswordService')

const forgotPasswordController = {
    handle: async (req, res) => {
        const { email } = req.body

        const mail = await forgotPasswordService.execute(email)

        return res.json(mail)
    }
}

module.exports = forgotPasswordController
