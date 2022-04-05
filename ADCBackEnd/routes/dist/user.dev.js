"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = express.Router();

var auth = require('../services/auth.js');

var models = require('../models');

var _require = require("sequelize"),
    Op = _require.Op;

var fs = require('fs');

var path = require('path');

var bcrypt = require('bcrypt');

var readXlsxFile = require('read-excel-file/node');

var writeXlsxFile = require('write-excel-file/node');

var _require2 = require('../services/auth.js'),
    checkTokenValidity = _require2.checkTokenValidity;

var _require3 = require('../services/ExcelSync.js'),
    seedDataBase = _require3.seedDataBase,
    seedExcelSheets = _require3.seedExcelSheets;

router.get('/search/:search', checkTokenValidity, function _callee(req, res) {
  var userdb;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(models.user.findAll({
            where: {
              username: _defineProperty({}, Op.like, "%".concat(req.params.search, "%"))
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
router.post('/getUser', checkTokenValidity, function _callee2(req, res, next) {
  var userdb;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          console.log(req.body.data);
          _context2.next = 4;
          return regeneratorRuntime.awrap(models.user.findOne({
            attributes: ["id", "username", "permissions", "type"],
            where: {
              id: req.body.data.id
            }
          }));

        case 4:
          userdb = _context2.sent;

          if (userdb) {
            res.status(200).send(userdb);
          } else {
            res.status(403).send("permission denied");
          }

          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.sendStatus(500);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post('/login', function _callee3(req, res, next) {
  var userDB, token;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(auth.checkLoginData(req, res));

        case 3:
          userDB = _context3.sent;

          if (!userDB) {
            _context3.next = 11;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(auth.giveMeLoginToken(userDB));

        case 7:
          token = _context3.sent;
          res.status(200).json({
            token: token
          });
          _context3.next = 12;
          break;

        case 11:
          res.status(301).send("Wrong Username or Passwrord");

        case 12:
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
router.post('/', checkTokenValidity, function _callee4(req, res, next) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(models.user.create(req.body.data));

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
router.get('/sync/:sync', checkTokenValidity, function _callee5(req, res, next) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.t0 = req.params.sync;
          _context5.next = _context5.t0 === "EDB" ? 4 : _context5.t0 === "DBE" ? 7 : 10;
          break;

        case 4:
          _context5.next = 6;
          return regeneratorRuntime.awrap(seedDataBase());

        case 6:
          return _context5.abrupt("break", 10);

        case 7:
          _context5.next = 9;
          return regeneratorRuntime.awrap(seedExcelSheets());

        case 9:
          return _context5.abrupt("break", 10);

        case 10:
          res.sendStatus(200);
          _context5.next = 17;
          break;

        case 13:
          _context5.prev = 13;
          _context5.t1 = _context5["catch"](0);
          console.log(_context5.t1);
          res.sendStatus(500);

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 13]]);
});
router.get('/', function _callee6(req, res, next) {
  var Officers;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(models.user.findAll({
            attributes: ['id', 'username', 'permissions', 'type']
          }));

        case 3:
          Officers = _context6.sent;
          res.send(Officers).status(200);
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
router.put('/', checkTokenValidity, function _callee7(req, res, next) {
  var salt;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          salt = bcrypt.genSaltSync();
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hashSync(req.body.data.password, salt));

        case 4:
          req.body.data.password = _context7.sent;
          _context7.next = 7;
          return regeneratorRuntime.awrap(models.user.update(req.body.data, {
            where: {
              id: req.body.data.id
            }
          }));

        case 7:
          res.sendStatus(200);
          _context7.next = 14;
          break;

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](1);
          console.log(_context7.t0);
          res.sendStatus(500);

        case 14:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
router["delete"]('/:id', checkTokenValidity, function _callee8(req, res, next) {
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(models.user.destroy({
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
module.exports = router;