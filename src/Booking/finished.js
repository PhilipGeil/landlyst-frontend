import React, { useEffect } from 'react'

function Finished(props) {
    console.log(props)
    useEffect(() => {
        fetch("http://localhost:8080/api/confirm-reservation/" + props.data.Id, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(props.data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }, [])
    return <div>
        <h1>Mange tak for din bestilling</h1>
        <h3>Du vil inden for kort tid modtage en mail, som bekræfter at din ordre er blevet godkendt</h3>
        <h3>Vi glæder os til dit besøg!</h3>
        <br></br>
        <br></br>
        <br></br>
        <h2>Du kan altid se/redigere dine bestillinger, hvis du logger ind</h2>
    </div>
}

export default Finished