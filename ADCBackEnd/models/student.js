'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      student.hasMany(models.studentRating,{foreignKey:"studentId"})
      student.hasMany(models.studentAttendance,{foreignKey:"studentId"})

    }
  };
  student.init({
    name: DataTypes.STRING,
    militaryId:DataTypes.STRING,
    group: DataTypes.STRING,
    section: DataTypes.STRING,
    unit: DataTypes.STRING,
    town: DataTypes.STRING,
    country: DataTypes.STRING,
    type: DataTypes.STRING,
    email: DataTypes.STRING,
    year:DataTypes.STRING,
    collegeDegree:DataTypes.FLOAT,
    prevTermDegree:DataTypes.FLOAT,
    prevTermweekestDegree: DataTypes.FLOAT,

  }, {
    sequelize,
    modelName: 'student',
  });
  return student;
};