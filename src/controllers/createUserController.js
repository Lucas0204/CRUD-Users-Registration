const createUserService = require('../services/createUserService')

const createUserController = {

    handle: async (req, res) => {
        const { name, email, password } = req.body

        const user = await createUserService.execute({ name, email, password })

        return res.json(user)
    }
}

module.exports = createUserController
