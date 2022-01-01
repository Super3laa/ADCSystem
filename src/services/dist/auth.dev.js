"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadUser = loadUser;

var _axios = _interopRequireDefault(require("axios"));

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _const = require("../const");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function loadUser() {
  var res;
  return regeneratorRuntime.async(function loadUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("here");

          if (!localStorage.getItem('token')) {
            _context.next = 8;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post(_const.API + 'user/getUser', {
            data: (0, _jwtDecode["default"])(localStorage.getItem('token')).user
          }));

        case 4:
          res = _context.sent;

          if (!(res.status == 200)) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.data);

        case 7:
          return _context.abrupt("return", false);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}