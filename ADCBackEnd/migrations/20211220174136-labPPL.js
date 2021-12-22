'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("labsBenefits", "doctorId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Doctors",
        key: "id",
      },
    })
    await queryInterface.addColumn("labsBenefits", "OfficerId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references:{
        model:"Officers",
        key:"id"
      }
    })

    await queryInterface.addColumn("labsBenefits", "TAssistantId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references:{
        model:"TAssistants",
        key:"id"
      }
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
