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

var readXlsxFile = require('read-excel-file/node');

var writeXlsxFile = require('write-excel-file/node');

router.get('/search/:search', function _callee(req, res) {
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
router.post('/getUser', function _callee2(req, res, next) {
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

          if (!userdb) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(200).send(userdb));

        case 7:
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
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
          _context3.next = 18;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.send("Error").status(401);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
router.post('/', function _callee4(req, res, next) {
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
router.get('/sync/:sync', function _callee5(req, res, next) {
  var map, studentRows;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          console.log("Excel File path : ", path.join(__dirname, '../ExcelData/dummy.xlsx'));
          _context5.t0 = req.params.sync;
          _context5.next = _context5.t0 === "EDB" ? 5 : _context5.t0 === "DBE" ? 12 : 15;
          break;

        case 5:
          map = {
            'الاسم': 'name',
            'رقم العسكري': 'militaryId'
          };
          _context5.next = 8;
          return regeneratorRuntime.awrap(readXlsxFile(path.join(__dirname, '../ExcelData/dummy.xlsx'), {
            map: map
          }));

        case 8:
          studentRows = _context5.sent;
          _context5.next = 11;
          return regeneratorRuntime.awrap(studentFormatter(studentRows.rows));

        case 11:
          return _context5.abrupt("break", 15);

        case 12:
          _context5.next = 14;
          return regeneratorRuntime.awrap(studentWriting());

        case 14:
          return _context5.abrupt("break", 15);

        case 15:
          res.sendStatus(200);
          _context5.next = 21;
          break;

        case 18:
          _context5.prev = 18;
          _context5.t1 = _context5["catch"](0);
          console.log(_context5.t1);

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 18]]);
});

function studentFormatter(rows) {
  var i;
  return regeneratorRuntime.async(function studentFormatter$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(models.student.destroy({
            where: {}
          }));

        case 2:
          i = 0;

        case 3:
          if (!(i < rows.length)) {
            _context6.next = 9;
            break;
          }

          _context6.next = 6;
          return regeneratorRuntime.awrap(models.student.create(rows[i]));

        case 6:
          i++;
          _context6.next = 3;
          break;

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function studentWriting() {
  var students, schema;
  return regeneratorRuntime.async(function studentWriting$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(models.student.findAll({
            raw: true
          }));

        case 2:
          students = _context7.sent;
          schema = [{
            column: 'الاسم',
            type: String,
            value: function value(student) {
              return student.name;
            }
          }, {
            column: 'رقم العسكري',
            type: String,
            value: function value(student) {
              return student.militaryId;
            }
          }];
          _context7.next = 6;
          return regeneratorRuntime.awrap(writeXlsxFile(students, {
            schema: schema,
            filePath: path.join(__dirname, '../ExcelData/dummy.xlsx')
          }));

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  });
}

router.get('/', function _callee6(req, res, next) {
  var Officers;
  return regeneratorRuntime.async(function _callee6$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(models.user.findAll());

        case 3:
          Officers = _context8.sent;
          res.send(Officers).status(200);
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
/*router.put('/',auth.auth,function(req,res,next){
  const salt=bcrypt.genSaltSync();
  
  req.body.userObj.password=bcrypt.hashSync(req.body.userObj.password,salt);
   user.update(req.body.userObj,{where:{id:req.body.userObj.id}}).then((userDoc)=>{
    res.status(200).send("User has been updated successfully!");
  }).catch((err)=>{
    var error=new Error(err);
    error.status=500;
    next(error);
  });

});*/

module.exports = router;