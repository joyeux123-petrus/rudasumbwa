const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ClubComment = sequelize.define('ClubComment', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    postId: { type: DataTypes.INTEGER, allowNull: false }, // FK to ClubPost
    userId: { type: DataTypes.INTEGER, allowNull: false }, // FK to User
    content: { type: DataTypes.TEXT, allowNull: false }
  }, { timestamps: true });
  return ClubComment;
};
