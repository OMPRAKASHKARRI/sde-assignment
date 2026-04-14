const db = require('../db/database');

exports.getNotes = (req, res) => {
  db.all('SELECT * FROM notes', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

exports.createNote = (req, res) => {
  const { title, content } = req.body;

  db.run(
    'INSERT INTO notes (title, content) VALUES (?, ?)',
    [title, content],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
};

exports.updateNote = (req, res) => {
  const { title, content } = req.body;

  db.run(
    'UPDATE notes SET title=?, content=? WHERE id=?',
    [title, content, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Updated' });
    }
  );
};

exports.deleteNote = (req, res) => {
  db.run('DELETE FROM notes WHERE id=?', req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Deleted' });
  });
};