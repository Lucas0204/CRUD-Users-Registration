const UpdateUserService = require('./updateUserService')

class UpdateUserController {

    static async handle(req, res) {
        const { user_id } = req
        const { currentPassword, ...newData } = req.body

        const updateUserService = new UpdateUserService(currentPassword)

        const updatedUser = await updateUserService.execute(parseInt(user_id), newData)

        return res.json(updatedUser)
    }
}

module.exports = UpdateUserController
