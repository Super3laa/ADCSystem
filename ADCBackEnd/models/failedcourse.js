'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class failedCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  failedCourse.init({
    code: DataTypes.STRING,
    title: DataTypes.STRING,
    studentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'failedCourse',
  });
  return failedCourse;
};