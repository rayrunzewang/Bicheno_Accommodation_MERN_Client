import React from "react";
import videoBg from "../assets/homepage-video.mp4";


function Home() {
    return (
        <div>
            <div className="video-container">
                <video autoPlay loop muted className="video" >
                    <source src={videoBg} type="video/mp4" />
                </video>
            </div>
        </div>
    )
}

export default Home;