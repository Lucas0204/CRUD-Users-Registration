const authenticateUserService = require('../services/authenticateUserService')

const authenticateUserController = {

    handle: async (req, res) => {
        const { email, password } = req.body

        const userToken = await authenticateUserService.execute({ email, password })

        return res.json(userToken)
    }
}

module.exports = authenticateUserController
