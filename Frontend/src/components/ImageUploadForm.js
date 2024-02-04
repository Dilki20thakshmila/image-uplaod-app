import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select an image to upload');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(percentage);
        },
      });
      toast.success('Image uploaded successfully!');
      setFile(null); // Clear the file input field after successful upload
      console.log('Upload successful', response.data);
    } catch (error) {
      toast.error('Error uploading file. Please try again later.');
      console.error('Error uploading file', error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div>
      <ToastContainer /> {/* ToastContainer for displaying toast messages */}
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Choose Image File</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} disabled={uploading} />
        </Form.Group>
        <Button variant="primary" onClick={handleUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
        {uploading && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress variant="determinate" value={progress} />
            <div>{`${progress}%`}</div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default ImageUploadForm;
