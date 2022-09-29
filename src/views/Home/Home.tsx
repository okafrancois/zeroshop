import React from 'react';
import './home.scss';
import {Link} from "react-router-dom";
import {apiUrl} from "../../config";

const Home: React.FC = () => {
    return (
        <div className={"home-view container"}>
            <div className="cover">
                <img src={`${apiUrl}/uploads/zero_shop_image_e21c3d96ac.jpg`} alt=""/>
            </div>
            <div className="content">
                <h1 className={"title"}>Find the <br/> best collections</h1>
                <p className={"subtitle"}>Get your dream item easily with Klarna and get other interesting offers</p>
                <div className="actions">
                    <button className={"btn --framed"}>Sign Up</button>
                    <button className={"btn --primary"}>Log In</button>
                </div>
            </div>
            <div className="cta">
                <Link to={"/shop"}>Continue as <span className={"link-btn"}>guest</span></Link>
            </div>
        </div>
    );
};

export default Home;
