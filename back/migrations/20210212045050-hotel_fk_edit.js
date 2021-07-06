'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Hotels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      Abbreviation: {
        type: Sequelize.STRING
      },
      address:{
        type: Sequelize.STRING
      },
      call:{
        type: Sequelize.STRING
      },
      star:{
        type:Sequelize.INTEGER,
      },
      RegionId: {
        allowNull: true, //false갈필수 
        type: Sequelize.INTEGER,
        onDelete: 'cascade',  //삭제시 관련글 다삭제
        references: {
          model: 'Regions',
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
    }).then(function(){
      queryInterface.createTable('hotels_contacts',{
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        hotels_id:{
          type:Sequelize.INTEGER,
          references: { model: 'Hotels',key: 'id'}
        }
      })
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('hotels_contacts');
  }
};
