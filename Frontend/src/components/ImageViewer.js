// src/components/ImageViewer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageViewer = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Uploaded Images</h2>
      <div className="image-list">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.url} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageViewer;
