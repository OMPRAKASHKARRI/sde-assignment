const express = require('express');
const router = express.Router();
const db = require('../db/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = "secret123";

// REGISTER
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  db.run(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hash],
    function (err) {
      if (err) return res.status(400).json({ error: 'User exists' });
      res.json({ message: 'User created' });
    }
  );
});

// LOGIN
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email=?', [email], async (err, user) => {
    if (!user) return res.status(400).json({ error: 'Invalid' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid' });

    const token = jwt.sign({ id: user.id }, SECRET);
    res.json({ token });
  });
});

module.exports = router;