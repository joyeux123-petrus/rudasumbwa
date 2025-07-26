require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./models');
const http = require('http');
const { Server } = require('socket.io');
const { ClubChatMessage } = require('./models/ClubChatMessage');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
app.set('io', io); // Make io accessible in routes
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Connect to MySQL using Sequelize
sequelize.sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database.');
  })
  .catch((err) => {
    console.error('Unable to connect to MySQL database:', err);
  });

// Basic route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Health check endpoint to check server and MySQL connection status
app.get('/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      server: 'running',
      mysql: 'connected'
    });
  } catch (error) {
    res.json({
      server: 'running',
      mysql: 'disconnected',
      error: error.message
    });
  }
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const leaderboardRoutes = require('./routes/leaderboard');
app.use('/api/leaderboard', leaderboardRoutes);
const eventsRoutes = require('./routes/events');
app.use('/api/events', eventsRoutes);
const clubsRoutes = require('./routes/clubs');
app.use('/api/clubs', clubsRoutes);
const clubMembershipRoutes = require('./routes/clubMembership');
app.use('/api/club-membership', clubMembershipRoutes);
const clubPostsRoutes = require('./routes/clubPosts');
app.use('/api/club-posts', clubPostsRoutes);
const clubCommentsRoutes = require('./routes/clubComments');
app.use('/api/club-comments', clubCommentsRoutes);
const clubAchievementsRoutes = require('./routes/clubAchievements');
app.use('/api/club-achievements', clubAchievementsRoutes);
const clubFilesRoutes = require('./routes/clubFiles');
app.use('/api/club-files', clubFilesRoutes);
const clubLeaderboardRoutes = require('./routes/clubLeaderboard');
app.use('/api/club-leaderboard', clubLeaderboardRoutes);
const clubChatRoutes = require('./routes/clubChat');
app.use('/api/club-chat', clubChatRoutes);
const newsRoutes = require('./routes/news');
app.use('/api/news', newsRoutes);
const notesRoutes = require('./routes/notes');
app.use('/api/notes', notesRoutes);
const quizzesRoutes = require('./routes/quizzes');
app.use('/api/quizzes', quizzesRoutes);
const notificationsRoutes = require('./routes/notifications');
app.use('/api/notifications', notificationsRoutes);
const askPeterRoutes = require('./routes/askPeter');
app.use('/api/ask-peter', askPeterRoutes);
// TODO: Add other routes here

// --- SOCKET.IO REAL-TIME CHAT ---
io.on('connection', (socket) => {
  // Join a club chat room
  socket.on('joinClub', ({ clubId, userId }) => {
    socket.join(`club_${clubId}`);
    socket.to(`club_${clubId}`).emit('userJoined', { userId });
  });

  // Handle sending a message
  socket.on('sendMessage', async (data) => {
    // data: { clubId, userId, content, fileUrl, fileType }
    const message = await ClubChatMessage.create({
      clubId: data.clubId,
      userId: data.userId,
      content: data.content,
      fileUrl: data.fileUrl,
      fileType: data.fileType,
      seen: false
    });
    io.to(`club_${data.clubId}`).emit('receiveMessage', message);
  });

  // Typing status
  socket.on('typing', ({ clubId, userId }) => {
    socket.to(`club_${clubId}`).emit('typing', { userId });
  });

  // Read/seen status
  socket.on('seen', async ({ clubId, messageId, userId }) => {
    await ClubChatMessage.update({ seen: true }, { where: { id: messageId } });
    io.to(`club_${clubId}`).emit('seen', { messageId, userId });
  });

  // Disconnect
  socket.on('disconnect', () => {
    // Optionally handle user disconnect
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
