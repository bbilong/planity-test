import React, { useState } from 'react';

import './FileUpload.css';

const FileUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        if (!file) {
            setError('No file selected');
            return;
        }
        setError(null);
        setProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'http://localhost:5858/upload', true);

        // Mise à jour de la progression
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                setProgress(percentComplete);
            }
        };

        // Gestion de la réponse
        xhr.onload = () => {
            if (xhr.status === 200) {
                const blob = new Blob([xhr.response], { type: 'application/zip' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'result.zip';
                a.click();
                setProgress(100);
            } else {
                setError('File upload failed');
            }
        };

        // Gestion des erreurs
        xhr.onerror = () => {
            setError('An error occurred during file upload');
        };

        // Envoi des données
        xhr.send(formData);
    };

    return (
      <div>
          <h1>Upload Your CSV</h1>
          <label htmlFor="file-upload">Choose File</label>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
          {file && <p className="file-name">Selected File: {file.name}</p>}
          <button onClick={handleSubmit} disabled={!file}>
              Upload
          </button>
          {progress > 0 && (
            <div>
                <progress value={progress} max="100" />
                <span>{progress}%</span>
            </div>
          )}
          {error && <p className="error">{error}</p>}
      </div>
    );
};

export default FileUpload;