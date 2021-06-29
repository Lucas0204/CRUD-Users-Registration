const Sequelize = require('sequelize')
const config = require('../config/database.js')

const connection = new Sequelize(config)

module.exports = connection
