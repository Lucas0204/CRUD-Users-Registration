const updateUserService = require('../services/updateUserService')

const updateUserController = {

    handle: async (req, res) => {

        const { id } = req.params
        const newData = req.body

        const updatedUser = await updateUserService.execute(id, newData)

        return res.json(updatedUser)
    }
}

module.exports = updateUserController
