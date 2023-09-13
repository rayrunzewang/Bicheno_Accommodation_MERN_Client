import React, { useState } from 'react';
import axios from 'axios';
import Button from '../../../Button/Button';
import './PropertyCreate.css';

function PropertiesEdit() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bed, setBed] = useState('');
  const [toliet, setToliet] = useState('');
  const [carspace, setCarSpace] = useState('');
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

  const handleImageDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
  };

  const handleImageDrop = (e, targetIndex) => {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData('text/plain');

    const updatedFiles = [...selectedFiles];
    const updatedPreviews = [...imagePreviews];

    // 交换图片顺序
    // const tempFile = updatedFiles[targetIndex];
    // updatedFiles[targetIndex] = updatedFiles[draggedIndex];
    // updatedFiles[draggedIndex] = tempFile;

    // const tempPreview = updatedPreviews[targetIndex];
    // updatedPreviews[targetIndex] = updatedPreviews[draggedIndex];
    // updatedPreviews[draggedIndex] = tempPreview;

    // setSelectedFiles(updatedFiles);
    // setImagePreviews(updatedPreviews);

    // 移除被拖拽的图片
    const [draggedFile] = updatedFiles.splice(draggedIndex, 1);
    const [draggedPreview] = updatedPreviews.splice(draggedIndex, 1);

    // 插入被拖拽的图片到目标位置
    updatedFiles.splice(targetIndex, 0, draggedFile);
    updatedPreviews.splice(targetIndex, 0, draggedPreview);

    setSelectedFiles(updatedFiles);
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
    formData.append('bed', bed);
    formData.append('toliet', toliet);
    formData.append('carspace', carspace);
    formData.append('images', JSON.stringify(imageFiles));

    axios
      .post('http://localhost:3001/property', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setSelectedFiles([]);
        setTitle('');
        setDescription('');
        setBed('');
        setToliet('');
        setCarSpace('');
        setImagePreviews([]);
        setMessage('Upload successfully');
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
    <div className='property-create-container'>
      <h1>New Property Launch</h1>
      <div>
        <div>
          <input className='property-title-input' type="text" placeholder="title" value={title} required onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="property-create-bed">bed</label>
          <input className='property-create-bed' type="number" id='property-create-bed' min="1" value={bed} required onChange={(e) => setBed(e.target.value)} />
        </div>
        <div>
          <label htmlFor="property-create-toliet">toliet</label>
          <input className='property-create-toliet' type="number" id='property-create-toliet' min="0" value={toliet} required onChange={(e) => setToliet(e.target.value)} />
        </div>
        <div>
          <label htmlFor="property-create-carspace">car space</label>
          <input className='property-create-carspace' type="number" id='property-create-carspace' min="0" value={carspace} required onChange={(e) => setCarSpace(e.target.value)} />
        </div>
        <textarea className='property-description' placeholder="description" value={description} name="description" id="description" cols="30" rows="10" required onChange={(e) => setDescription(e.target.value)}></textarea>
        {/* <div>
          <label htmlFor="property-cover-image-upload">choose cover Image</label>
          <input type="file" name='property-images-upload' id='property-cover-image-upload' multiple onChange={handleFileChange} />
        </div>
        <div></div>
        <label htmlFor="property-other-images-upload">choose other Images</label>
        <input type="file" name='property-images-upload' id='property-other-images-upload' multiple onChange={handleFileChange} /> */}
        <div className='images-upload-area'
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p className='placeholder-text'>Drop images here</p>
        </div>
        <p>Sort the images below before uploading, with the cover image placed at the first position.</p>
        <div className='images-selected-area'>
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className='image-div'
              draggable
              onDragStart={(e) => handleImageDragStart(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleImageDrop(e, index)}
            >
              <img className='images-selected-image' src={imagePreviews[index]} alt={file.name} />
              <button className='images-selected-image-delete'
                onClick={() => handleDelete(index)}
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
