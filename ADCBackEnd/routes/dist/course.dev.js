"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = express.Router();

var models = require('../models');

var jwt = require('jsonwebtoken');

var sequelize = models.sequelize;

var _require = require("sequelize"),
    Op = _require.Op;

router.get('/search/:search', function _callee(req, res) {
  var userdb;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(models.course.findAll({
            where: {
              title: _defineProperty({}, Op.like, "%".concat(req.params.search, "%"))
            }
          }));

        case 3:
          userdb = _context.sent;
          res.send(userdb).status(200);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.post('/', function _callee2(req, res, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(models.course.create(req.body.data));

        case 3:
          res.sendStatus(200);
          _context2.next = 9;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router.get('/', function _callee3(req, res, next) {
  var token, decoded, courses, doctors, officers, tassistants;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          token = req.headers['x-auth-token'];
          decoded = jwt.verify(token, 'WizzardOz');
          _context3.next = 5;
          return regeneratorRuntime.awrap(models.course.findAll({
            where: {
              type: decoded.user.type !== "عام" && decoded.user.type
            },
            include: [{
              model: models.Doctor,
              as: "Doctor",
              foreignKey: "doctorId",
              attributes: [['name', 'label'], ['id', 'value']]
            }, {
              model: models.Officer,
              as: "Officer",
              foreignKey: "OfficerId",
              attributes: [['name', 'label'], ['id', 'value']]
            }, {
              model: models.TAssistant,
              as: "TAssistant",
              foreignKey: "TAssistantId",
              attributes: [['name', 'label'], ['id', 'value']]
            }],
            raw: true
          }));

        case 5:
          courses = _context3.sent;
          _context3.next = 8;
          return regeneratorRuntime.awrap(models.Doctor.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 8:
          doctors = _context3.sent;
          _context3.next = 11;
          return regeneratorRuntime.awrap(models.Officer.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 11:
          officers = _context3.sent;
          _context3.next = 14;
          return regeneratorRuntime.awrap(models.TAssistant.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 14:
          tassistants = _context3.sent;
          res.send({
            courses: courses,
            doctors: doctors,
            officers: officers,
            tassistants: tassistants
          }).status(200);
          _context3.next = 21;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 18]]);
});
router.get('/:id', function _callee4(req, res, next) {
  var id, course, enrollmentNumber, coursetotalStatus, studentResponse, LecStatus, SecStatus, LabStatus;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(models.course.findOne({
            where: {
              id: id
            },
            include: [{
              model: models.Doctor,
              as: "Doctor",
              foreignKey: "doctorId",
              attributes: [['name', 'label'], ['id', 'value']]
            }, {
              model: models.Officer,
              as: "Officer",
              foreignKey: "OfficerId",
              attributes: [['name', 'label'], ['id', 'value']]
            }, {
              model: models.TAssistant,
              as: "TAssistant",
              foreignKey: "TAssistantId",
              attributes: [['name', 'label'], ['id', 'value']]
            }]
          }));

        case 4:
          course = _context4.sent;
          _context4.next = 7;
          return regeneratorRuntime.awrap(models.student.count({
            where: {
              year: course.dataValues.year,
              type: course.dataValues.type
            }
          }));

        case 7:
          enrollmentNumber = _context4.sent;
          _context4.next = 10;
          return regeneratorRuntime.awrap(models.studentAttendance.findAll({
            where: {
              courseId: course.dataValues.id
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order: [['status', 'ASC']]
          }));

        case 10:
          coursetotalStatus = _context4.sent;
          _context4.next = 13;
          return regeneratorRuntime.awrap(models.studentRating.findAll({
            where: {
              courseId: course.dataValues.id
            },
            attributes: ['rate', [sequelize.fn('count', sequelize.col('rate')), 'count']],
            group: ['rate'],
            order: [['rate', 'ASC']]
          }));

        case 13:
          studentResponse = _context4.sent;
          _context4.next = 16;
          return regeneratorRuntime.awrap(models.studentAttendance.findAll({
            where: {
              courseId: course.dataValues.id,
              type: "محاضرة"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order: [['status', 'ASC']]
          }));

        case 16:
          LecStatus = _context4.sent;
          _context4.next = 19;
          return regeneratorRuntime.awrap(models.studentAttendance.findAll({
            where: {
              courseId: course.dataValues.id,
              type: "تمرين"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order: [['status', 'ASC']]
          }));

        case 19:
          SecStatus = _context4.sent;
          _context4.next = 22;
          return regeneratorRuntime.awrap(models.studentAttendance.findAll({
            where: {
              courseId: course.dataValues.id,
              type: "معمل"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order: [['status', 'ASC']]
          }));

        case 22:
          LabStatus = _context4.sent;
          res.send({
            studentResponse: studentResponse,
            LecStatus: LecStatus,
            SecStatus: SecStatus,
            LabStatus: LabStatus,
            course: course,
            enrollmentNumber: enrollmentNumber,
            coursetotalStatus: coursetotalStatus
          }).status(200);
          _context4.next = 29;
          break;

        case 26:
          _context4.prev = 26;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0);

        case 29:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 26]]);
});
router.put('/', function _callee5(req, res, next) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(models.course.update(req.body.data, {
            where: {
              id: req.body.data.id
            }
          }));

        case 3:
          res.sendStatus(200);
          _context5.next = 9;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router["delete"]('/:id', function _callee6(req, res, next) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(models.course.destroy({
            where: {
              id: req.params.id
            }
          }));

        case 3:
          res.sendStatus(200);
          _context6.next = 9;
          break;

        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
module.exports = router;