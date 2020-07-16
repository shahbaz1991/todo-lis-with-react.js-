import React, { useContext } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import MyContext from '../Routing/MyContext'

function Logout() {
    const { login, changeContext, user_id } = useContext(MyContext)

    const handleClick = () => {
        axios.get('http://localhost:5000/logout', { withCredentials: true })
            .then(rsp => {
                console.log(rsp)
                changeContext(false)
                console.log("logout")
            })
            .catch(error => { console.log(error) })
    }

    return (
        <div className="logout">
            <p>Hello {user_id}</p>
            <p>To logout press the button</p>
            <button className="btn btn-danger" onClick={handleClick}>Logout</button>
            {
                (login === false) ? <Redirect exact to='/login' /> : null
            }
        </div>
    )
}

export default Logout
