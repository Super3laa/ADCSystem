'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Officers", "rate", {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    await queryInterface.addColumn("Doctors", "rate", {
      type: Sequelize.INTEGER,
      allowNull: true,
    })

    await queryInterface.addColumn("TAssistants", "rate", {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
    return Promise.resolve();
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
