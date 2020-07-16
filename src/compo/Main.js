import React, { useState, useContext } from 'react'
import axios from 'axios'
import Add from './Add';
import Task from './Task';
import Logout from '../forms/Logout';
import MyContext from '../Routing/MyContext';
import { Redirect } from 'react-router-dom';


function Main() {
    const { login } = useContext(MyContext)
    const [state, setState] = useState({
        arr: [],
    })
    const get_refresh = () => {
        return axios.get('http://localhost:5000/todo', { withCredentials: true })
            .then(resp => {
                setState({
                    arr: resp.data
                })

            })
            .catch(error => {
                console.log(error)
            })
    }

    return (

        <div className="todo">
            <div className="add">
                ADD
                    <Add funt={get_refresh} />
            </div>
            <div className='task_main'>
                TASK
                        <Task funt={get_refresh} arr={state.arr} />
            </div>
            <div >
                <Logout />
            </div>
            {
                login === true ? null : <Redirect exact to='/login' />
            }
        </div>
    );


}

export default Main
