import React from 'react';

function Editor({ title, setTitle, content, setContent }) {
  return (
    <div className="editor">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}

export default Editor;