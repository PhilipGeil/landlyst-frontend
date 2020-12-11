import React, { useEffect, useState } from 'react';

function Information(props, test) {
    const [user, setUser] = useState({})


    useEffect(() => {
        console.log(props.signedInUser)
        if (props.customer !== null && Object.keys(props.customer).length !== 0) {
            setUser(props.customer)
            console.log("It just don't work")
        } else if (props.signedInUser !== null && props.signedInUser !== undefined) {   
            let body = { "zip_code": String(props.signedInUser.zip_code) }
            fetch("http://localhost:8080/api/zip-code", {
                method: 'POST',
                body: JSON.stringify(body),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).catch(e => console.log(e)).then(response => response.json().catch(e => console.log(e)).then(data => {
                console.log(data)
                document.getElementById("city").value = data.City

                let u = props.signedInUser
                u.city = data.City
                u.zip_code = String(props.signedInUser.zip_code)
                setUser(u)
                props.setCustomer(u)
            })).catch(e => console.log(e))
        }

        console.log(props)

        document.getElementById("zip").addEventListener('change', zip_code)
        document.getElementById("fname").addEventListener('change', (event) => {
            let u = user
            u.fname = event.target.value
            setUser(u)
            props.setCustomer(user)
        })
        document.getElementById("lname").addEventListener('change', (event) => {
            let u = user
            u.lname = event.target.value
            setUser(u)
            props.setCustomer(user)
        })
        document.getElementById("address").addEventListener('change', (event) => {
            let u = user
            u.address = event.target.value
            setUser(u)
            props.setCustomer(user)
        })
        document.getElementById("phone").addEventListener('change', (event) => {
            let u = user
            u.phone = event.target.value
            setUser(u)
            props.setCustomer(user)
        })
        document.getElementById("email").addEventListener('change', (event) => {
            let u = user
            u.email = event.target.value
            setUser(u)
            props.setCustomer(user)
        })
    }, [user])


    const zip_code = (event) => {
        if (event.target.value.length === 4) {
            console.log(event.target.value)
            let body = { "zip_code": event.target.value }
            // console.log(JSON.stringify(body))
            try {
                fetch("http://localhost:8080/api/zip-code", {
                    method: 'POST',
                    body: JSON.stringify(body),
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }).catch(e => console.log(e)).then(response => response.json().catch(e => console.log(e)).then(data => {
                    console.log(data)
                    document.getElementById("city").value = data.City

                    let u = user
                    u.zip_code = event.target.value
                    u.city = data.City
                    setUser(u)
                })).catch(e => console.log(e))

            } catch (error) {
                console.log(error)
            }
        }
    }


    return <div className="information">
        <form className="information-form">
            <input id="fname" type="text" name="fname" placeholder="Fornavn" defaultValue={user.fname !== null ? user.fname : null}></input>
            <input id="lname" type="text" name="lname" placeholder="Efternavn" defaultValue={user.lname !== null ? user.lname : null}></input>
            <input id="zip" type="text" name="zip_code" placeholder="Postnummer" maxlength="4" defaultValue={user.zip_code !== null ? user.zip_code : null}></input>
            <input id="city" type="text" name="city" placeholder="By" disabled={true} defaultValue={user.city !== null ? user.city : null}></input>
            <input id="address" type="text" name="address" placeholder="Addresse" defaultValue={user.address !== null ? user.address : null}></input>
            <input id="phone" type="text" name="phone" placeholder="Mobil nr" defaultValue={user.phone !== null ? user.phone : null}></input>
            <input id="email" type="text" name="email" placeholder="Email" defaultValue={user.email !== null ? user.email : null}></input>
        </form>
    </div>
}

export default Information