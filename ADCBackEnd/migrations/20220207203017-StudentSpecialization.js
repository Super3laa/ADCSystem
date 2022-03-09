'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return  queryInterface.addColumn("students", "specialization", {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
