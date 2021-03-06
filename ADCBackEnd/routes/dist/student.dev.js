"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = express.Router();

var models = require('../models');

var student = models.student;

var jwt = require('jsonwebtoken');

var sequelize = models.sequelize;

var _require = require("sequelize"),
    Op = _require.Op;

var _require2 = require('../services/auth'),
    checkTokenValidity = _require2.checkTokenValidity;

router.post('/', function _callee(req, res, next) {
  var userdb;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(student.create(req.body.data));

        case 3:
          userdb = _context.sent;
          res.sendStatus(200);
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
router.post('/punishment', function _callee2(req, res, next) {
  var userdb;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(models.punishment.create(req.body.data));

        case 3:
          userdb = _context2.sent;
          res.sendStatus(200);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.put('/punishment', function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(models.punishment.update(req.body.data, {
            where: {
              id: req.body.data.id
            }
          }));

        case 3:
          res.sendStatus(200);
          _context3.next = 9;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router["delete"]('/punishment/:id', function _callee4(req, res, next) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(models.punishment.destroy({
            where: {
              id: req.params.id
            }
          }));

        case 3:
          res.sendStatus(200);
          _context4.next = 9;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router.post('/failedCourses', function _callee5(req, res, next) {
  var userdb;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(models.failedCourse.create(req.body.data));

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
router.put('/failedCourses', function _callee6(req, res, next) {
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(models.failedCourse.update(req.body.data, {
            where: {
              id: req.body.data.id
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
router["delete"]('/failedCourses/:id', function _callee7(req, res, next) {
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(models.failedCourse.destroy({
            where: {
              id: req.params.id
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
router.post('/specialization', function _callee8(req, res, next) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          console.log(req.body.data);
          _context8.next = 4;
          return regeneratorRuntime.awrap(models.student.update({
            specialization: req.body.data.specialization
          }, {
            where: {
              id: req.body.data.studentId
            }
          }));

        case 4:
          res.sendStatus(200);
          _context8.next = 10;
          break;

        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);

        case 10:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.put('/specialization', function _callee9(req, res, next) {
  var userdb;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          console.log(req.body.data);
          _context9.next = 4;
          return regeneratorRuntime.awrap(models.student.update({
            specialization: req.body.data.specialization
          }, {
            where: {
              id: req.body.data.studentId
            }
          }));

        case 4:
          userdb = _context9.sent;
          res.sendStatus(200);
          _context9.next = 11;
          break;

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);

        case 11:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post('/labsBenefits', function _callee10(req, res, next) {
  var userdb;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(models.labsBenefit.create(req.body.data));

        case 3:
          userdb = _context10.sent;
          res.sendStatus(200);
          _context10.next = 10;
          break;

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);

        case 10:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.put('/labsBenefits', function _callee11(req, res, next) {
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(models.labsBenefit.update(req.body.data, {
            where: {
              id: req.body.data.id
            }
          }));

        case 3:
          res.sendStatus(200);
          _context11.next = 9;
          break;

        case 6:
          _context11.prev = 6;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);

        case 9:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router["delete"]('/labsBenefits/:id', function _callee12(req, res, next) {
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(models.labsBenefit.destroy({
            where: {
              id: req.params.id
            }
          }));

        case 3:
          res.sendStatus(200);
          _context12.next = 9;
          break;

        case 6:
          _context12.prev = 6;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);

        case 9:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router.post('/rating', function _callee13(req, res, next) {
  var userdb;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(models.studentRating.create(req.body.data));

        case 3:
          userdb = _context13.sent;
          res.sendStatus(200);
          _context13.next = 10;
          break;

        case 7:
          _context13.prev = 7;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);

        case 10:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/rating/:id/:weekno', function _callee14(req, res, next) {
  var weeklyRating;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return regeneratorRuntime.awrap(models.studentRating.findAll({
            where: {
              weekno: req.params.weekno,
              studentId: req.params.id
            },
            include: [{
              model: models.course,
              as: "course",
              foreignKey: "courseId",
              attributes: [['title', 'label'], ['id', 'value'], 'code']
            }]
          }));

        case 3:
          weeklyRating = _context14.sent;
          res.send(weeklyRating).status(200);
          _context14.next = 10;
          break;

        case 7:
          _context14.prev = 7;
          _context14.t0 = _context14["catch"](0);
          console.log(_context14.t0);

        case 10:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.put('/rating', function _callee15(req, res, next) {
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(models.studentRating.update(req.body.data, {
            where: {
              id: req.body.data.id
            }
          }));

        case 3:
          res.sendStatus(200);
          _context15.next = 9;
          break;

        case 6:
          _context15.prev = 6;
          _context15.t0 = _context15["catch"](0);
          console.log(_context15.t0);

        case 9:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router["delete"]('/rating/:id', function _callee16(req, res, next) {
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(models.studentRating.destroy({
            where: {
              id: req.params.id
            }
          }));

        case 3:
          res.sendStatus(200);
          _context16.next = 9;
          break;

        case 6:
          _context16.prev = 6;
          _context16.t0 = _context16["catch"](0);
          console.log(_context16.t0);

        case 9:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router.get('/search/:search', function _callee17(req, res) {
  var userdb;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          console.log(req.params.search);
          _context17.next = 4;
          return regeneratorRuntime.awrap(student.findAll({
            where: {
              name: _defineProperty({}, Op.like, "%".concat(req.params.search, "%"))
            }
          }));

        case 4:
          userdb = _context17.sent;
          res.send(userdb).status(200);
          _context17.next = 11;
          break;

        case 8:
          _context17.prev = 8;
          _context17.t0 = _context17["catch"](0);
          console.log(_context17.t0);

        case 11:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post('/attendance', function _callee18(req, res, next) {
  var userdb;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(models.studentAttendance.create(req.body.data));

        case 3:
          userdb = _context18.sent;
          res.sendStatus(200);
          _context18.next = 10;
          break;

        case 7:
          _context18.prev = 7;
          _context18.t0 = _context18["catch"](0);
          console.log(_context18.t0);

        case 10:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/attendance/:id/:weekno', function _callee19(req, res, next) {
  var weeklyRating;
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _context19.next = 3;
          return regeneratorRuntime.awrap(models.studentAttendance.findAll({
            where: {
              weekno: req.params.weekno,
              studentId: req.params.id
            },
            include: [{
              model: models.course,
              as: "course",
              foreignKey: "courseId",
              attributes: [['title', 'label'], ['id', 'value'], 'code']
            }]
          }));

        case 3:
          weeklyRating = _context19.sent;
          res.send(weeklyRating).status(200);
          _context19.next = 10;
          break;

        case 7:
          _context19.prev = 7;
          _context19.t0 = _context19["catch"](0);
          console.log(_context19.t0);

        case 10:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.put('/attendance', function _callee20(req, res, next) {
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _context20.next = 3;
          return regeneratorRuntime.awrap(models.studentAttendance.update(req.body.data, {
            where: {
              id: req.body.data.id
            }
          }));

        case 3:
          res.sendStatus(200);
          _context20.next = 9;
          break;

        case 6:
          _context20.prev = 6;
          _context20.t0 = _context20["catch"](0);
          console.log(_context20.t0);

        case 9:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router["delete"]('/attendance/:id', function _callee21(req, res, next) {
  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _context21.next = 3;
          return regeneratorRuntime.awrap(models.studentAttendance.destroy({
            where: {
              id: req.params.id
            }
          }));

        case 3:
          res.sendStatus(200);
          _context21.next = 9;
          break;

        case 6:
          _context21.prev = 6;
          _context21.t0 = _context21["catch"](0);
          console.log(_context21.t0);

        case 9:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router.get('/', checkTokenValidity, function _callee22(req, res, next) {
  var students;
  return regeneratorRuntime.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          _context22.next = 3;
          return regeneratorRuntime.awrap(student.findAll());

        case 3:
          students = _context22.sent;
          res.send(students).status(200);
          _context22.next = 10;
          break;

        case 7:
          _context22.prev = 7;
          _context22.t0 = _context22["catch"](0);
          console.log(_context22.t0);

        case 10:
        case "end":
          return _context22.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.get('/:id', function _callee23(req, res, next) {
  var id, students, courses, FailedCourses, Punishments, LabsBenefits, doctors, officers, tassistants, studentRating, attendance;
  return regeneratorRuntime.async(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          id = req.params.id;
          _context23.prev = 1;
          _context23.next = 4;
          return regeneratorRuntime.awrap(student.findOne({
            where: {
              id: id
            }
          }));

        case 4:
          students = _context23.sent;
          console.log(students.dataValues.year);
          _context23.next = 8;
          return regeneratorRuntime.awrap(models.course.findAll({
            where: {
              year: students.dataValues.year
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

        case 8:
          courses = _context23.sent;
          _context23.next = 11;
          return regeneratorRuntime.awrap(models.failedCourse.findAll({
            where: {
              studentId: id
            }
          }));

        case 11:
          FailedCourses = _context23.sent;
          _context23.next = 14;
          return regeneratorRuntime.awrap(models.punishment.findAll({
            where: {
              studentId: id
            }
          }));

        case 14:
          Punishments = _context23.sent;
          _context23.next = 17;
          return regeneratorRuntime.awrap(models.labsBenefit.findAll({
            where: {
              studentId: id
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

        case 17:
          LabsBenefits = _context23.sent;
          _context23.next = 20;
          return regeneratorRuntime.awrap(models.Doctor.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 20:
          doctors = _context23.sent;
          _context23.next = 23;
          return regeneratorRuntime.awrap(models.Officer.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 23:
          officers = _context23.sent;
          _context23.next = 26;
          return regeneratorRuntime.awrap(models.TAssistant.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 26:
          tassistants = _context23.sent;
          _context23.next = 29;
          return regeneratorRuntime.awrap(models.studentRating.findAll({
            where: {
              studentId: id
            },
            attributes: ['weekno', [sequelize.fn('count', sequelize.col('weekno')), 'cnt']],
            group: ['weekno']
          }));

        case 29:
          studentRating = _context23.sent;
          _context23.next = 32;
          return regeneratorRuntime.awrap(models.studentAttendance.findAll({
            where: {
              studentId: id
            },
            attributes: ['weekno', [sequelize.fn('count', sequelize.col('weekno')), 'cnt']],
            group: ['weekno']
          }));

        case 32:
          attendance = _context23.sent;
          res.send({
            studentAttendance: attendance,
            studentRating: studentRating,
            tassistants: tassistants,
            doctors: doctors,
            officers: officers,
            courses: courses,
            student: students,
            failedCourses: FailedCourses,
            punishment: Punishments,
            labsBenefits: LabsBenefits
          }).status(200);
          _context23.next = 39;
          break;

        case 36:
          _context23.prev = 36;
          _context23.t0 = _context23["catch"](1);
          console.log(_context23.t0);

        case 39:
        case "end":
          return _context23.stop();
      }
    }
  }, null, null, [[1, 36]]);
});
router.put("/:id", function _callee24(req, res, next) {
  var students;
  return regeneratorRuntime.async(function _callee24$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          console.log(req.body.data);
          _context24.next = 4;
          return regeneratorRuntime.awrap(student.update({
            name: req.body.data.name,
            militaryId: req.body.data.militaryId,
            group: req.body.data.group,
            section: req.body.data.section,
            unit: req.body.data.unit,
            town: req.body.data.town,
            country: req.body.data.country,
            type: req.body.data.type,
            email: req.body.data.email,
            year: req.body.data.year,
            collegeDegree: req.body.data.collegeDegree,
            prevTermDegree: req.body.data.prevTermDegree,
            prevTermweekestDegree: req.body.data.prevTermweekestDegree
          }, {
            where: {
              id: req.params.id
            }
          }));

        case 4:
          _context24.next = 6;
          return regeneratorRuntime.awrap(student.findOne({
            where: {
              id: req.params.id
            }
          }));

        case 6:
          students = _context24.sent;
          res.send(students).status(200);
          _context24.next = 13;
          break;

        case 10:
          _context24.prev = 10;
          _context24.t0 = _context24["catch"](0);
          console.log(_context24.t0);

        case 13:
        case "end":
          return _context24.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = router;