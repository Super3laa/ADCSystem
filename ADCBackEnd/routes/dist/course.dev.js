"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = express.Router();

var models = require('../models');

var jwt = require('jsonwebtoken');

var sequelize = models.sequelize;

var _require = require("sequelize"),
    Op = _require.Op;

var _require2 = require('../services/auth'),
    checkTokenValidity = _require2.checkTokenValidity;

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
router.get('/type/:type', checkTokenValidity, function _callee3(req, res, next) {
  var token, decoded, courses, doctors, officers, tassistants;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.params.type);
          _context3.prev = 1;
          token = req.headers['x-auth-token'];
          decoded = jwt.verify(token, 'WizzardOz');
          _context3.next = 6;
          return regeneratorRuntime.awrap(models.course.findAll({
            where: {
              type: req.params.type
            },
            include: {
              all: true
            },
            raw: true
          }));

        case 6:
          courses = _context3.sent;
          console.log(courses[1]);
          _context3.next = 10;
          return regeneratorRuntime.awrap(models.Doctor.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 10:
          doctors = _context3.sent;
          _context3.next = 13;
          return regeneratorRuntime.awrap(models.Officer.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 13:
          officers = _context3.sent;
          _context3.next = 16;
          return regeneratorRuntime.awrap(models.TAssistant.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 16:
          tassistants = _context3.sent;
          res.send({
            courses: courses,
            doctors: doctors,
            officers: officers,
            tassistants: tassistants
          }).status(200);
          _context3.next = 23;
          break;

        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 20]]);
});
router.get('/:id', checkTokenValidity, function _callee4(req, res, next) {
  var id, course, enrollmentNumber, coursetotalStatus, studentResponse, LecStatus, SecStatus, LabStatus;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          console.log(id);
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(models.course.findOne({
            where: {
              id: id
            },
            include: {
              all: true
            }
          }));

        case 5:
          course = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap(models.student.count({
            where: {
              year: course.dataValues.year,
              type: course.dataValues.type
            }
          }));

        case 8:
          enrollmentNumber = _context4.sent;
          _context4.next = 11;
          return regeneratorRuntime.awrap(models.studentAttendance.findAll({
            where: {
              courseId: course.dataValues.id
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order: [['status', 'ASC']]
          }));

        case 11:
          coursetotalStatus = _context4.sent;
          _context4.next = 14;
          return regeneratorRuntime.awrap(models.studentRating.findAll({
            where: {
              courseId: course.dataValues.id
            },
            attributes: ['rate', [sequelize.fn('count', sequelize.col('rate')), 'count']],
            group: ['rate'],
            order: [['rate', 'ASC']]
          }));

        case 14:
          studentResponse = _context4.sent;
          _context4.next = 17;
          return regeneratorRuntime.awrap(models.studentAttendance.findAll({
            where: {
              courseId: course.dataValues.id,
              type: "محاضرة"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order: [['status', 'ASC']]
          }));

        case 17:
          LecStatus = _context4.sent;
          _context4.next = 20;
          return regeneratorRuntime.awrap(models.studentAttendance.findAll({
            where: {
              courseId: course.dataValues.id,
              type: "تمرين"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order: [['status', 'ASC']]
          }));

        case 20:
          SecStatus = _context4.sent;
          _context4.next = 23;
          return regeneratorRuntime.awrap(models.studentAttendance.findAll({
            where: {
              courseId: course.dataValues.id,
              type: "معمل"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order: [['status', 'ASC']]
          }));

        case 23:
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
          _context4.next = 30;
          break;

        case 27:
          _context4.prev = 27;
          _context4.t0 = _context4["catch"](2);
          console.log(_context4.t0);

        case 30:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 27]]);
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