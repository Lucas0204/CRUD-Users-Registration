require('dotenv').config()
const mailConfig = require('../config/mail')
const { createTransport } = require('nodemailer')

const transporter = createTransport(mailConfig)

module.exports = transporter
