// src/components/ImageViewer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageViewer = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/images');
        setImages(response.data);
      } catch (error) {
        setError('Error fetching images');
        console.error('Error fetching images', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h2>Uploaded Images</h2>
      {error && <p>{error}</p>}
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
