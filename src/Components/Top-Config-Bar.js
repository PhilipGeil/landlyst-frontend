import React from 'react';
import { Link } from 'react-router-dom';
import './components.css';

function TopConfigBar(props) {
    console.log(props)
    if (props.user !== null && props.user !== undefined) {
        return <div className="top-config-bar">
            <span style={{marginRight: '30px'}}>{ props.user.fname }</span>
            <span onClick={() => props.setUser(null)} className="login-link">Log ud</span>
        </div>
    } else {
        return <div className="top-config-bar">
            <Link to="/login" className="login-link">Login</Link>
        </div>
    }
}

export default TopConfigBar