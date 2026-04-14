import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getNotes, createNote, updateNote, deleteNote } from './api/notesApi';
import NotesList from './components/NotesList';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/App.css';

function MainApp() {
  const token = localStorage.getItem('token');

  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // 🌙 Dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // 📥 Fetch notes
  useEffect(() => {
    if (token) fetchNotes();
  }, [token]);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = async () => {
    const res = await createNote({ title: 'New Note', content: '' });
    await fetchNotes();

    setSelected({ id: res.data.id, title: 'New Note', content: '' });
    setTitle('New Note');
    setContent('');
  };

  const handleSelect = (note) => {
    setSelected(note);
    setTitle(note.title);
    setContent(note.content);
  };

  // ⚡ FAST AUTO-SAVE (300ms + indicator)
  useEffect(() => {
  if (!selected) return;

  setSaving(true);

  const timer = setTimeout(async () => {
    try {
      console.log("Saving note...", selected.id);

      await updateNote(selected.id, { title, content });

      console.log("Saved successfully ✅");
      setSaving(false);
    } catch (err) {
      console.error("Save failed ❌", err);
      setSaving(false);
    }
  }, 300);

  return () => clearTimeout(timer);
}, [title, content, selected]);
  const handleDelete = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  // 🔐 Auth check
  if (!token) return <Login />;

  return (
    <div className="container">

      {/* SIDEBAR */}
      <div className="sidebar">

        <button onClick={toggleDarkMode}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button onClick={handleLogout}>Logout</button>

        <button onClick={handleCreate}>+ New Note</button>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 💾 Saving indicator */}
        <p>{saving ? "Saving..." : "Saved ✅"}</p>

        <NotesList
          notes={filteredNotes}
          onSelect={handleSelect}
          onDelete={handleDelete}
        />
      </div>

      {/* MAIN */}
      <div className="main">
        <div className="editor-container">
          <Editor
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
          />
          <Preview content={content} />
        </div>
      </div>

    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;