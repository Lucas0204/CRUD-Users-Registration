const prisma = require('../../database/prisma')

class DeleteUserService {

    static async execute(id) {
        const user = await prisma.users.findUnique({
            where: { id: parseInt(id) }
        })

        if (!user) {
            throw new Error('User is not found!')
        }

        try {
            await prisma.users.delete({
                where: { id: parseInt(id) }
            })

            const res = {
                status: 'Deleted successfully!'
            }

            return res
        } catch(err) {
            throw new Error('Cannot delete user. Try again.')
        }
    }
}

module.exports = DeleteUserService
