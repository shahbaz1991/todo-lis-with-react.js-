import React, { useContext } from 'react'
import { Route } from 'react-router-dom'
import MyContext from './MyContext';
import { Redirect } from 'react-router-dom'


const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { login } = useContext(MyContext)



    return (
        <Route {...rest}
            render={props => (
                (login === true) ? < Component {...rest} /> :
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }} />
            )} />

    );
}

export default ProtectedRoute