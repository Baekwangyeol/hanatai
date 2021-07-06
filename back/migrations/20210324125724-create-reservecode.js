'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reservecodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reservecode: {
        type: Sequelize.STRING
      },
      hanacodeid:{
        allowNull: true, //false갈필수 
        type: Sequelize.INTEGER,
        onDelete: 'cascade',  //삭제시 관련글 다삭제
        references: {
          model: 'hanacodes',
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
    await queryInterface.dropTable('reservecodes');
  }
};