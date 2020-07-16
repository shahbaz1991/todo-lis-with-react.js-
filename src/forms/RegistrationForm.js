import React, { useState, useContext } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import MyContext from '../Routing/MyContext'

function RegistrationForm() {
    const { login } = useContext(MyContext)
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        status: null
    })
    console.log('register')
    const handleChange = (e) => {
        const { id, value } = e.target
        setState(prev => ({
            ...prev, [id]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (state.password === state.confirmpassword) {
            axios.post('http://localhost:5000/register', state)
                .then(resp => {

                    if (resp.status === 200) {
                        setState({
                            ...state, status: resp.status
                        })
                    }

                })
                .catch(error => {
                    console.log(error)
                    setState({
                        ...state, status: 500
                    })

                })
        }

        if (state.name === '' || state.email === '' || state.password === '') {
            setState({ ...state, status: 101 })
        }
        else {
            setState({ ...state, status: 100 })
        }
    }
    return (
        <div >
            <form className='formInp' onSubmit={handleSubmit}>
                Name:<br></br>
                <input type='text' id='name' onChange={handleChange} autoFocus /><br></br>
                Email:<br></br>
                <input type='text' id='email' onChange={handleChange} /><br></br>
                Password:<br></br>
                <input type='password' id='password' onChange={handleChange} /><br></br>
                ConfirmPassword:<br></br>
                <input type='password' id='confirmpassword' onChange={handleChange} /><br></br>
                <br></br>
                <button id='reg_but' type='submit'>Register</button>
            </form>
            {login ? <Redirect to='/todo' /> : null}
            {
                (state.status === 100) ? <p>Password Doesn't Match</p> : null
            }
            {
                (state.status === 101) ? <p>Please fill the blank</p> : null
            }
            {
                (state.status === 200) && <div><Redirect exact to={`/login`} /></div>
            }
            {
                (state.status === 500) && <div> <Redirect exact to={`/register`} /> Not Registered </div>
            }

        </div>
    )
}

export default RegistrationForm


