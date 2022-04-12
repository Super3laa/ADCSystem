'use strict';
const moment = require('moment')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctorAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      doctorAttendance.belongsTo(models.Doctor,{foreignKey:"doctorId"})
      doctorAttendance.belongsTo(models.course,{foreignKey:"courseId"})
    }
  };
  doctorAttendance.init({
    courseId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    date: {type:DataTypes.DATE,
    get(){
      const rawValue= this.getDataValue('date');
      return moment(rawValue).format('DD/MM/YYYY')
    }},
    weekno: DataTypes.INTEGER,
    status: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'doctorAttendance',
  });
  return doctorAttendance;
};