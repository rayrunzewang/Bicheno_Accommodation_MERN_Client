import React, { useState     } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom'
import Home from '../../pages/Home.js'
import Blog from '../../pages/Blog';
import Accommodation from '../../pages/Accommodation';
import logo from '../../assets/logo.jpg'
import styles from './Header.css';
import BlogDetailPage from '../../pages/BlogDetailPage.js';

const Header = () => {

    const [posts, setPosts] = useState([]);

    useState(() => {
        fetch('http://localhost:3001/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Blog Posts Fetch Error:', error))
    }, []);
    return (
        <div>

            {/* header */}
            <header className='page-header'>
                <div className='logo'>
                    <img className='nav-logo' src={logo} alt='Bicheno Accommodation Business Logo' />
                </div>
                {/* nav */}
                <nav>
                    <ul className='user-container'>
                        <li><NavLink className='nav-link' to='/'>Home</NavLink></li>
                        <li><NavLink className='nav-link' to='/public/blog'>Blog</NavLink></li>
                        <li><NavLink className='nav-link' to='/public/accommodation'>Accommodation</NavLink></li>
                        <li><a
                            className='nav-link'
                            href='https://bookings8.rmscloud.com/Search/Index/f1e238f9670c6dcf/1/'
                            target='_blank'
                            rel='noopener noreferrer'
                        >Booking</a></li>
                    </ul>
                </nav>

            </header>

            {/* route */}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/blog/*' element={<Blog />} />
                <Route path='/accommodation' element={<Accommodation />} />
                {posts.map(post => {
                    return <Route key={post._id} path={`/${post._id}`} element={<BlogDetailPage postId={post._id} />} />
                })}
            </Routes>


        </div>
    );
};

export default Header;