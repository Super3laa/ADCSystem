'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.createTable('students', {
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
              },
              section: {
                allowNull: true,
                type: Sequelize.STRING
              },
              unit: {
                allowNull: true,
                type: Sequelize.STRING
              },
              town: {
                allowNull: true,
                type: Sequelize.STRING
              },
              year: {
                allowNull: true,
                type: Sequelize.STRING
              },
              country: {
                allowNull: true,
                type: Sequelize.STRING
              },
              type: {
                allowNull: true,
                type: Sequelize.STRING
              },
              email: {
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
              },
              prevTermweekestDegree: {
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
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function down$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(queryInterface.dropTable('students'));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};