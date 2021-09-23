const listOneUserService = require('./listOneUserService')

const listOneUserController = {

    handle: async (req, res) => {

        const { id } = req.params

        const user = await listOneUserService.execute(id)

        return res.json(user)
    }
}

module.exports = listOneUserController
