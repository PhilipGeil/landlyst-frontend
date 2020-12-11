import { Add, Done, Remove } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import './Booking.css';

function Rooms(props) {
    const [checkedFilters, setCheckedFilters] = useState([])
    const [filters, setFilters] = useState([])
    const [rooms, setRooms] = useState([])
    const [selectedRooms, setSelectedRooms] = useState([])
    const [allRooms, setAllRooms] = useState([])

    useEffect(() => {
        getRoomAdditions()
        getRooms(checkedFilters)
        getAllRooms()
        setSelectedRooms(props.selected)
    }, [selectedRooms])


    const roomItem = (room) => {
        return <div className="room-item">
            <img className="room-image" src="./images/room3.jpg"></img>
            <div className="room-items">
                {
                    room.Items.map(item => (
                        <ul className="room-items-item">{item}</ul>
                    ))
                }
            </div>
            <div className="room-selection">
                <button disabled={getNumberOfTimesSelected(room) === room.Amount} onClick={() => addRoom(room)}>
                    <Add className="button-icon"></Add>
                </button>
                <span>{getNumberOfTimesSelected(room)}</span>
                <button disabled={getNumberOfTimesSelected(room) === 0} onClick={() => removeRoom(room)}>
                    <Remove></Remove>
                </button>
            </div>
            <div className="room-info">
                <div className="rooms-left">
                    <p>Værelser tilbage</p>
                    <p>{room.Amount}</p>
                </div>
                <div className="room-price">
                    <p>Pris pr døgn:</p>
                    <p style={{ fontSize: '20px', fontWeight: '600' }}>{695 + room.Price + ",-"}</p>
                </div>
            </div>
        </div>
    }

    const addRoom = (room) => {

        let tempList = selectedRooms !== null ? selectedRooms.slice() : [];
        let roomTemp = props.rooms !== null ? props.rooms.slice() : [];
        for (let i = 0; i < room.Rooms.length; i++) {
            if (!tempList.includes(room.Rooms[i])) {
                tempList.push(room.Rooms[i])
                break
            }
        }
        console.log(tempList)
        console.log(room)
        setSelectedRooms(tempList)
        props.setSelected(tempList)
        roomTemp.push(room)
        props.setRooms(roomTemp)
    }

    const removeRoom = (room) => {
        let tempList = [];
        let roomTemp = [];
        let buffer = false;
        for (var i = 0; i < room.Rooms.length; i++) {
            if (selectedRooms.includes(room.Rooms[i]) && !buffer) {
                buffer = true;
                for (var j = 0; j < selectedRooms.length; j++) {
                    if (selectedRooms[j] !== room.Rooms[i]) {
                        tempList.push(selectedRooms[j])
                    }
                }
                setSelectedRooms(tempList)
                props.setSelected(tempList)
            }
        }
        for (let i = 0; i < props.rooms.length; i++) {
            if (props.rooms[i] !== room) {
                roomTemp.push(props.rooms[i])
            } else {
                console.log("It should work")
            }
        }
        props.setRooms(roomTemp)
    }

    const getNumberOfTimesSelected = (room) => {
        let temp = 0
        if (selectedRooms !== null) {
            selectedRooms.forEach(element => {
                if (room.Rooms.includes(element)) {
                    temp++
                }
            });
        }
        return temp
    }

    const toggleCheckbox = (index) => {
        console.log(index)
        if (!checkedFilters.includes(index)) {
            let tempList = [index]
            checkedFilters.forEach(element => {
                tempList.push(element)
            });
            setCheckedFilters(tempList)
            getRooms(tempList)
        } else {
            let tempList = []
            checkedFilters.forEach(element => {
                if (element !== index) {
                    tempList.push(element)
                }
            });
            setCheckedFilters(tempList)
            getRooms(tempList)
        }
    }

    const checkbox = (index) => {
        return <div className="checkbox" onClick={() => {
            toggleCheckbox(index)
        }}>
            <Done className={checkedFilters.includes(index) ? "checked" : "unchecked"}></Done>
        </div>
    }

    const checkboxItem = (item, index) => {
        return <div className="checkbox-item">
            {item}
            {checkbox(index)}
        </div>

    }

    const getRoomAdditions = () => {
        fetch("http://localhost:8080/api/room-additions").then(response => response.json().then(data => {
            setFilters(data)
        })).catch(e => {
            console.log(e)
            setFilters([])
        })
    }

    const getRooms = (filters) => {
        var myStorage = window.localStorage
        let dates = myStorage.getItem("dates")

        let items = []
        filters.forEach(element => {
            items.push({
                id: element + 1
            })
        })

        let body = {
            Dates: JSON.parse(dates),
            Items: items
        }

        console.log(JSON.stringify(body))

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Accept', 'application/json')
        fetch("http://localhost:8080/api/search-reservation", {
            method: 'POST',
            body: JSON.stringify(body),
            mode: 'cors',
            headers: myHeaders,
        }).then(response => response.json().then(data => {
            if (data !== null) {
                setRooms(data)
            } else {
                setRooms([])
            }

        }
        )).catch(e => {
            console.log(e)
            setRooms([])
        })
    }

    const getAllRooms = () => {
        var myStorage = window.localStorage
        let dates = myStorage.getItem("dates")

        let body = {
            Dates: JSON.parse(dates),
            Items: []
        }

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Accept', 'application/json')
        fetch("http://localhost:8080/api/search-reservation", {
            method: 'POST',
            body: JSON.stringify(body),
            mode: 'cors',
            headers: myHeaders,
        }).then(response => response.json().then(data => {
            if (data !== null) {
                setAllRooms(data)
            } else {
                setAllRooms([])
            }

        }
        )).catch(e => console.log(e))
    }

    return <div>
        <div className="filters">
            {
                filters.map((filter, index) => (
                    checkboxItem(filter.item, index)
                ))
            }
        </div>
        <div className="rooms-body">
            {
                rooms.length > 0 ? rooms.map(room => (
                    roomItem(room)
                )) : <h1>Der var desværre ingen resultater på din søgning</h1>
            }
        </div>
    </div>
}

export default Rooms