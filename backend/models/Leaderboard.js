const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Leaderboard = sequelize.define('Leaderboard', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    grade: { type: DataTypes.STRING, allowNull: false },
    rank: { type: DataTypes.INTEGER, allowNull: false },
    medal: { type: DataTypes.STRING, allowNull: true },
    info: { type: DataTypes.STRING, allowNull: true }
  }, { timestamps: false });
  return Leaderboard;
};
