import React, { useState } from 'react';
import axios from 'axios';
import Button from '../../../Button/Button';
import './PropertyCreate.css';

function PropertiesEdit() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
    previewFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...files]);
    previewFiles(files);
  };

  const previewFiles = (files) => {
    const previews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewURL = e.target.result;
        previews.push(previewURL);
        if (previews.length === files.length) {
          setImagePreviews([...imagePreviews, ...previews]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDelete = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const handleUpload = () => {
    const formData = new FormData();
    const imageFiles = [];
  
    selectedFiles.forEach((file) => {
      formData.append('file', file);
      imageFiles.push({
        image_name: file.name,
        image_url: URL.createObjectURL(file), 
      });
    });
  
    formData.append('title', title);
    formData.append('description', description);
    formData.append('images', JSON.stringify(imageFiles)); 
  
    axios
      .post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setSelectedFiles([]); 
        setTitle(''); 
        setDescription(''); 
        setImagePreviews([]); 
        setMessage('Upload suscessfully');
        setTimeout(() => {
          setMessage('');
        }, 3000); 
      })
      .catch((error) => {
        setMessage('Upload failed');
        console.error(error);
      });
  };
  

  return (
    <div className='images-upload-container'>
      <h1>Images Upload</h1>
      <div>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="file" multiple onChange={handleFileChange} />
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{
            border: '2px dashed #ccc',
            width: '800px',
            height: '400px',
            padding: '20px',
            marginTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            overflow: 'auto',
          }}
        >
          Drop your images here
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              style={{
                flex: '0 0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                marginRight: '10px',
                marginBottom: '10px',
                position: 'relative',
              }}
            >
              <img style={{ height: '100px' }} src={imagePreviews[index]} alt={file.name} />
              <button
                onClick={() => handleDelete(index)}
                style={{
                  width: '15px',
                  height: '15px',
                  fontSize: '15px',
                  padding: '0px',
                  margin: '0px auto',
                  color: 'black',
                  borderRadius: '0px',
                  position: 'absolute',
                  right: '1px',
                  top: '1px',
                  background: '#fff',
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
      <p>{message}</p>
      <Button onClick={handleUpload} label='Upload' />
    </div>
  );
}

export default PropertiesEdit;
