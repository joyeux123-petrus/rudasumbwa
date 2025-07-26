const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Quiz = require('./Quiz')(sequelize);
  const QuizSubmission = sequelize.define('QuizSubmission', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quizId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Quiz, key: 'id' } },
    studentName: { type: DataTypes.STRING, allowNull: false },
    studentId: { type: DataTypes.STRING, allowNull: true },
    submittedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    score: { type: DataTypes.FLOAT, allowNull: true }
  }, {
    timestamps: false
  });

  Quiz.hasMany(QuizSubmission, { foreignKey: 'quizId' });
  QuizSubmission.belongsTo(Quiz, { foreignKey: 'quizId' });

  return QuizSubmission;
};
