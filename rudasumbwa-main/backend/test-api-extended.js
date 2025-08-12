const axios = require('axios');

const apiBase = 'http://localhost:3000/api';

async function testSignup() {
  try {
    const response = await axios.post(apiBase + '/auth/signup', {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'TestPass123'
    });
    console.log('Signup response:', response.data);
  } catch (error) {
    console.error('Signup error:', error.response ? error.response.data : error.message);
  }
}

async function testSignin() {
  try {
    const response = await axios.post(apiBase + '/auth/signin', {
      email: 'testuser@example.com',
      password: 'TestPass123'
    });
    console.log('Signin response:', response.data);
  } catch (error) {
    console.error('Signin error:', error.response ? error.response.data : error.message);
  }
}

async function testLeaderboardGet() {
  try {
    const response = await axios.get(apiBase + '/leaderboard/');
    console.log('Leaderboard GET response:', response.data);
  } catch (error) {
    console.error('Leaderboard GET error:', error.response ? error.response.data : error.message);
  }
}

async function testLeaderboardPost() {
  try {
    const response = await axios.post(apiBase + '/leaderboard/', {
      name: 'Test User',
      grade: 'A',
      rank: 1,
      medal: 'Gold',
      info: 'Top scorer'
    });
    console.log('Leaderboard POST response:', response.data);
  } catch (error) {
    console.error('Leaderboard POST error:', error.response ? error.response.data : error.message);
  }
}

async function testEventsGet() {
  try {
    const response = await axios.get(apiBase + '/events/');
    console.log('Events GET response:', response.data);
  } catch (error) {
    console.error('Events GET error:', error.response ? error.response.data : error.message);
  }
}

async function testEventsPost() {
  try {
    const response = await axios.post(apiBase + '/events/', {
      title: 'Test Event',
      date: '2024-01-01',
      description: 'This is a test event'
    });
    console.log('Events POST response:', response.data);
  } catch (error) {
    console.error('Events POST error:', error.response ? error.response.data : error.message);
  }
}

async function testClubsGet() {
  try {
    const response = await axios.get(apiBase + '/clubs/');
    console.log('Clubs GET response:', response.data);
  } catch (error) {
    console.error('Clubs GET error:', error.response ? error.response.data : error.message);
  }
}

async function testClubsPost() {
  try {
    const response = await axios.post(apiBase + '/clubs/', {
      name: 'Test Club',
      description: 'This is a test club'
    });
    console.log('Clubs POST response:', response.data);
  } catch (error) {
    console.error('Clubs POST error:', error.response ? error.response.data : error.message);
  }
}

async function testNewsGet() {
  try {
    const response = await axios.get(apiBase + '/news/');
    console.log('News GET response:', response.data);
  } catch (error) {
    console.error('News GET error:', error.response ? error.response.data : error.message);
  }
}

async function testNewsPost() {
  try {
    const response = await axios.post(apiBase + '/news/', {
      title: 'Test News',
      content: 'This is a test news content'
    });
    console.log('News POST response:', response.data);
  } catch (error) {
    console.error('News POST error:', error.response ? error.response.data : error.message);
  }
}

async function runTests() {
  await testSignup();
  await testSignin();
  await testLeaderboardGet();
  await testLeaderboardPost();
  await testEventsGet();
  await testEventsPost();
  await testClubsGet();
  await testClubsPost();
  await testNewsGet();
  await testNewsPost();
}

runTests();
