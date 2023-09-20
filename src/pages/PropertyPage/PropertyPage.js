import React, { useState } from 'react';
import './PropertyPage.css';
import { Link } from 'react-router-dom';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { GoDot, GoDotFill } from 'react-icons/go';

const PropertyPage = (props) => {

    const property = props.property;

    const [currentIndex, setCurrentIndex] = useState(0);
    console.log(currentIndex);
    const slides = props.property.images;

    const handleSlideChange = (newIndex) => {
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }


    return (
        <>
            <Link className='back-button' to='/public/accommodation'>Back To Accommodations</Link>
            <div className='property-detail-page'>
                <h2 className='property-detail-title'>{property.title}</h2>
                
                <div className='property-detial-image-container'>
                    <div
                        style={{ backgroundImage: `url(http://localhost:3001/${slides[currentIndex].image_url.replace(/\\/g, '/')})` }}
                        className='property-detail-image'>
                    </div>
                    <div className='property-detial-image-left-arrow' onClick={() => handleSlideChange((currentIndex - 1 + slides.length) % slides.length)}
                        size={30}>
                        <BsChevronCompactLeft />
                    </div>
                    <div className='property-detial-image-right-arrow' onClick={() => handleSlideChange((currentIndex + 1) % slides.length)}
                        size={30}>
                        <BsChevronCompactRight />
                    </div>

                    <div className='property-detial-image-nav'>
                        {slides.map((slide, slideIndex) => (
                            <div
                                key={slideIndex}
                                onClick={() => { goToSlide(slideIndex) }}
                                className={`property-detial-image-slide`}
                            >
                                {slideIndex === currentIndex ? <GoDotFill /> : <GoDot />}
                            </div>
                        ))}
                    </div>
                </div>
                <div className='property-detail-container'>
                    <p className='property-detail-content'>{property.description}</p>
                </div>
            </div>
        </>
    )
}

export default PropertyPage