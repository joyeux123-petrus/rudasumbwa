const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ClubChatMessage = sequelize.define('ClubChatMessage', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clubId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Club
    userId: { type: DataTypes.INTEGER, allowNull: false }, // FK to User
    content: { type: DataTypes.TEXT, allowNull: true },
    fileUrl: { type: DataTypes.STRING, allowNull: true },
    fileType: { type: DataTypes.STRING, allowNull: true },
    seen: { type: DataTypes.BOOLEAN, defaultValue: false },
    sentAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, { timestamps: true });
  return ClubChatMessage;
};
