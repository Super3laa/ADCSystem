'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Officers", "rate", {
      type: Sequelize.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn("Doctors", "rate", {
      type: Sequelize.STRING,
      allowNull: true,
    })

    await queryInterface.addColumn("TAssistants", "rate", {
      type: Sequelize.STRING,
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
