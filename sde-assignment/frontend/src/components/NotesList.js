import React from 'react';

function NotesList({ notes, onSelect, onDelete }) {
  return (
    <div>
      {notes.map(note => (
        <div key={note.id} className="note-item">
          <div className="note-title" onClick={() => onSelect(note)}>
  {note.title || "Untitled"}
</div>
          <button onClick={() => onDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default NotesList;