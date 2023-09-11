import React, { useEffect, useState } from 'react';
import videoBg from '../assets/homepage-video.mp4';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import './Home.css';

function Home() {
    const [contact, setContact] = useState({});

    useEffect(() => {
        getContact();
    } ,[])

    const getContact = () => {
        fetch('http://localhost:3001/contact', { credentials: 'include' })
        .then(res => res.json())
        .then(data => setContact(data))
        .catch(err => console.error('Error', err))
    }

   

    return (
        <div>
            {/* vVdeo Background */}

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




        </div>
    )
}

export default Home;