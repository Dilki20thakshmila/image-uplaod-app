// ImageUploadForm.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import '../index.css'; 

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
    <Container className="upload-container">
      <ToastContainer /> {/* ToastContainer for displaying toast messages */}
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form className="upload-form">
            <Form.Group controlId="formFile">
              <Form.Label>Choose Image File</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} disabled={uploading} />
            </Form.Group>
                  <Button variant="primary" onClick={handleUpload} disabled={uploading} style={{ backgroundColor: '#9DBC98' }}>
                    {uploading ? 'Uploading...' : 'Upload'}
                  </Button>
            {uploading && (
              <div className="upload-progress">
                <CircularProgress variant="determinate" value={progress} />
                <div>{`${progress}%`}</div>
              </div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ImageUploadForm;
