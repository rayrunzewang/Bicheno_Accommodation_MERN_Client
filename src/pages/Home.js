import React, { useEffect, useState } from 'react';
import videoBg from '../assets/homepage-video.mp4';
import { Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { GoDot, GoDotFill } from 'react-icons/go';
import './Home.css';

function Home() {
    const [contact, setContact] = useState({});
    const [properties, setProperties] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        getContact();
        getProperties();
    }, [])

    useEffect(() => {
        setSlides(properties);
    }, [properties]);

    useEffect(() => {
        console.log('Slides:', slides);
        console.log('Properties:', properties);
    }, [slides, properties]);

    const getContact = () => {
        fetch('http://localhost:3001/contact', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setContact(data))
            .catch(err => console.error('Error', err))
    }

    const getProperties = () => {
        fetch('http://localhost:3001/property')
            .then(res => res.json())
            .then(data => {
                console.log('属性数据:', data);
                setProperties(data);
            })
            .catch(error => console.error('Properties Fetch Error:', error))
    };

    const handleSlideChange = (newIndex) => {
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendEmail(formData);
    };

    const sendEmail = async (data) => {
        try {
            const response = await fetch('http://localhost:3001/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('Email sent successfully!');
            } else {
                console.error('Error sending email.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div>
            {/* Video Background */}

            <div className='video-container'>
                <video autoPlay loop muted className='video' >
                    <source src={videoBg} type='video/mp4' />
                </video>
            </div>

            {/* Social Media */}

            <div className='social-media' >
                <a
                    target='_blank'
                    href={contact.facebookURL}>
                    <FacebookIcon style={{ fontSize: '50px' }} className='my-facebook-icon' />
                </a>
                <a
                    target='_blank'
                    href={contact.instagramURL}>
                    <InstagramIcon style={{ fontSize: '50px' }} className='my-instagram-icon' />
                </a>

            </div>

            {/* Scroll Down Button */}
            <div>
                <a href='#scroll' className='scroll-down'>
                    <div className='scroll-down-button'>
                        <p className='scroll-down-detail' >
                            Scroll
                        </p>
                        <p className='scroll-down-detail' >
                            Down
                        </p>
                        <div className='scroll-down-arrow'>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </a>
            </div>

            {/* Banner  */}
            <div className='banner'>
                <h1 className='banner-title'>
                    <em>
                        <span className='banner-bicheno'>BICHENO</span>
                        <span className='banner-accommodation'>ACCOMMODATION</span>
                    </em>
                </h1>
            </div>

            {/* carousell and welcome */}
            <div className='home-page-main' id='scroll'>
                 <div className='home-page-carousel-container'>
                    <h2 className='home-page-carousel-title'>Our Accommodation</h2>

                    <div className='home-page-carousel-image-container'>
                        {slides && slides.length > 0 && <div
                            style={{ backgroundImage: `url(http://localhost:3001/${slides[currentIndex].images[0].image_url.replace(/\\/g, '/')})` }}
                            className='home-page-carousel-image'>
                        </div>}

                        {slides && slides.length > 0 &&<div className='home-page-carousel-image-left-arrow' onClick={() => handleSlideChange((currentIndex - 1 + slides.length) % slides.length)}
                            size={30}>
                            <BsChevronCompactLeft />
                        </div>}
                        {slides && slides.length > 0 &&<div className='home-page-carousel-image-right-arrow' onClick={() => handleSlideChange((currentIndex + 1) % slides.length)}
                            size={30}>
                            <BsChevronCompactRight />
                        </div>}

                        <div className='home-page-carousel-image-nav'>
                        {slides && slides.length > 0 && slides.map((slide, slideIndex) => (
                                <div
                                    key={slideIndex}
                                    onClick={() => { goToSlide(slideIndex) }}
                                    className={`home-page-carousel-slide`}
                                >
                                    {slideIndex === currentIndex ? <GoDotFill /> : <GoDot />}
                                </div>
                            ))}
                        </div>
                        <div className='home-page-carousel-description'>
                            {slides && slides.length > 0?( <p className='home-page-carousel-text'>{slides[currentIndex].description}</p>)
                            :( <p className='home-page-carousel-loading'>Loading...</p> )}
                        </div>
                    </div>
                    

                </div>
                <div className='home-page-welcome-container'>
                    <h2 className='home-page-welcome-title'> Welcome to Bicheno</h2>
                    <div className='home-page-welcome'>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis rerum vel minus assumenda qui. Provident commodi veritatis repellat officia incidunt. Sint dolorem quae architecto nobis quo! Ex voluptatem tempora amet?  </p>
                    </div>

                </div>
            </div>

            {/* contact form */}
            <div className='contact-form-container'>
                <h2 className='contact-form-title'>Enquiry Form</h2>
                <form className='contact-form' onSubmit={handleSubmit}>
                    <label className='required-input' htmlFor="name">Name:</label>
                    <input type="text" id="contact-form-name" name="name" value={formData.name} onChange={handleChange} required />

                    <label htmlFor="mobile">Mobile:</label>
                    <input type="text" id="contact-form-mobile" name="mobile" placeholder='optional' value={formData.mobile} onChange={handleChange} />

                    <label className='required-input' htmlFor="email">Email:</label>
                    <input type="text" id="contact-form-email" name="email" value={formData.email} onChange={handleChange} required />

                    <label className='required-input' htmlFor="message">Message:</label>
                    <textarea
                        id="contact-form-message"
                        name="message"
                        value={formData.message}
                        rows={10}
                        onChange={handleChange}
                        required />

                    <Button label='Send Enquiry' />

                </form>
            </div>

        </div >
    )
}

export default Home;