'use strict';
var bcrypt=require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    password:DataTypes.STRING,
    permissions: DataTypes.STRING,
  }, {
    hooks:{
      beforeCreate:(userObj)=>{
        const salt=bcrypt.genSaltSync();
        userObj.password=bcrypt.hashSync(userObj.password,salt);
      }
    }
  });
  user.prototype.validPassword=function(password){
    return bcrypt.compareSync(password,this.password);
  }
  return user;
};