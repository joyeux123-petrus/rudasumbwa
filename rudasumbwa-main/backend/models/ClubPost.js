const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ClubPost = sequelize.define('ClubPost', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clubId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Club
    userId: { type: DataTypes.INTEGER, allowNull: false }, // FK to User
    content: { type: DataTypes.TEXT, allowNull: false },
    type: { type: DataTypes.ENUM('post', 'announcement'), defaultValue: 'post' }
  }, { timestamps: true });
  return ClubPost;
};
