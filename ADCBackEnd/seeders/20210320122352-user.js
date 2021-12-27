'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return await queryInterface.bulkInsert('users', [{
         username: 'AlaaEssam',
         password: '$2b$12$Gy8C8NoHEZNXbUBHvzKGWe0TsMdXe4IQBCXXb4tMkAx1Zz2V69mJi',
         permissions:'admin',
         active:1,
         clientId:null,
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
