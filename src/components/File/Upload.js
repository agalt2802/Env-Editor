import React, { useState } from 'react';
import { fetchWithCatch } from "../../commonFunctions";
import { FormGroup, Label, Input, Button } from 'reactstrap';

const FileUpload = () =>
{
  const [file, setFile] = useState(null);
  const inputId = 'fileInput';

  const handleClick = (event) =>
  {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    fetchWithCatch('/upload', {
      method: 'POST',
      body: formData,
    },
    (data) => alert(data.message), 
    (error) => alert("Si è verificato un errore durante l'upload del file"));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <FormGroup>
      <FormGroup>
        <Input id={inputId} type="file" onChange={handleFileChange} />
      </FormGroup>
      <Button onClick={handleClick}>Carica</Button>
    </FormGroup>
  );
};

export default FileUpload;
