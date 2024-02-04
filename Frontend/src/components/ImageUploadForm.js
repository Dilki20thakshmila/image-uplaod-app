// src/components/ImageUploadForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(percentage);
        },
      });
      console.log('Upload successful', response.data);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <progress value={progress} max="100" />}
    </div>
  );
};

export default ImageUploadForm;
