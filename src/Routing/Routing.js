import React, { useState } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import RegistrationForm from '../forms/RegistrationForm'
import LoginForm from '../forms/LoginForm'
import Main from '../compo/Main'
import ProtectedRoute from './ProtectedRoute'
import MyContext from './MyContext'


export default function Routing() {
    const [login, setLogin] = useState(false)

    const changeContext = () => {
        setLogin(!login)
        console.log("in_Route" + login)
    }

    return (
        <div>
            <header>
                <nav>
                    <ul>

                        <li><Link to='/register'>Register</Link></li>

                        <li><Link to='/login'>Login</Link></li>
                    </ul>
                </nav>
            </header>
            <sidebar>
                <MyContext.Provider value={{ login, changeContext }}>
                    <Switch>

                        <Route exact path='/register'>  <RegistrationForm />  </Route>

                        <Route exact path='/login'>  <LoginForm />  </Route>

                        <ProtectedRoute exact path='/todo' component={Main} />

                    </Switch>
                </MyContext.Provider>
            </sidebar>
        </div>
    )
}
