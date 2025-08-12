const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ClubFile = sequelize.define('ClubFile', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clubId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Club
    userId: { type: DataTypes.INTEGER, allowNull: false }, // FK to User
    fileUrl: { type: DataTypes.STRING, allowNull: false },
    fileType: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true }
  }, { timestamps: true });
  return ClubFile;
};
