"use strict";

var jwt = require("jsonwebtoken");

var models = require('../models');

var bcrypt = require('bcrypt');

module.exports = {
  giveMeLoginToken: function giveMeLoginToken(data) {
    return regeneratorRuntime.async(function giveMeLoginToken$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", jwt.sign({
              user: data
            }, "WizzardOz", {
              expiresIn: "12h"
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  checkLoginData: function checkLoginData(req, res) {
    var userDB;
    return regeneratorRuntime.async(function checkLoginData$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(models.user.findOne({
              where: {
                username: req.body.data.username
              }
            }));

          case 3:
            userDB = _context2.sent;

            if (!bcrypt.compareSync(req.body.data.password, userDB.dataValues.password)) {
              _context2.next = 9;
              break;
            }

            userDB.dataValues.password = "";
            return _context2.abrupt("return", userDB);

          case 9:
            return _context2.abrupt("return", false);

          case 10:
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 12]]);
  },
  checkTokenValidity: function checkTokenValidity(req, res, next) {
    var token, decoded;
    return regeneratorRuntime.async(function checkTokenValidity$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = req.header("x-auth-token");

            if (token) {
              _context3.next = 4;
              break;
            }

            console.log('No Token');
            return _context3.abrupt("return", res.status(403).json({
              msg: "No token, authorizaton denied"
            }));

          case 4:
            _context3.prev = 4;
            decoded = jwt.verify(token, "WizzardOz");

            if (!(decoded.exp < decoded.iat)) {
              _context3.next = 9;
              break;
            }

            console.log("ExpiredToken ...");
            return _context3.abrupt("return", res.status(403).json({
              msg: "Token Expired, authorizaton denied"
            }));

          case 9:
            req.user = decoded;
            next();
            _context3.next = 17;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](4);
            console.log("invalid Token");
            res.status(403).json({
              msg: "Token is not valid"
            });

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[4, 13]]);
  }
};