'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn(
      'users', 
      'admin',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('users', 'admin')
  }
};
