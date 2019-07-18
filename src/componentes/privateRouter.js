import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAutentication } from '../funcoes/services'

const autenticado = isAutentication()

const PrivateRouter = ({ component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        autenticado ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location }}} />
        )
    )} />
)

export default PrivateRouter