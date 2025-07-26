const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Quiz = sequelize.define('Quiz', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    lessonName: { type: DataTypes.STRING, allowNull: false },
    class: { type: DataTypes.STRING, allowNull: false },
    startTime: { type: DataTypes.DATE, allowNull: false },
    endTime: { type: DataTypes.DATE, allowNull: false },
    timingMode: { type: DataTypes.STRING, allowNull: false },
    perQuestionTime: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
  }, {
    timestamps: true
  });
  return Quiz;
};
