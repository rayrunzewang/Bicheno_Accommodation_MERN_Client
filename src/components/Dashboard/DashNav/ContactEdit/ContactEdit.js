import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './ContactEdit.css'
import Button from '../BlogEdit/Button/Button';
import Message from '../BlogEdit/Message/Message';

const ContactEdit = () => {
  const [contact, setContact] = useState([]);
  const [isError, setIsError] = useState(false); 
  const [formData, setFormData] = useState({
    phoneNumber: '',
    alternativePhoneNumber: '',
    email: '',
    address: '',
    facebookURL: '',
    instagramURL: '',
  });

  const [isSaved, setIsSaved] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    GetContact();
  }, [])

  const GetContact = () => {
    fetch('http://localhost:3001/contact', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setContact(data))
      .catch(err => console.error('Error: ', err),)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = {
      phoneNumber: formData.phoneNumber || contact.phoneNumber,
      alternativePhoneNumber: formData.alternativePhoneNumber || contact.alternativePhoneNumber,
      email: formData.email || contact.email,
      address: formData.address || contact.address,
      facebookURL: formData.facebookURL || contact.facebookURL,
      instagramURL: formData.instagramURL || contact.instagramURL,
    };

    try {
      const response = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      });

      if (response.ok) {
        setIsSaved(true); 
        setIsError(false); 
      } else {
        setIsError(false); 
        console.error('Failed to submit data');
      }
    } catch (error) {
      setIsError(false); 
      console.error('Error:', error);
    }
  };

  return (

    <>
      <div className='contact-edit'>
        <form onSubmit={handleSubmit}>
          <div className='contact-edit-container'>
            <div>
              <label htmlFor='phoneNumber'>Phone Number 1:</label>
            </div>
            <div>
              <input
                type='text'
                id='phoneNumber'
                name='phoneNumber'
                defaultValue={contact.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='alternativePhoneNumber'>Phone Number 2:</label>
            </div>
            <div>
              <input
                type='text'
                id='alternativePhoneNumber'
                name='alternativePhoneNumber'
                defaultValue={contact.alternativePhoneNumber}
                placeholder='(optional)'
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='address'>Address:</label>
            </div>
            <div>
              <input
                type='text'
                id='address'
                name='address'
                defaultValue={contact.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='email'>Email:</label>
            </div>
            <div>
              <input
                type='text'
                id='email'
                name='email'
                defaultValue={contact.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='facebookURL'>facebookURL:</label>
            </div>
            <div>
              <input
                type='text'
                id='facebookURL'
                name='facebookURL'
                defaultValue={contact.facebookURL}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor='instagramURL'>instagramURL:</label>
            </div>
            <div>
              <input
                type='text'
                id='instagramURL'
                name='instagramURL'
                defaultValue={contact.instagramURL}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Button type='submit' label='Save' />
          {isSaved && <Message message='Data saved successfully'  />}
          {isError && <Message message='An error occurred' />} 
        </form>
      </div>



    </>
  )
}

export default ContactEdit