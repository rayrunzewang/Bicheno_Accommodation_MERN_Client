import React, { useEffect, useState } from 'react';
import './FloatingBox.css';

const FloatingBox = () => {
  const [contact, setContact] = useState({});

  useEffect(() => {
    GetContact();
  }, [])

  const GetContact = () => {
    fetch('http://localhost:3001/contact', { credentials: 'include' })
        .then(res => res.json())
        .then(data => setContact(data))
        .catch(err => console.error('Error: ', err),)
  }

  function formatPhoneNumber(number) {
    const trimmedNumber = number.replace(/^0+/, '');
    const formattedNumber = '+61' + trimmedNumber;
    return formattedNumber;
  }
  


  return (
    <div className='floating-box'>
      <div className='floating-box-contact'>
        <p className='floating-box-contact-title'>Call Now</p>
        <a className='floating-box-phone' href='tel:{formatPhoneNumber(contact.phoneNumber)}'>{contact.phoneNumber}</a>
        <a className='floating-box-phone' href='tel:{formatPhoneNumber(contact.alternativephoneNumber)}'>{contact.alternativePhoneNumber}</a>
      </div>
      <div className='floating-box-book'>
        <a className='floating-box-book-btn' target='_blank' href='https://bookings8.rmscloud.com/Search/Index/f1e238f9670c6dcf/1/'>Book Now</a>
      </div>
    </div>
  );
}

export default FloatingBox;