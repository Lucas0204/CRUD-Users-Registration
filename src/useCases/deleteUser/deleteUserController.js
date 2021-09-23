const deleteUserService = require('./deleteUserService')

const deleteUserController = {

    handle: async (req, res) => {

        const { id } = req.params

        const userDrop = await deleteUserService.execute(id)

        return res.json(userDrop)
    }
}

module.exports = deleteUserController
