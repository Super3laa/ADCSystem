"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getRoutes;

var _Login = _interopRequireDefault(require("../views/Login/Login"));

var _Home = _interopRequireDefault(require("../views/Home/Home"));

var _NotFound = _interopRequireDefault(require("../views/NotFound/NotFound"));

var _Permissions = _interopRequireDefault(require("../views/DashBoard/Permissions"));

var _EntityPage = _interopRequireDefault(require("../views/EntityPage/EntityPage"));

var _Student = _interopRequireDefault(require("../views/Student/Student"));

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _Course = _interopRequireDefault(require("../views/Course/Course"));

var _Doctor = _interopRequireDefault(require("../views/Doctor/Doctor"));

var _Officer = _interopRequireDefault(require("../views/Officer/Officer"));

var _TAssistant = _interopRequireDefault(require("../views/TAssistant/TAssistant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getRoutes() {
  try {
    if (localStorage.getItem('token')) {
      var user = (0, _jwtDecode["default"])(localStorage.getItem('token')).user;

      switch (user.permissions) {
        case 'superadmin':
          console.log('supradmin routes');
          return superadmin;

        case 'admin':
          console.log('adminroutes');
          return admin;
      }
    } else {
      console.log('passer');
      return passByRoutes;
    }
  } catch (error) {}
}

var passByRoutes = [{
  path: "/Login",
  component: _Login["default"]
}, {
  path: "*",
  component: _NotFound["default"]
}];
var superadmin = [{
  path: "/Home",
  component: _Home["default"]
}, {
  path: "/coursesDetails",
  component: _Home["default"]
}, {
  path: "/:entity",
  component: _EntityPage["default"]
}, {
  path: "/Dashboard/Permissions",
  component: _Permissions["default"]
}, {
  path: "/students/:id",
  component: _Student["default"]
}, {
  path: "/courses/:type/",
  component: _EntityPage["default"]
}, {
  path: "/courses/detailed/:id",
  component: _Course["default"]
}, {
  path: "/doctors/:id",
  component: _Doctor["default"]
}, {
  path: "/officers/:id",
  component: _Officer["default"]
}, {
  path: "/tassistants/:id",
  component: _TAssistant["default"]
}, {
  path: "*",
  component: _NotFound["default"]
}];
var admin = [{
  path: "/Home",
  component: _Home["default"]
}, {
  path: "/coursesDetails",
  component: _Home["default"]
}, {
  path: "/:entity",
  component: _EntityPage["default"]
}, {
  path: "/Dashboard/Permissions",
  component: _Permissions["default"]
}, {
  path: "/students/:id",
  component: _Student["default"]
}, {
  path: "/courses/:type/",
  component: _EntityPage["default"]
}, {
  path: "/courses/detailed/:id",
  component: _Course["default"]
}, {
  path: "/doctors/:id",
  component: _Doctor["default"]
}, {
  path: "/officers/:id",
  component: _Officer["default"]
}, {
  path: "/tassistants/:id",
  component: _TAssistant["default"]
}, {
  path: "*",
  component: _NotFound["default"]
}];