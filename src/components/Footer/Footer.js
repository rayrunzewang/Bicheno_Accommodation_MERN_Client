import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom"


const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer-container">
                    <div className="column">
                        <address>
                            <h4>Contact</h4>
                            <p>Call: <a href="tel:+61363751400">03 6375 1400</a></p>
                            <p>Call: <a href="tel:+61403331845">04 0333 1845</a></p>
                            <p>Email: accommodation@bicheno.com.au</p>
                            <p>Address: 73b Burgess St, Bicheno TAS 7215</p>
                        </address>
                    </div>
                    <div className="column">
                        <h4>Follow us</h4>
                        <p><a href="#">Facebook</a></p>
                        <p> <a href="#">Instagram</a></p>
                    </div>
                    <div className="column">
                        <h4>Team</h4>
                        <p>
                            <Link to="/private">Staff Login</Link>
                        </p>
                    </div>
                </div>
                <p className="baysidetechstudio">&copy; Copyright 2023 <a target="_blank" href="https://www.baysidetechstudio.com">Bayside Tech Studio</a>. All Rights Reserved.</p>

            </footer>
            <div>
                <Routes>
                    {/* <Route path="/private" element={<Navigate to="/private" />} /> */}
                </Routes>
            </div>
        </>

    )
}

export default Footer