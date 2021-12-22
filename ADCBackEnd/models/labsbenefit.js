'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class labsBenefit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      labsBenefit.belongsTo(models.Officer,{foreignKey:"OfficerId"})
      labsBenefit.belongsTo(models.TAssistant,{foreignKey:"TAssistantId"})
      labsBenefit.belongsTo(models.Doctor,{foreignKey:"doctorId"})
    }
  };
  labsBenefit.init({
    title: DataTypes.STRING,
    attendancePercentage: DataTypes.STRING,
    numberOfExperiment: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    doctorId: DataTypes.INTEGER,
    officerId: DataTypes.INTEGER,
    TAssistantId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'labsBenefit',
  });
  return labsBenefit;
};