'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roomprices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room: {
        type: Sequelize.INTEGER
      },
      extrabed:{
        type: Sequelize.INTEGER
      },
      extraperson:{
        type: Sequelize.INTEGER
      },
      periodstart:{
        type: Sequelize.DATE
      },
      periodend:{
        type: Sequelize.DATE
      },
      status:{
        type: Sequelize.STRING
      },
      roomtypeid:{
        allowNull: true, //false갈필수 
        type: Sequelize.INTEGER,
        onDelete: 'cascade',  //삭제시 관련글 다삭제
        references: {
          model: 'roomtypes',
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
    await queryInterface.dropTable('roomprices');
  }
};