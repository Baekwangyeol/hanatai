'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('airnumbers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number:{
        type: Sequelize.STRING(20),
      },
      departureTime:{
        type: Sequelize.STRING(20),
      },
      arriveTime:{
        type: Sequelize.STRING(20),
      },
      departureSpace:{
        type: Sequelize.STRING(20),
      },
      arriveSpace:{
        type: Sequelize.STRING(20),
      },
      airplaneid:{
        allowNull: true, //false갈필수 
        type: Sequelize.INTEGER,
        onDelete: 'cascade',  //삭제시 관련글 다삭제
        references: {
          model: 'airplanes',
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
    await queryInterface.dropTable('airnumbers');
  }
};