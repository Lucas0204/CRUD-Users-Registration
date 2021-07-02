const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
})

module.exports = User
