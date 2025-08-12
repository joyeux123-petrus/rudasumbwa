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

async function runTests() {
  await testSignup();
  await testSignin();
}

runTests();
