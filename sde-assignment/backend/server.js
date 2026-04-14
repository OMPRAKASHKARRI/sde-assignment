const express = require('express');
const cors = require('cors');

const app = express(); // ✅ FIRST create app

// ✅ CORS (before routes)

app.use(cors({
  origin: '*'
}));

app.use(express.json());

// ✅ Import routes AFTER app created
const notesRoutes = require('./routes/notesRoutes');
const authRoutes = require('./routes/authRoutes');

// ✅ Use routes
app.use('/notes', notesRoutes);
app.use('/auth', authRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});