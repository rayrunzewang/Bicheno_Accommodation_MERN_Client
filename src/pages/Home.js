import React from "react";
import videoBg from "../assets/homepage-video.mp4";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import "./Home.css";


function Home() {
    return (
        <div>
            {/* vVdeo Background */}

            <div className="video-container">
                <video autoPlay loop muted className="video" >
                    <source src={videoBg} type="video/mp4" />
                </video>
            </div>

            {/* Social Media */}

            <div class="social-media" >
                <a
                    target="_blank"
                    href="https://www.facebook.com/bichenoaccommodation">
                    <FacebookIcon style={{ fontSize: '50px' }}  className="my-facebook-icon" />
                </a>
                <a
                    target="_blank"
                    href="https://www.instagram.com/bichenoaccommodation/">
                    <InstagramIcon style={{ fontSize: '50px' }}  className="my-instagram-icon" />
                </a>
                
            </div>

            {/* Scroll Down Button */}
            <div>
                <a href="#scroll" class="scroll-down">
                    <div class="scroll-down-button">
                        <p class="scroll-down-detail" >
                            Scroll
                        </p>
                        <p class="scroll-down-detail" >
                            Down
                        </p>
                        <div class="scroll-down-arrow">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </a>
            </div>

            {/* Banner  */}

            <div class="banner">
                <h1 class="banner-title">
                    <em>
                        <span class="banner-bicheno">BICHENO</span>
                        <span class="banner-accommodation">ACCOMMODATION</span>
                    </em>
                </h1>
            </div>

            {/* scroll down */}
            <a href="#scroll" class="scroll-down">
                <div class="scroll-down-button">
                    <p class="scroll-down-detail" >
                        Scroll
                    </p>
                    <p class="scroll-down-detail" >
                        Down
                    </p>
                    <div class="scroll-down-arrow">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </a>


        </div>
    )
}

export default Home;