const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Quiz = require('./Quiz')(sequelize);
  const Question = sequelize.define('Question', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    quizId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Quiz, key: 'id' } },
    text: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    marks: { type: DataTypes.INTEGER, allowNull: false },
    choices: { type: DataTypes.JSON, allowNull: true }, // For MCQ, store as array or object
    correctAnswer: { type: DataTypes.STRING, allowNull: true },
    mediaUrl: { type: DataTypes.STRING, allowNull: true }
  }, {
    timestamps: false
  });

  Quiz.hasMany(Question, { foreignKey: 'quizId' });
  Question.belongsTo(Quiz, { foreignKey: 'quizId' });

  return Question;
};
