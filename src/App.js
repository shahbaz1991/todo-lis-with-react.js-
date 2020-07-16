import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import RegistrationForm from './forms/RegistrationForm'
import LoginForm from './forms/LoginForm'
import Main from './compo/Main'
import ProtectedRoute from './Routing/ProtectedRoute'
import MyContext from './Routing/MyContext'
import axios from 'axios';

function App() {
  const [login, setLogin] = useState(false)
  const [user_id, setUser_id] = useState('')

  const changeContext = () => {
    setLogin(!login)
    console.log("in_Route" + login)
  }
  const changeUser_id = (d) => {
    setUser_id(d)
  }

  useEffect(
    () => {
      function fetch() {
        axios.get('http://localhost:5000/details', { withCredentials: true })
          .then(resp => {
            console.log(resp)
            setLogin(true)
            setUser_id(resp.data.user_name)
          })
          .catch(resp => {
            console.log(resp)
          })
      }
      fetch()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
  );



  return (
    <BrowserRouter>
      <MyContext.Provider value={{ login, changeContext, user_id, changeUser_id }}>
        <div className="app">

          <div className='main'>
            <h1>Welcome<br></br> To The TO-DO LIST APP</h1>
            <p>This App will help you to remember all your future working tasks </p>
          </div>

          <div className='header'>
            <nav>
              <ul>
                <li><Link to='/register' className='link'>Register</Link></li>
                <li><Link to='/login' className='link'>Login</Link></li>
              </ul>
              <hr ></hr>
            </nav>
          </div>

          <div className='sidebar' >
            <Switch>
              <Route path='/register'>  <RegistrationForm />  </Route>
              <Route path='/login'>  <LoginForm />  </Route>

              {login ? <ProtectedRoute path='/todo' component={Main} /> : <Redirect to='login' />}
            </Switch>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter >
  );
}


export default App;
