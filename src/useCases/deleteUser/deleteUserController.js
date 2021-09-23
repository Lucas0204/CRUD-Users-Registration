const deleteUserService = require('./deleteUserService')

class DeleteUserController {

    static async handle(req, res) {

        const { id } = req.params

        const userDrop = await deleteUserService.execute(id)

        return res.json(userDrop)
    }
}

module.exports = DeleteUserController
