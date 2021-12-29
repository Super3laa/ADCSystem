'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('studentRatings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      courseId: {
        type: Sequelize.INTEGER,
        references:{
          model:'courses',
          key:'id'
        }
      },
      studentId: {
        type: Sequelize.INTEGER,
        references:{
          model:'students',
          key:'id'
        }
      },
      weekno: {
        type: Sequelize.INTEGER
      },
      rate: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('studentRatings');
  }
};