// FileUpload.js
import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const submitFile = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://127.0.0.1:8081/upload', {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(data => alert(data.message))
      .catch(error => alert("Si è verificato un errore durante l'upload del file"));
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <form onSubmit={submitFile}>
      <label>Carica il tuo file:</label>
      <input type="file" onChange={handleFileUpload} />
      <button type="submit">Carica</button>
    </form>
  );
};

export default FileUpload;
