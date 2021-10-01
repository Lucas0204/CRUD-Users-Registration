const prisma = require('../database/prisma')

class User {

    static async create(data) {
        const user = await prisma.users.create({
            data
        })

        return user
    }

    static async delete(id) {
        try {
            const deletedUser = await prisma.users.delete({
                where: { id }
            })

            return deletedUser
        } catch(err) {
            throw new Error(`Error deleting user. Try again. -- Error: ${err.message}`)
        }
    }

    static async update(params) {
        try {
            const updatedUser = await prisma.users.update({
                where: params.where,
                data: params.data
            })

            return updatedUser
        } catch(err) {
            throw new Error(`Cannot update user. Try again. -- Error: ${err.message}`)
        }
    }

    static async getSingleUser(filter) {
        const user = await prisma.users.findUnique({
            where: filter
        })

        return user
    }

    static async getAllUsers() {
        const users = await prisma.users.findMany()
        return users
    }

    static async exists(email) {
        const user = await prisma.users.findUnique({
            where: { email }
        })

        return !!user
    }
}

module.exports = User
