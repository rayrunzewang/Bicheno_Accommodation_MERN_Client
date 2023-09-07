import React, { useState } from 'react'
import { useEffect } from 'react';
import './ContactEdit.css'

const ContactEdit = () => {
  const [contact, setContact] = useState([]);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    alternativePhoneNumber: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    GetContact();
  }, [])

  const GetContact = () => {
    fetch("http://localhost:3001/contact", { credentials: 'include' })
      .then(res => res.json())
      .then(data => setContact(data))
      .catch(err => console.error("Error: ", err),)
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
    };

    try {
      const response = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      });
      console.log(formData);

      if (response.ok) {
        console.log('Data submitted successfully');
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <>
      <div className='contact-edit'>
        <form onSubmit={handleSubmit}>
          <div className='contact-edit-container'>
              <div>
                <label htmlFor="phoneNumber">Phone Number 1:</label>
              </div>
              <div>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={contact.phoneNumber}
                  onChange={handleChange}
                  aria-required
                />
              </div>
              <div>
                <label htmlFor="alternativePhoneNumber">Phone Number 2:</label>
              </div>
              <div>
                <input
                  type="text"
                  id="alternativePhoneNumber"
                  name="alternativePhoneNumber"
                  defaultValue={contact.alternativePhoneNumber}
                  placeholder='(optional)'
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="address">Address:</label>
              </div>
              <div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={contact.address}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
              </div>
              <div>
                <input
                  type="text"
                  id="email"
                  name="email"
                  defaultValue={contact.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>






          <button className='contact-edit-button' type="submit">Save</button>
        </form>
      </div>



    </>
  )
}

export default ContactEdit