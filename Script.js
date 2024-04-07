const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kamal@2002',
  database: 'STORE_DB'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/submit-form', (req, res) => {
  const { name, email, phone } = req.body;

  const sql = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
  db.query(sql, [name, email, phone], (err, result) => {
    if (err) {
      console.error('Error inserting user: ' + err.stack);
      res.status(500).send('Error inserting user.');
      return;
    }

    console.log('User inserted: ' + result.insertId);
    res.status(200).send('User inserted successfully.');
  });
});

app.listen(port, () => {
  console.log(Server running at http://localhost:${port});
});