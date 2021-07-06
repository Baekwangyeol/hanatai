'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roomtypeReserves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numberOfRoom: {
        type: Sequelize.INTEGER
      },
      numberOfExtrabed:{
        type: Sequelize.INTEGER
      },
      numberOfExtraperson:{
        type: Sequelize.INTEGER
      },
      checkInDate:{
        type: Sequelize.DATE
      },
      checkOutDate:{
        type: Sequelize.DATE
      },
      night:{
        type: Sequelize.INTEGER
      },
      status:{
        type: Sequelize.STRING,
        defaultValue: '예약체크',
      },
      COD:{
        type: Sequelize.DATE
      },
      othercode:{
        type: Sequelize.STRING,
      },
      reservepersonid:{
        allowNull: true, //false갈필수 
        type: Sequelize.INTEGER,
        onDelete: 'cascade',  //삭제시 관련글 다삭제
        references: {
          model: 'reservePeople',
          key: 'id',
        },
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
    await queryInterface.dropTable('roomtypeReserves');
  }
};