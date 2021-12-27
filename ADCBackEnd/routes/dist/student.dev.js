"use strict";

var express = require('express');

var router = express.Router();

var models = require('../models');

var student = models.student;

var jwt = require('jsonwebtoken');

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
router.post('/labsBenefits', function _callee8(req, res, next) {
  var userdb;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(models.labsBenefit.create(req.body.data));

        case 3:
          userdb = _context8.sent;
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
router.put('/labsBenefits', function _callee9(req, res, next) {
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return regeneratorRuntime.awrap(models.labsBenefit.update(req.body.data, {
            where: {
              id: req.body.data.id
            }
          }));

        case 3:
          res.sendStatus(200);
          _context9.next = 9;
          break;

        case 6:
          _context9.prev = 6;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);

        case 9:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router["delete"]('/labsBenefits/:id', function _callee10(req, res, next) {
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(models.labsBenefit.destroy({
            where: {
              id: req.params.id
            }
          }));

        case 3:
          res.sendStatus(200);
          _context10.next = 9;
          break;

        case 6:
          _context10.prev = 6;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);

        case 9:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router.get('/', function _callee11(req, res, next) {
  var token, decoded, students;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          token = req.headers['x-auth-token'];
          decoded = jwt.verify(token, 'WizzardOz');
          _context11.next = 5;
          return regeneratorRuntime.awrap(student.findAll({
            where: {
              type: decoded.user.type !== "عام" && decoded.user.type
            }
          }));

        case 5:
          students = _context11.sent;
          res.send(students).status(200);
          _context11.next = 12;
          break;

        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);

        case 12:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.get('/:id', function _callee12(req, res, next) {
  var id, students, courses, FailedCourses, Punishments, LabsBenefits, doctors, officers, tassistants;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          id = req.params.id;
          _context12.prev = 1;
          _context12.next = 4;
          return regeneratorRuntime.awrap(student.findOne({
            where: {
              id: id
            }
          }));

        case 4:
          students = _context12.sent;
          _context12.next = 7;
          return regeneratorRuntime.awrap(models.course.findAll({
            where: {
              year: "تانيه"
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

        case 7:
          courses = _context12.sent;
          _context12.next = 10;
          return regeneratorRuntime.awrap(models.failedCourse.findAll({
            where: {
              studentId: id
            }
          }));

        case 10:
          FailedCourses = _context12.sent;
          _context12.next = 13;
          return regeneratorRuntime.awrap(models.punishment.findAll({
            where: {
              studentId: id
            }
          }));

        case 13:
          Punishments = _context12.sent;
          _context12.next = 16;
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

        case 16:
          LabsBenefits = _context12.sent;
          _context12.next = 19;
          return regeneratorRuntime.awrap(models.Doctor.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 19:
          doctors = _context12.sent;
          _context12.next = 22;
          return regeneratorRuntime.awrap(models.Officer.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 22:
          officers = _context12.sent;
          _context12.next = 25;
          return regeneratorRuntime.awrap(models.TAssistant.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 25:
          tassistants = _context12.sent;
          res.send({
            tassistants: tassistants,
            doctors: doctors,
            officers: officers,
            courses: courses,
            student: students,
            failedCourses: FailedCourses,
            punishment: Punishments,
            labsBenefits: LabsBenefits
          }).status(200);
          _context12.next = 32;
          break;

        case 29:
          _context12.prev = 29;
          _context12.t0 = _context12["catch"](1);
          console.log(_context12.t0);

        case 32:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[1, 29]]);
});
router.put("/:id", function _callee13(req, res, next) {
  var students;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          console.log(req.body.data);
          _context13.next = 4;
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
          _context13.next = 6;
          return regeneratorRuntime.awrap(student.findOne({
            where: {
              id: req.params.id
            }
          }));

        case 6:
          students = _context13.sent;
          res.send(students).status(200);
          _context13.next = 13;
          break;

        case 10:
          _context13.prev = 10;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);

        case 13:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = router;