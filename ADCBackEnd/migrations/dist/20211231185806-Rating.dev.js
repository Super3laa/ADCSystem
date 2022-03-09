'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.addColumn("Officers", "rate", {
              type: Sequelize.STRING,
              allowNull: true
            }));

          case 2:
            _context.next = 4;
            return regeneratorRuntime.awrap(queryInterface.addColumn("Doctors", "rate", {
              type: Sequelize.STRING,
              allowNull: true
            }));

          case 4:
            _context.next = 6;
            return regeneratorRuntime.awrap(queryInterface.addColumn("TAssistants", "rate", {
              type: Sequelize.STRING,
              allowNull: true
            }));

          case 6:
            return _context.abrupt("return", Promise.resolve());

          case 7:
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
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};