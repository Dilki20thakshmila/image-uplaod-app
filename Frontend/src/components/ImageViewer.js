// ImageViewer.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, Image, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../index.css'; // Import component-specific styles

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
    <Container className="view-container">
      <Button variant="primary" onClick={handleReviewClick} className="review-btn">
        Review Uploaded Images
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Uploaded Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              {images.map((image, index) => (
                <Col md={4} key={index} className="image-item">
                  <Image src={image.url} thumbnail />
                </Col>
              ))}
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ImageViewer;
