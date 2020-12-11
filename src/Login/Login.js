import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../Components/Navbar'
import TopConfigBar from '../Components/Top-Config-Bar'
import './Login.css'

function Login(props) {
    const history = useHistory();

    const navigate = (path) => {
        history.push(path);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let email = document.getElementById("email")
        let pass = document.getElementById("pass")

        let body = {
            email: email.value,
            password: pass.value
        }

        fetch("http://localhost:8080/api/login", {
            method: 'POST',
            body: JSON.stringify(body),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => response.json().then(data => {
            if (data.Response === "Succes") {
                props.setUser(data.User)
                navigate("/")
            }
        }))
    }

    return <div className="login">
        <TopConfigBar user={props.user} setUser={props.setUser}></TopConfigBar>
        <Navbar></Navbar>
        <div className="login-body">
            <div className="regular-login">
                <div className="regular-login-options">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input id="email" className="login-input" type="text" placeholder="Email"></input>
                        <br></br>
                        <input id="pass" className="login-input" type="password" placeholder="Adgangskode"></input>
                        <br></br>
                        <input className="login-submit" type="submit" value="Login"></input>
                    </form>
                    <br></br>
                    <p>Har du ikke en bruger? Så <Link className="create-new-link" to="/create-new">opret ny bruger</Link> her </p>
                </div>
            </div>
            <div className="vertical-divider"></div>
            <div className="alternative-logins">
                <div className="alternative-login-buttons">
                    <button className="alternative-login-btn fb">Continue with Facebook</button>
                    <br></br>
                    <button className="alternative-login-btn google">Sign in with Google</button>
                    <br></br>
                    <button className="alternative-login-btn twitter">Sign in with Twitter</button>
                </div>
            </div>
        </div>
        <p>Har du glemt dit login? Så tryk <Link className="forgot-pass-link">her</Link></p>
    </div>
}

export default Login