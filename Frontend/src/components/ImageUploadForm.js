// ImageUploadForm.js
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

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
      setUploadStatus('Upload successful');
      setFile(null); // Clear the file input field after successful upload
      console.log('Upload successful', response.data);
    } catch (error) {
      setUploadStatus('Error uploading file');
      console.error('Error uploading file', error);
    }
  };

  return (
    <Form>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Choose Image File</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <Button variant="primary" onClick={handleUpload}>
        Upload
      </Button>
      {progress > 0 && <progress value={progress} max="100" />}
      {uploadStatus && <Alert variant={uploadStatus.includes('successful') ? 'success' : 'danger'}>{uploadStatus}</Alert>}
    </Form>
  );
};

export default ImageUploadForm;
