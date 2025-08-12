const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ClubAchievement = sequelize.define('ClubAchievement', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clubId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Club
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    date: { type: DataTypes.DATE, allowNull: false }
  }, { timestamps: true });
  return ClubAchievement;
};
