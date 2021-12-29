'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      studentRating.belongsTo(models.student,{foreignKey:"studentId"})
      studentRating.belongsTo(models.course,{foreignKey:"courseId"})

    }
  };
  studentRating.init({
    courseId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    weekno: DataTypes.INTEGER,
    rate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'studentRating',
  });
  return studentRating;
};