const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const News = sequelize.define('News', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.STRING, allowNull: true },
    desc: { type: DataTypes.STRING, allowNull: true },
    img: { type: DataTypes.STRING, allowNull: true }
  }, { timestamps: false });
  return News;
};
