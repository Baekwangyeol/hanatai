'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reservePeople', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      representative:{
        type: Sequelize.STRING
      },
      adult: {
        type: Sequelize.INTEGER,
        defaultValue: '0',
      },
      child:{
        type: Sequelize.INTEGER,
        defaultValue: '0',
      },
      infant:{
        type: Sequelize.INTEGER,
        defaultValue: '0',
      },
      reservecodeid:{
        allowNull: true, //false갈필수 
        type: Sequelize.INTEGER,
        onDelete: 'cascade',  //삭제시 관련글 다삭제
        references: {
          model: 'reservecodes',
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
    await queryInterface.dropTable('reservePeople');
  }
};