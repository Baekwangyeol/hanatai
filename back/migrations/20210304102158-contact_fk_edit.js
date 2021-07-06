'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      CompanyId: {
        allowNull: true, //false갈필수 
        type: Sequelize.INTEGER,
        onDelete: 'cascade',  //삭제시 관련글 다삭제
        references: {
          model: 'companies',
          key: 'id',
        },
      },
      gender:{
        type: Sequelize.STRING,
      },
      position:{
        type: Sequelize.STRING,
      },
      email:{
        type: Sequelize.STRING,
      },
      work:{
        type: Sequelize.STRING
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
      queryInterface.addColumn('hotels_contacts','contact_Id',{
          type: Sequelize.INTEGER,
          references:{model: 'contacts', key: 'id'}
      })
    });;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('hotels_contacts','contact_Id');
  }
};
