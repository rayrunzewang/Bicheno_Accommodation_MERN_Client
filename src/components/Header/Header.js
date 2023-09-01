import React from "react";
import { Routes, Route, NavLink } from "react-router-dom"
import Home from "../../pages/Home";
import Blog from "../../pages/Blog";
import Accommodation from "../../pages/Accommodation";
import logo from "../../assets/logo.jpg"
import styles from "./Header.css";

const Header = () => {
    return (
        <div>
            
            <header className="page-header">

                <div className="logo">
                    <img className="nav-logo" src={logo} alt="Bicheno Accommodation Business Logo" />
                </div>

                <nav>
                    <ul className="user-container">
                        <li><NavLink className="nav-link" to="/">Home</NavLink></li>
                        <li><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
                        <li><NavLink className="nav-link" to="/accommodation">Accommodation</NavLink></li>
                        <li><a
                            className="nav-link"
                            href="https://bookings8.rmscloud.com/Search/Index/f1e238f9670c6dcf/1/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Booking</a></li>
                    </ul>
                </nav>

            </header>


            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/accommodation" element={<Accommodation />} />
            </Routes>

        </div>
    );
};

export default Header;