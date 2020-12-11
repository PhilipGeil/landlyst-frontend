import React from 'react';
import { Link } from 'react-router-dom';
import './components.css';
import {useHistory} from 'react-router-dom';

function Navbar() {

    const history = useHistory();

    function navigate(path) {
        history.push(path);
    }
    let links = [
        <Link className="link-item" to="/Oversigt"> Oversigt
        </Link>,
        <Link className="link-item" to="/Oversigt"> Hotellet
        </Link>,
        <Link className="link-item" to="/Oversigt"> Restauranten
        </Link>,
        <Link className="link-item" to="/Oversigt"> Området
        </Link>,
        <Link className="link-item" to="/Oversigt"> Booking
        </Link>,
        <Link className="link-item" to="/Oversigt"> Kontakt
        </Link>
    ]

    return <div className="navbar">
        <div>
            <img onClick={() => {
                navigate("/")
            }} className="logo" src="./images/Logo.png" alt="logo"></img>
        </div>
        <div className="links">
            {
                links.map(link => (
                    link
                ))
            }
        </div>
    </div>
}

export default Navbar