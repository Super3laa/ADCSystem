"use strict";

var express = require('express');

var router = express.Router();

var models = require('../models');

var jwt = require('jsonwebtoken');

router.post('/', function _callee(req, res, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(models.course.create(req.body.data));

        case 3:
          res.sendStatus(200);
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
router.get('/', function _callee2(req, res, next) {
  var token, decoded, courses, doctors, officers, tassistants;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          token = req.headers['x-auth-token'];
          decoded = jwt.verify(token, 'WizzardOz');
          _context2.next = 5;
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
          courses = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(models.Doctor.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 8:
          doctors = _context2.sent;
          _context2.next = 11;
          return regeneratorRuntime.awrap(models.Officer.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 11:
          officers = _context2.sent;
          _context2.next = 14;
          return regeneratorRuntime.awrap(models.TAssistant.findAll({
            attributes: [['name', 'label'], ['id', 'value']]
          }));

        case 14:
          tassistants = _context2.sent;
          res.send({
            courses: courses,
            doctors: doctors,
            officers: officers,
            tassistants: tassistants
          }).status(200);
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 18]]);
});
router.put('/', function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(models.course.update(req.body.data, {
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
router["delete"]('/:id', function _callee4(req, res, next) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(models.course.destroy({
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
module.exports = router;