'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.addColumn("doctorAttendances", "secdoctorId", {
              type: Sequelize.INTEGER,
              references: {
                model: 'Doctors',
                key: 'id'
              },
              allowNull: true
            }));

          case 2:
            _context.next = 4;
            return regeneratorRuntime.awrap(queryInterface.addColumn("doctorAttendances", "date", {
              type: Sequelize.DATE,
              allowNull: false
            }));

          case 4:
            return _context.abrupt("return", Promise.resolve());

          case 5:
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