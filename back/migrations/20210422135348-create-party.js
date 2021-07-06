'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Parties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      party: {
        type: Sequelize.STRING
      },
      startdate : {
        type: Sequelize.DATE
      },
      UserId: {
        allowNull: true, //false갈필수 
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      AirNumberId: {
        allowNull: true, //false갈필수 
        type: Sequelize.INTEGER,
        references: {
          model: 'airnumbers',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Parties');
  }
};