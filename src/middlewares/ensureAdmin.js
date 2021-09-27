const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const ensureAdmin = async (req, res, next) => {

    const { user_id } = req

    const user = await prisma.users.findUnique({
        where: { id: parseInt(user_id) }
    })

    const admin = user.admin ? true : false

    if (admin) {
        return next()
    }

    return res.status(401).json({
        status: 401,
        error: 'Unauthorized!'
    })
}

module.exports = ensureAdmin
