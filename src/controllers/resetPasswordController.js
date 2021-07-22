const resetPasswordService = require('../services/resetPasswordService')

const resetPasswordController = {
    handle: async (req, res) => {

        const { email, token, password } = req.body

        const user = await resetPasswordService.execute(email, token, password)
        
        return res.json(user)
    }
}

module.exports = resetPasswordController
