const { DataTypes } = require('sequelize')
const sequelize = require('../database')

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'The field name cannot be empty!'
            },
            len: {
                args: [2, 36],
                msg: 'Enter a valid name!'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'The field email cannot be empty!'
            },
            len: {
                args: [6, 120],
                msg: 'Enter a valid email!'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'The field password cannot be empty!'
            },
            len: {
                args: [6, 150],
                msg: 'Password must be at least 6 characters'
            }
        }
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    password_reset_token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password_reset_expires: {
        type: DataTypes.DATE,
        allowNull: true
    }
})

module.exports = User
