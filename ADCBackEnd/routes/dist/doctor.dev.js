"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = express.Router();

var models = require('../models');

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
          return regeneratorRuntime.awrap(models.Doctor.findAll({
            where: {
              name: _defineProperty({}, Op.like, "%".concat(req.params.search, "%"))
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
          return regeneratorRuntime.awrap(models.Doctor.create(req.body.data));

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
  var Doctors;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(models.Doctor.findAll());

        case 3:
          Doctors = _context3.sent;
          res.send(Doctors).status(200);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/:id', function _callee4(req, res) {
  var id, doctor, doctorAttendance, courses, coursesRating, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, course, secArr, LecStatus, SecStatus, LabStatus;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return regeneratorRuntime.awrap(models.Doctor.findOne({
            where: {
              id: id
            }
          }));

        case 3:
          doctor = _context4.sent;
          _context4.next = 6;
          return regeneratorRuntime.awrap(models.doctorAttendance.findAll({
            where: {
              doctorId: id
            },
            attributes: ['weekno', [sequelize.fn('count', sequelize.col('weekno')), 'cnt']],
            group: ['weekno']
          }));

        case 6:
          doctorAttendance = _context4.sent;
          _context4.next = 9;
          return regeneratorRuntime.awrap(models.course.findAll({
            where: {
              doctorId: id
            }
          }));

        case 9:
          courses = _context4.sent;
          coursesRating = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context4.prev = 14;
          _iterator = courses[Symbol.iterator]();

        case 16:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context4.next = 36;
            break;
          }

          course = _step.value;
          secArr = [];
          _context4.next = 21;
          return regeneratorRuntime.awrap(models.doctorAttendance.findAll({
            where: {
              courseId: course.dataValues.id,
              type: "محاضرة"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order: [['status', 'ASC']]
          }));

        case 21:
          LecStatus = _context4.sent;
          console.log(LecStatus);
          LecStatus !== null ? secArr.push(LecStatus) : secArr.push([]);
          _context4.next = 26;
          return regeneratorRuntime.awrap(models.doctorAttendance.findAll({
            where: {
              courseId: course.dataValues.id,
              type: "تمرين"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order: [['status', 'ASC']]
          }));

        case 26:
          SecStatus = _context4.sent;
          SecStatus !== null ? secArr.push(SecStatus) : secArr.push([]);
          _context4.next = 30;
          return regeneratorRuntime.awrap(models.doctorAttendance.findAll({
            where: {
              courseId: course.dataValues.id,
              type: "معمل"
            },
            attributes: ['status', [sequelize.fn('count', sequelize.col('status')), 'count']],
            group: ['status'],
            order: [['status', 'ASC']]
          }));

        case 30:
          LabStatus = _context4.sent;
          LabStatus !== null ? secArr.push(LabStatus) : secArr.push([]);
          coursesRating.push(secArr);

        case 33:
          _iteratorNormalCompletion = true;
          _context4.next = 16;
          break;

        case 36:
          _context4.next = 42;
          break;

        case 38:
          _context4.prev = 38;
          _context4.t0 = _context4["catch"](14);
          _didIteratorError = true;
          _iteratorError = _context4.t0;

        case 42:
          _context4.prev = 42;
          _context4.prev = 43;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 45:
          _context4.prev = 45;

          if (!_didIteratorError) {
            _context4.next = 48;
            break;
          }

          throw _iteratorError;

        case 48:
          return _context4.finish(45);

        case 49:
          return _context4.finish(42);

        case 50:
          res.send({
            coursesRating: coursesRating,
            doctorAttendance: doctorAttendance,
            doctor: doctor,
            courses: courses
          }).status(200);

        case 51:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[14, 38, 42, 50], [43,, 45, 49]]);
});
router.post('/attendance', function _callee5(req, res, next) {
  var userdb;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(models.doctorAttendance.create(req.body.data));

        case 3:
          userdb = _context5.sent;
          res.sendStatus(200);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/attendance/:id/:weekno', function _callee6(req, res, next) {
  var weeklyRating;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(models.doctorAttendance.findAll({
            where: {
              weekno: req.params.weekno,
              doctorId: req.params.id
            },
            include: [{
              model: models.course,
              as: "course",
              foreignKey: "courseId",
              attributes: [['title', 'label'], ['id', 'value'], 'code']
            }]
          }));

        case 3:
          weeklyRating = _context6.sent;
          res.send(weeklyRating).status(200);
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.put('/attendance', function _callee7(req, res, next) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(models.doctorAttendance.update(req.body.data, {
            where: {
              id: req.body.data.id
            }
          }));

        case 3:
          res.sendStatus(200);
          _context7.next = 9;
          break;

        case 6:
          _context7.prev = 6;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router["delete"]('/attendance/:id', function _callee8(req, res, next) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(models.doctorAttendance.destroy({
            where: {
              id: req.params.id
            }
          }));

        case 3:
          res.sendStatus(200);
          _context8.next = 9;
          break;

        case 6:
          _context8.prev = 6;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);

        case 9:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router.put("/:id", function _callee9(req, res, next) {
  var doctors;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(models.Doctor.update(req.body.data, {
            where: {
              id: req.params.id
            }
          }));

        case 3:
          _context9.next = 5;
          return regeneratorRuntime.awrap(models.Doctor.findOne({
            where: {
              id: req.params.id
            }
          }));

        case 5:
          doctors = _context9.sent;
          res.send(doctors).status(200);
          _context9.next = 12;
          break;

        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;