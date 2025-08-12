const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create sequelize instance
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// Import model definitions
const defineClub = require('./Club');
const defineClubAchievement = require('./ClubAchievement');
const defineClubChatMessage = require('./ClubChatMessage');
const defineClubComment = require('./ClubComment');
const defineClubEvent = require('./ClubEvent');
const defineClubFile = require('./ClubFile');
const defineClubLeaderboard = require('./ClubLeaderboard');
const defineClubMembership = require('./ClubMembership');
const defineClubPost = require('./ClubPost');
const defineEvent = require('./Event');
const defineLeaderboard = require('./Leaderboard');
const defineNews = require('./News');
const defineNote = require('./Note');
const defineNotification = require('./Notification');
const defineQuestion = require('./Question');
const defineQuiz = require('./Quiz');
const defineQuizAnswer = require('./QuizAnswer');
const defineQuizSubmission = require('./QuizSubmission');
const defineUser = require('./User');

// Define models
const Club = defineClub(sequelize);
const ClubAchievement = defineClubAchievement(sequelize);
const ClubChatMessage = defineClubChatMessage(sequelize);
const ClubComment = defineClubComment(sequelize);
const ClubEvent = defineClubEvent(sequelize);
const ClubFile = defineClubFile(sequelize);
const ClubLeaderboard = defineClubLeaderboard(sequelize);
const ClubMembership = defineClubMembership(sequelize);
const ClubPost = defineClubPost(sequelize);
const Event = defineEvent(sequelize);
const Leaderboard = defineLeaderboard(sequelize);
const News = defineNews(sequelize);
const Note = defineNote(sequelize);
const Notification = defineNotification(sequelize);
const Quiz = defineQuiz(sequelize);
const Question = defineQuestion(sequelize);
const QuizAnswer = defineQuizAnswer(sequelize);
const QuizSubmission = defineQuizSubmission(sequelize);
const User = defineUser(sequelize);

// Export all models and sequelize instance
module.exports = {
  sequelize,
  Club,
  ClubAchievement,
  ClubChatMessage,
  ClubComment,
  ClubEvent,
  ClubFile,
  ClubLeaderboard,
  ClubMembership,
  ClubPost,
  Event,
  Leaderboard,
  News,
  Note,
  Notification,
  Question,
  Quiz,
  QuizAnswer,
  QuizSubmission,
  User,
};
