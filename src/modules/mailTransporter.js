require('dotenv').config()
const { createTransport } = require('nodemailer')

const transporter = createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "209bd69ca807b3",
      pass: "30093df4d087c8"
    }
})

module.exports = transporter
