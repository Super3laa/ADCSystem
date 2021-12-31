'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class officerAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      officerAttendance.belongsTo(models.Officer,{foreignKey:"officerId"})
      officerAttendance.belongsTo(models.course,{foreignKey:"courseId"})
    }
  };
  officerAttendance.init({
    courseId: DataTypes.INTEGER,
    officerId: DataTypes.INTEGER,
    weekno: DataTypes.INTEGER,
    status: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'officerAttendance',
  });
  return officerAttendance;
};