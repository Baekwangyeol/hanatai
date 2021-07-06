'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('company_optiondetails', {
      CompanyId: {
        allowNull: true, //false갈필수 
        type: Sequelize.INTEGER,
        onDelete: 'cascade',  //삭제시 관련글 다삭제
        references: {
          model: 'companies',
          key: 'id',
        },
      },
      OptionDetailId:{
        allowNull: true, //false갈필수 
        type: Sequelize.INTEGER,
        onDelete: 'cascade',  //삭제시 관련글 다삭제
        references: {
          model: 'OptionDetails',
          key: 'id',
        },
      },
      adult:{
        type: Sequelize.INTEGER,
      },
      child:{
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('company_optiondetails');
  }
};