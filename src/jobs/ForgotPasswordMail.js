const Mail = require('../modules/mailTransporter')

module.exports = {
    key: 'ForgotPasswordMail',
    async handle({ data }) {
        const { user, token } = data

        await Mail.sendMail({
            from: `Lucas Zordan <209bd69ca807b3>`,
            to: `${user.name} <${user.email}>`,
            subject: 'Recuperação de senha.',
            text: `Esqueceu sua senha, use este token para definir uma nova: ${token}`
        })
    }
}
