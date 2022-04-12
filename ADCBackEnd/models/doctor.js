'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.hasMany(models.labsBenefit,{foreignKey:"doctorId"})
      Doctor.hasMany(models.course,{as:"Doctor",foreignKey:"doctorId"})
      Doctor.hasMany(models.doctorAttendance,{foreignKey:"doctorId"})
      Doctor.hasMany(models.course,{as:"SecDoctor",foreignKey:"secdoctorId"})


    }
  };
  Doctor.init({
    name: DataTypes.STRING,
    rate:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};