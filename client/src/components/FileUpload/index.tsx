import React, { useState } from 'react';

const FileUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file) return setError('No file selected');
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('File upload failed');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'result.zip';
            a.click();
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Upload CSV</h1>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Upload</button>
            {progress > 0 && <progress value={progress} max="100" />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default FileUpload;