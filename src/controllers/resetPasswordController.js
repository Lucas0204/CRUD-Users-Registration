const resetPasswordService = require('../services/resetPasswordService')

const resetPasswordController = {
    handle: async (req, res) => {

        const { email, token, newPassword } = req.body

        const user = await resetPasswordService.execute(email, token, newPassword)
        
        return res.json(user)
    }
}

module.exports = resetPasswordController
