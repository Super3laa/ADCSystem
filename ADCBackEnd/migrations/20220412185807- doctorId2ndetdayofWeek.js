'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("courses", "secdoctorId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'Doctors',
        key: 'id'
      },
      allowNull: true,
    })

    await queryInterface.addColumn("doctorAttendances", "date", {
      type: Sequelize.DATE,
      allowNull: false,
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
