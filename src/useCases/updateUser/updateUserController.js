const updateUserService = require('./updateUserService')

class UpdateUserController {

    static async handle(req, res) {
        const { user_id } = req
        const newData = req.body

        const updatedUser = await updateUserService.execute(parseInt(user_id), newData)

        return res.json(updatedUser)
    }
}

module.exports = UpdateUserController
