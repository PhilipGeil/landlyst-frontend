import React from 'react';
import Navbar from '../Components/Navbar'
import TopConfigBar from '../Components/Top-Config-Bar'
import './Booking.css'
import ColorlibStepIcon from './Stepper';
import Summary from './Summary';

function Booking(props) {
    return <div className="booking">
        <TopConfigBar user={props.user} setUser={props.setUser}></TopConfigBar>
        <Navbar></Navbar>
        <ColorlibStepIcon user={props.user}></ColorlibStepIcon>
        <Summary></Summary>
    </div>
}

export default Booking