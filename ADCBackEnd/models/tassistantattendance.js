'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tassistantAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tassistantAttendance.belongsTo(models.TAssistant,{foreignKey:"tassistantId"})
      tassistantAttendance.belongsTo(models.course,{foreignKey:"courseId"})
    }
  };
  tassistantAttendance.init({
    courseId: DataTypes.INTEGER,
    tassistantId: DataTypes.INTEGER,
    weekno: DataTypes.INTEGER,
    status: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tassistantAttendance',
  });
  return tassistantAttendance;
};