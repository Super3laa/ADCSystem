'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      militaryId: {
        allowNull: true,
        type: Sequelize.STRING
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      group: {
        allowNull: true,
        type: Sequelize.STRING
      }, section: {
        allowNull: true,
        type: Sequelize.STRING
      }, unit: {
        allowNull: true,
        type: Sequelize.STRING
      }, town: {
        allowNull: true,
        type: Sequelize.STRING
      }, country: {
        allowNull: true,
        type: Sequelize.STRING
      }, type: {
        allowNull: true,
        type: Sequelize.STRING
      }, email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      collegeDegree: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      prevTermDegree: {
        allowNull: true,
        type: Sequelize.FLOAT
      }, prevTermweekestDegree: {
        allowNull: true,
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('students');
  }
};