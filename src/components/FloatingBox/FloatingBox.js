import React from 'react';
import "./FloatingBox.css";

const FloatingBox = () => {
  return (
    <div className="floating-box">
      <div className="floating-box-contact">
        <p className="floating-box-contact-title">Call Now</p>
        <a className="floating-box-phone" href="tel:+61363751400">03 6375 1400</a>
        <a className="floating-box-phone" href="tel:+61403331845">04 0333 1845</a> 
      </div>
      <div className="floating-box-book">
        <a className="floating-box-book-btn" target="_blank" href="https://bookings8.rmscloud.com/Search/Index/f1e238f9670c6dcf/1/">Book Now</a>
      </div>
    </div>
  );
}

export default FloatingBox;