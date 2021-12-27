'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return regeneratorRuntime.async(function up$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(queryInterface.addColumn("labsBenefits", "doctorId", {
              type: Sequelize.INTEGER,
              allowNull: true,
              references: {
                model: "Doctors",
                key: "id"
              }
            }));

          case 2:
            _context.next = 4;
            return regeneratorRuntime.awrap(queryInterface.addColumn("labsBenefits", "OfficerId", {
              type: Sequelize.INTEGER,
              allowNull: true,
              references: {
                model: "Officers",
                key: "id"
              }
            }));

          case 4:
            _context.next = 6;
            return regeneratorRuntime.awrap(queryInterface.addColumn("labsBenefits", "TAssistantId", {
              type: Sequelize.INTEGER,
              allowNull: true,
              references: {
                model: "TAssistants",
                key: "id"
              }
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