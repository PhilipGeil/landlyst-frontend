import React, { useEffect, useState } from 'react';

function Confirm(props) {
    console.log(window.localStorage.getItem("user"))
    const [user, setUser] = useState({})
    const [dates, setDates] = useState({})
    const [rooms, setRooms] = useState({})
    const [discount, setDiscount] = useState({})

    useEffect(async () => {
        var myStorage = window.localStorage;
        setUser(props.customer)
        setDates(props.dates)
        setRooms(props.rooms)
        console.log(props)

        let temp = []

        for (let i = 0; i < props.selected.length; i++) {
            temp.push({
                id: props.selected[i]
            })
        }

        let body = {
            dates: props.dates,
            rooms: temp,
            customer: props.customer
        }

        fetch("http://localhost:8080/api/set-reservation", {
            method: 'POST',
            body: JSON.stringify(body),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => response.json().then(data => {
            console.log(data)
            setDiscount(data.Discount)
            props.setId(data)
        }))

    }, [])

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const getDates = () => {
        var s = new Date(dates.start_date)
        var e = new Date(dates.end_date)
        var start = s.toLocaleDateString('da-DK', options)
        var end = e.toLocaleDateString('da-DK', options)
        return <div>
            <span className="confirm-dates">{start}</span>
            <span className="confirm-dates"> - </span>
            <span className="confirm-dates">{end}</span>
        </div>
    }

    const roomItem = (room) => {
        return <div className="room-item">
            <img className="room-image" src="./images/room3.jpg"></img>
            <div className="room-items">
                {
                    room.Items.map(item => (
                        <p className="room-items-item">{item}</p>
                    ))
                }
            </div>
            <div className="room-info">
                <div className="room-price">
                    <p>Pris pr døgn:</p>
                    <p style={{ fontSize: '20px', fontWeight: '600' }}>{695 + room.Price + ",-"}</p>
                </div>
            </div>
        </div>
    }

    const getPrice = () => {
        console.log(discount.type !== null)
        let price = 0
        props.rooms.forEach(el => {
            price += el.Price + 695
        })
        if (discount !== null) {
            if (discount.type === "percentage") {
                console.log(price - (price / 100 * discount.number))
                price -= (price / 100 * discount.number)
            }
        }
        return price
    }


    return <div>
        <h1>Bestilling</h1>
        {getDates()}
        <div className="user-info">
            <span>{user.fname}</span>
            <span> {user.lname}</span>
            <br />
            <span>{user.address}</span>
            <br />
            <span>{user.zip_code}</span>
            <span> {user.city}</span>
            <br />
            <span>{user.email}</span>
            <br />
            <span>{user.phone}</span>
        </div>
        {
            props.rooms.map(room => (
                roomItem(room)
            ))
        }
        <h1>{"Samlet pris: " + getPrice() + " pr døgn"}</h1>
        <h2>{("Rabat " + discount.number) + (discount.type == "percentage" ? "%" : ",-")}</h2>
        <h2>{Math.round((dates.end_date - dates.start_date) / (1000 * 60 * 60 * 24)) + " Dage"}</h2>
        <h1>{"Total pris: "  + (getPrice() * Math.round((dates.end_date - dates.start_date) / (1000 * 60 * 60 * 24)))}</h1>
    </div>
}

export default Confirm