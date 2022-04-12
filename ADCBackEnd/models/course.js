'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      course.belongsTo(models.Officer,{foreignKey:"OfficerId"})
      course.belongsTo(models.TAssistant,{foreignKey:"TAssistantId"})
      course.belongsTo(models.Doctor,{as:"Doctor",foreignKey:"doctorId"})
      course.belongsTo(models.Doctor,{as:"SecDoctor",foreignKey:"secdoctorId"})

      course.hasMany(models.studentRating,{foreignKey:"courseId"})
      course.hasMany(models.studentAttendance,{foreignKey:"courseId"})

    }
  };
  course.init({
    title: DataTypes.STRING,
    code: DataTypes.STRING,
    type: DataTypes.STRING,
    year: DataTypes.STRING,
    secdoctorId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    officerId: DataTypes.INTEGER,
    TAssistantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'course',
  });
  return course;
};