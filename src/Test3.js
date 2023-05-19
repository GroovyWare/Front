import React, { useState } from 'react';
import mammoth from 'mammoth';

function Test3() {
  const [file, setFile] = useState();
  const [uploadStatus, setUploadStatus] = useState();
  const [html, setHtml] = useState("");

  const handleFileChange = (event) => {
    const chosenFile = event.target.files[0];
    if (chosenFile && chosenFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setFile(chosenFile);
    } else {
      setUploadStatus("Please select a .docx file");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('docxFile', file);

    try {
      const response = await fetch('http://localhost:8059/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        const filePath = await response.text();

        // Fetch the file from the server
        const fileResponse = await fetch(filePath);
        const arrayBuffer = await fileResponse.arrayBuffer();

        // Convert the file content to HTML
        const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
        const html = result.value;

        setHtml(html);
        setUploadStatus(`Upload successful.`);
      } else {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <div>{uploadStatus}</div>}
      {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );
}

export default Test3;