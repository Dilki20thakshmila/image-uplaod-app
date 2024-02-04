import React from 'react';
import ImageUploadForm from './components/ImageUploadForm';
import ImageViewer from './components/ImageViewer';

const App = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">Image Upload App</h1>
      <div className="row">
        <div className="col-md-6">
          <ImageUploadForm />
        </div>
        <div className="col-md-6">
          <ImageViewer />
        </div>
      </div>
    </div>
  );
};

export default App;
