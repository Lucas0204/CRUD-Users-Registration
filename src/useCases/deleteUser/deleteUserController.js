const DeleteUserService = require('./deleteUserService')

class DeleteUserController {

    static async handle(req, res) {
        const { id } = req.params

        const deleteUserService = new DeleteUserService()
        const userDrop = await deleteUserService.execute(parseInt(id))

        return res.json(userDrop)
    }
}

module.exports = DeleteUserController
