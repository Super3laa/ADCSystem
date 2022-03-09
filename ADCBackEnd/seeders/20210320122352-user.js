'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return await queryInterface.bulkInsert('users', [{
         username: 'alaa',
         password: '$2b$12$Gy8C8NoHEZNXbUBHvzKGWe0TsMdXe4IQBCXXb4tMkAx1Zz2V69mJi',
         permissions:'superadmin',
         type:'عام',
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
