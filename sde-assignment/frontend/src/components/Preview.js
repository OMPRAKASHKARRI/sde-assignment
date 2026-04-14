import React from 'react';
import ReactMarkdown from 'react-markdown';

function Preview({ content }) {
  return (
    <div className="preview">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default Preview;

