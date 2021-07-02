const updateUserService = require('../services/updateUserService')

const updateUserController = {

    handle: async (req, res) => {

        const { user_id } = req
        const newData = req.body

        const updatedUser = await updateUserService.execute(user_id, newData)

        return res.json(updatedUser)
    }
}

module.exports = updateUserController
