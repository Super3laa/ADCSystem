'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('labsBenefits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      attendancePercentage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      numberOfExperiment: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      studentId: {
        type: Sequelize.INTEGER,
        references:{
          model:'students',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('labsBenefits');
  }
};