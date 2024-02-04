// src/App.js
import React from 'react';
import ImageUploadForm from './components/ImageUploadForm';
import ImageViewer from './components/ImageViewer';

const App = () => {
  return (
    <div className="container">
      <h1>Image Upload App</h1>
      <ImageUploadForm />
      <ImageViewer />
    </div>
  );
};

export default App;
