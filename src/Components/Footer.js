import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return <div className="footer">
        <div className="footer-logo">
            <img className="footer-logo-img" src="./images/Logo.png"></img>
        </div>
        <div className="footer-information">
            <p className="footer-info-text">Landlyst kro og hotel</p>
            <p className="footer-info-text">Helnæsvej 4, 5683 Haarby</p>
            <p className="footer-info-text">64 77 14 75</p>
            <p className="footer-info-text">info@landlyst.dk</p>
            <p className="footer-info-text">CVR: 29271879</p>
        </div>
        <div className="footer-options">
            <Link className="footer-option-link">Oversigt</Link>
            <Link className="footer-option-link">Hotellet</Link>
            <Link className="footer-option-link">Restauranten</Link>
            <Link className="footer-option-link">Området</Link>
            <Link className="footer-option-link">Booking</Link>
            <Link className="footer-option-link">Kontakt</Link>
            <Link className="footer-option-link">Hjælp</Link>
            <Link className="footer-option-link">Privatlivspolitik</Link>
        </div>
    </div>
}

export default Footer;