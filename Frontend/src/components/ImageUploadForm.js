import React, { useState } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(percentage);
        },
      });
      setMessage('Upload successful');
      console.log('Upload successful', response.data);
    } catch (error) {
      setMessage('Error uploading file');
      console.error('Error uploading file', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <ProgressBar now={progress} label={`${progress}%`} />
      <p>{message}</p>
    </div>
  );
};

export default ImageUploadForm;
