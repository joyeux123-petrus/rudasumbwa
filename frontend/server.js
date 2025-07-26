const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST /signup endpoint
app.post('/signup', async (req, res) => {
  const { name, email, role, className, district, parish, subject, districtTeacher } = req.body;
  let extraInfo = '';
  if (role === 'student') {
    extraInfo = `<b>Class:</b> ${className}<br><b>District:</b> ${district}<br><b>Parish:</b> ${parish}<br>`;
  } else if (role === 'teacher') {
    extraInfo = `<b>Subject:</b> ${subject}<br><b>District:</b> ${districtTeacher}<br>`;
  }
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer re_M4GNMbzE_PTpCCTvhha5go3wcMpB9wPWT',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'no-reply@rudasumbwa.rw',
        to: 'joyeuxpierreishimwe@gmail.com',
        subject: 'New Sign Up Request',
        html: `<b>Name:</b> ${name}<br><b>Email:</b> ${email}<br><b>Role:</b> ${role}<br>${extraInfo}<b>Requesting approval to join Petit Séminaire Saint Léon Kabgayi.`
      })
    });
    if (response.ok) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, error: 'Failed to send sign up request.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: 'Error sending request.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
