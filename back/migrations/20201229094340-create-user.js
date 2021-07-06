'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: { 
        type: Sequelize.STRING(30),
        allowNull: false,  //필수여부 false 면 필수
        unique: true,  //고유한값
       },//컬럼 실제 데이터는 로우
        name:{
        type: Sequelize.STRING(30),
         allowNull: false, 
      },
       nickname: {
        type: Sequelize.STRING(30),
        allowNull: false, 
      },
          password:{
        type: Sequelize.STRING(100),
        allowNull: false, 
      },
      role:{
        type: Sequelize.STRING(20),
        defaultValue: 'bronze',
      },
      position:{
        type:Sequelize.STRING(20),
      },
      profileimage:{
        type:Sequelize.STRING(200),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {

    await queryInterface.dropTable('Users');
  }
};