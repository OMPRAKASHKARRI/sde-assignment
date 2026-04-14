const express = require('express');
const cors = require('cors');

const app = express(); // ✅ FIRST create app

// ✅ CORS (before routes)
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

// ✅ Import routes AFTER app created
const notesRoutes = require('./routes/notesRoutes');
const authRoutes = require('./routes/authRoutes');

// ✅ Use routes
app.use('/notes', notesRoutes);
app.use('/auth', authRoutes);

// ✅ Start server
app.listen(5000, () => {
  console.log('Server running on port 5000 🚀');
});