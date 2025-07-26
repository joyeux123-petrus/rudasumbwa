const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const QuizSubmission = require('./QuizSubmission')(sequelize);
  const Question = require('./Question')(sequelize);
  const QuizAnswer = sequelize.define('QuizAnswer', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    submissionId: { type: DataTypes.INTEGER, allowNull: false, references: { model: QuizSubmission, key: 'id' } },
    questionId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Question, key: 'id' } },
    answer: { type: DataTypes.STRING, allowNull: false },
    isCorrect: { type: DataTypes.BOOLEAN, allowNull: true }
  }, {
    timestamps: false
  });

  QuizSubmission.hasMany(QuizAnswer, { foreignKey: 'submissionId' });
  QuizAnswer.belongsTo(QuizSubmission, { foreignKey: 'submissionId' });
  Question.hasMany(QuizAnswer, { foreignKey: 'questionId' });
  QuizAnswer.belongsTo(Question, { foreignKey: 'questionId' });

  return QuizAnswer;
};
