'use strict';

var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    permissions: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function beforeCreate(userObj) {
        var salt = bcrypt.genSaltSync();
        userObj.password = bcrypt.hashSync(userObj.password, salt);
      }
    }
  });

  user.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return user;
};