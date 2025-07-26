const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ClubEvent = sequelize.define('ClubEvent', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clubId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Club
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: true },
    location: { type: DataTypes.STRING, allowNull: true }
  }, { timestamps: true });
  return ClubEvent;
};
