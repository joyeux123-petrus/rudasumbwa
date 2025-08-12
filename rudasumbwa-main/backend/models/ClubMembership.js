const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ClubMembership = sequelize.define('ClubMembership', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false }, // FK to User
    clubId: { type: DataTypes.INTEGER, allowNull: false }, // FK to Club
    role: { type: DataTypes.ENUM('member', 'admin', 'president', 'advisor', 'moderator'), defaultValue: 'member' },
    status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' }
  }, { timestamps: true });
  return ClubMembership;
};
