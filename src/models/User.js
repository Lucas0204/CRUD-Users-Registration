const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
})

module.exports = User
