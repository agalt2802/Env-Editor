import React, { useState } from 'react';
import { Button } from 'reactstrap';

function DownloadButton() {
  const [selectedFile, setSelectedFile] = useState(null);

  const files = [
    { name: "commons.yaml", path: "COMMONS_PATH" },
    { name: "cronConf.yaml", path: "CRONCONF_PATH" },
    { name: "env.yaml", path: "ENV_PATH" },
    { name: "steps.yaml", path: "STEPS_PATH" },

  ];

  const handleChange = (e) => {
    const file = files.find((file) => file.name === e.target.value);
    setSelectedFile(file);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      const response = await fetch(`http://127.0.0.1:8081/download/${selectedFile.path}`);
      if (response.ok) {
        const url = URL.createObjectURL(await response.blob());
        const link = document.createElement('a');
        link.href = url;
        link.download = selectedFile.name;
        link.click();
        URL.revokeObjectURL(url);
      } else {
        alert('Error downloading file');
      }
    }
  };

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Seleziona un file</option>
        {files.map((file) => (
            <option key={file.name} value={file.name}>
            {file.name}
          </option>
        ))}
      </select>
      <Button color="primary" onClick={handleClick} disabled={!selectedFile}>
        Scarica il file
      </Button>
    </div>
  );
}

export default DownloadButton;
