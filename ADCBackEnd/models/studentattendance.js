'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      studentAttendance.belongsTo(models.student,{foreignKey:"studentId"})
      studentAttendance.belongsTo(models.course,{foreignKey:"courseId"})
    }
  };
  studentAttendance.init({
    courseId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    weekno: DataTypes.INTEGER,
    status: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'studentAttendance',
  });
  return studentAttendance;
};