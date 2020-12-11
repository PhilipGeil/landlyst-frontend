import React from 'react'
import Navbar from '../Components/Navbar'
import TopConfigBar from '../Components/Top-Config-Bar'
import './Frontpage.css';
import { useHistory } from "react-router-dom";

function Frontpage(props) {
    const history = useHistory();

    function navigate(path) {
        history.push(path);
    }
    return <div className="frontpage">
        <TopConfigBar user={props.user} setUser={props.setUser}></TopConfigBar>
        <Navbar></Navbar>
        <div className="greeting">
            <h1 className="greeting-text h1">Velkommen til Landlyst kro og hotel</h1>
            <h2 className="greeting-text h2">Hyggeligt hotel med beliggenhed i det sydfynske landskab</h2>
        </div>
        <div className="images-container">
            <div className="images">
                <img className="images-item" src="/images/room1.jpg"></img>
                <img className="images-item" src="/images/room2.jpg"></img>
                <img className="images-item" src="/images/room3.jpg"></img>
            </div>
            <div className="images-booking">
                <div className="images-booking-items">
                    <button className="booking-button" onClick={() => {
                        navigate("/booking")
                    }}>Book nu</button>
                    <h3 className="booking-text">Priser fra 695,- pr døgn</h3>
                </div>
            </div>
        </div>
        <div className="greeting">
            <h1 className="greeting-text h1">Nyheder</h1>
        </div>
    </div>
}

export default Frontpage