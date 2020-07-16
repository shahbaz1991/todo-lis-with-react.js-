import React, { useState, useContext } from 'react'
import axios from 'axios'
import MyContext from '../Routing/MyContext'
import { Redirect } from 'react-router-dom'

export default function LoginForm() {
    const { login, changeContext, changeUser_id } = useContext(MyContext)

    const [state, setState] = useState({
        email: '',
        password: '',
        error: null
    })
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prev => ({
            ...prev, [id]: value
        }))
    }
    console.log('login')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/login', state, { withCredentials: true })
            .then(resp => {
                setState({ ...state, error: false })
                console.log(resp)
                changeContext()
                changeUser_id(resp.data.user_name)
                //userredirect(login)
            })
            .catch(error => {
                console.log(error)
                setState({
                    ...state, error: true
                })
            })
    }
    /*function userredirect(login) {
        if (login === true) {
            console.log("Redirect")
            return <Redirect exact to={'/todo'} />
        }
        else {
            console.log("Login")
            return <Redirect exact to={'/login'} />
        }
    }*/

    return (
        <div>
            <form className='formInp' onSubmit={handleSubmit}>
                Email:<br></br>
                <input type='text' id='email' value={state.email} onChange={handleChange} /><br></br>
                Password:<br></br>
                <input type='password' id='password' value={state.password} onChange={handleChange} /><br></br>
                <button id='login_but' type='submit'>Login</button>
            </form>
            {console.log(login)}
            {
                (login === true) ? <Redirect exact to={'/todo'} /> : null
            }

            {
                state.error ? <p>Unauthorised</p> : null
            }
        </div>
    )
}

