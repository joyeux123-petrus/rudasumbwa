const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ClubLeaderboard = sequelize.define('ClubLeaderboard', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clubId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Club
    userId: { type: DataTypes.INTEGER, allowNull: false }, // FK to User
    points: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, { timestamps: true });
  return ClubLeaderboard;
};
