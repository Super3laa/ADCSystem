'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Officer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Officer.hasMany(models.labsBenefit,{foreignKey:"OfficerId"})
      Officer.hasMany(models.course,{foreignKey:"OfficerId"})
      Officer.hasMany(models.officerAttendance,{foreignKey:"officerId"})


    }
  };
  Officer.init({
    name: DataTypes.STRING,
    rate:DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Officer',
  });
  return Officer;
};