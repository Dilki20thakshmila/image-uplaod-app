// ImageViewer.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, Image } from 'react-bootstrap';
import axios from 'axios';

const ImageViewer = () => {
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images', error);
    }
  };

  const handleReviewClick = () => {
    fetchImages();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleReviewClick}>
        Review Uploaded Images
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Uploaded Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {images.map((image, index) => (
            <div key={index}>
              <Image src={image.url} thumbnail />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImageViewer;
