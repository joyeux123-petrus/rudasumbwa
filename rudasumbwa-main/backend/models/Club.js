const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Club = sequelize.define('Club', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING, // URL or file path
      allowNull: true
    },
    banner: {
      type: DataTypes.STRING, // URL or file path
      allowNull: true
    },
    badge: {
      type: DataTypes.STRING, // URL or file path
      allowNull: true
    },
    presidentId: {
      type: DataTypes.INTEGER, // FK to User
      allowNull: true
    },
    advisorId: {
      type: DataTypes.INTEGER, // FK to User (teacher)
      allowNull: true
    }
  }, {
    timestamps: true
  });
  return Club;
};
