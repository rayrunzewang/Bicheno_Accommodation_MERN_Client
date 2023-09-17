import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../../Button/Button';
import Message from '../../../Message/Message';
import './PropertyEditDetail.css';

const PropertyEditDetail = (props) => {
    const [property, setProperty] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [successMessage, setSuccessMessage] = useState(false);
    const [failMessage, setFailMessage] = useState(false);

    //get property data and images files
    useEffect(() => {

        
        console.log(imagePreviews);
        console.log(selectedFiles);

        axios.get(`http://localhost:3001/property/${props.property}`)
            .then(response => {
                if (response.data && response.data.document) {
                    setProperty(response.data.document);
                    const imageUrls = response.data.document.images.map(image => image.image_url);
                    const promises = imageUrls.map(url => getImageDataAsBase64(`http://localhost:3001/${url}`));//Get image files
                    Promise.all(promises)//Need to wait for multiple asynchronous operations to complete before performing some actions.
                        .then(base64Images => {
                            //Convert base64Images to file objects
                            const files = base64Images.map((base64, index) => {
                                const blob = dataURItoBlob(base64);
                                return new File([blob], `image${index}.jpg`, { type: 'image/jpeg' });
                            });

                            setImagePreviews([...base64Images]);//update selectedFiles
                            setSelectedFiles([...files]);
                        })
                        .catch(error => console.error('Error converting images to base64:', error));
                } else {
                    console.error('Invalid response data:', response.data);
                }
            })
            .catch(error => console.error(error));
    }, [props.property]);

    //Helper function to convert data to Blob
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    const getImageDataAsBase64 = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    // The improved one:
    // const getImageDataAsBase64 = async (url) => {
    //     console.log('Fetching image data for the URL:', url);
    //     const response = await fetch(url);
    //     if (!response.ok) {
    //         console.error('Failed to fetch image data, URL: ', url);
    //         return null;
    //     }

    //     const blob = await response.blob();
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             const base64Data = reader.result
    //             console.log('Base64 Data:', base64Data);
    //             resolve(base64Data);
    //         };
    //         reader.onerror = reject;
    //         reader.readAsDataURL(blob);
    //     });
    // };


    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setSelectedFiles([...selectedFiles, ...files]);

        previewFiles(files);
    }

    const previewFiles = (files) => {
        const previews = [];
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewURL = e.target.result;
                console.log(e.target.result);
                previews.push(previewURL);
                if (previews.length === files.length) {
                    setImagePreviews([...imagePreviews, ...previews]);
                }
            };
            reader.readAsDataURL(file);
        });
    }



    const handleImageDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
    };

    const handleImageDrop = (e, targetIndex) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData('text/plain');

        const updatedFiles = [...selectedFiles];
        const updatedPreviews = [...imagePreviews];

        const [draggedFile] = updatedFiles.splice(draggedIndex, 1);
        const [draggedPreview] = updatedPreviews.splice(draggedIndex, 1);

        updatedFiles.splice(targetIndex, 0, draggedFile);
        updatedPreviews.splice(targetIndex, 0, draggedPreview);

        setSelectedFiles(updatedFiles);
        setImagePreviews(updatedPreviews);
    };

    const handleDelete = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
        const updatedPreviews = [...imagePreviews];
        updatedPreviews.splice(index, 1);
        setImagePreviews(updatedPreviews);
        console.log(successMessage, failMessage)
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();

        selectedFiles.forEach((file) => {
            formData.append('file', file);
        });

        formData.append('title', property.title);
        formData.append('address', property.address);
        formData.append('bed', property.bed);
        formData.append('toliet', property.toliet);
        formData.append('carspace', property.carspace);
        formData.append('description', property.description);

        axios
            .put(`http://localhost:3001/property/${props.property}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log('Property updated secessfully:', response.data);
                setSuccessMessage(true);
                setFailMessage(false);
            })
            .catch((error) => {
                console.error('Failed to update property:', error);
                setSuccessMessage(false)
                setFailMessage(true);
            });

    };

    const deleteProperty = async (propertyId) => {
        try {
            const res = await fetch(`http://localhost:3001/property/${propertyId}`, {
                method: 'DELETE',
                credential: 'include'
            })
            if (res.ok) {
                setSuccessMessage(true)
                setFailMessage(false);
            } else {
                setSuccessMessage(false)
                setFailMessage(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteProperty = async () => {
        if (window.confirm('Are you sure you want to delet this property?')) {//change to a better UI confirm
            try {
                await deleteProperty(props.property);
            } catch (error) {
                console.error(error)
            }
        }
    };

    if (!property) {
        return null;
    }

    return (
        <>
            <div className='property-edit-container'>
                <form onSubmit={handleUpdate}>
                    <h1>Property Update</h1>
                    <div>
                        <div>
                            <input className='property-edit-title' id='property-edit-title' type="text" placeholder='Title (required*)' value={property.title} required onChange={(e) => setProperty({ ...property, title: e.target.value })} />
                        </div>
                        <div className='property-edit-facilities'>
                            <div>
                                <label htmlFor="property-edit-bed">bed</label>
                                <input className='property-edit-bed' id='property-edit-bed' type='number' min='0' value={property.bed} required onChange={(e) => setProperty({ ...property, bed: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="property-edit-toliet">toliet</label>
                                <input className='property-edit-toliet' id='property-edit-toliet' type='number' min='0' value={property.toliet} required onChange={(e) => setProperty({ ...property, toliet: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="property-edit-carspace">car space</label>
                                <input className='property-edit-carspace' id='property-edit-carspace' type='number' min='0' value={property.carspace} required onChange={(e) => setProperty({ ...property, carspace: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <input className='property-edit-address' id='property-edit-address' type="text" placeholder='Address (required*)' value={property.address} required onChange={(e) => setProperty({ ...property, address: e.target.value })} />
                        </div>
                        <div>
                            <input className='property-edit-description' id='property-edit-description' type="text" placeholder='Description (required*)' value={property.description} required onChange={(e) => setProperty({ ...property, description: e.target.value })} />
                        </div>
                        <div className='images-edit-upload-area'
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <p className='placeholder-text'>Drop images here</p>
                        </div>
                        <p className='images-edit-selected-area-description'>
                            Sort the images below before uplodaing, with the cover image placed at the first position.</p>
                        <div className='images-edit-selected-area'>
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
                                    <button type='button' className='images-selected-image-delete' onClick={() => handleDelete(index)} >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button label='Save' />
                </form>
                <Button onClick={handleDeleteProperty} label='Delete' />
                {successMessage && <Message message={'Updated secessfully, click Ok to reload the page'} />}
                {failMessage && <Message message={'Updated failed, an error occurred'} />}
            </div>
        </>
    )
};

export default PropertyEditDetail;