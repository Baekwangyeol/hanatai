'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roomPeople', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      adult: {
        type: Sequelize.INTEGER
      },
      child: {
        type: Sequelize.INTEGER
      },
      infant: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('roomPeople');
  }
};