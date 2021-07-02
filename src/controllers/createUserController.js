const createUserService = require('../services/createUserService')

const createUserController = {

    handle: async (req, res) => {
        const { name, email, password, admin } = req.body

        const user = await createUserService.execute({ name, email, password, admin })

        return res.json(user)
    }
}

module.exports = createUserController
