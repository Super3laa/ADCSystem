"use strict";

var express = require('express');

var router = express.Router();

var auth = require('../services/auth.js');

var models = require('../models');

router.post('/getUser', function _callee(req, res, next) {
  var userdb;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log(req.body.data);
          _context.next = 4;
          return regeneratorRuntime.awrap(models.user.findOne({
            attributes: ["id", "username", "permissions", "type"],
            where: {
              id: req.body.data.id
            }
          }));

        case 4:
          userdb = _context.sent;

          if (!userdb) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(200).send(userdb));

        case 7:
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
router.post('/login', function _callee2(req, res, next) {
  var userDB, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(auth.checkLoginData(req, res));

        case 3:
          userDB = _context2.sent;

          if (!userDB) {
            _context2.next = 11;
            break;
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(auth.giveMeLoginToken(userDB));

        case 7:
          token = _context2.sent;
          res.status(200).json({
            token: token
          });
          _context2.next = 12;
          break;

        case 11:
          res.status(301).send("Wrong Username or Passwrord");

        case 12:
          _context2.next = 18;
          break;

        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.send("Error").status(401);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
router.post('/', function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(models.user.create(req.body.data));

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
router.get('/', function _callee4(req, res, next) {
  var Officers;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(models.user.findAll());

        case 3:
          Officers = _context4.sent;
          res.send(Officers).status(200);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
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