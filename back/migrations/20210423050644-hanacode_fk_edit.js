'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn('hanacodes','partyId',{
      type: Sequelize.INTEGER,
      references:{model: 'parties', key: 'id'}
      //tablename으로 해야하네;////
  })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('hanacodes','partyId')
  }
};
