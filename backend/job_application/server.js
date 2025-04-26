const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Database = require('better-sqlite3');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
const db = new Database('applications.db');
db.prepare(`
  CREATE TABLE IF NOT EXISTS job_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    email TEXT,
    mobile TEXT,
    dob TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    pincode TEXT,
    resume TEXT,
    submittedAt TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();
app.post('/api/apply', (req, res) => {
  const { fullName, email, mobile, dob, city, state, country, pincode, resume } = req.body;

  try {
    const stmt = db.prepare(`
      INSERT INTO job_applications 
      (fullName, email, mobile, dob, city, state, country, pincode, resume)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(fullName, email, mobile, dob, city, state, country, pincode, resume);

    console.log(`✅ New application from ${fullName}`);
    res.status(200).json({ message: 'Application stored successfully!' });
  } catch (err) {
    console.error('❌ DB Error:', err.message);
    res.status(500).json({ message: 'Failed to save application' });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
app.get('/api/applications', (req, res) => {
    const apps = db.prepare('SELECT * FROM job_applications ORDER BY submittedAt DESC').all();
    res.json(apps);
  });
