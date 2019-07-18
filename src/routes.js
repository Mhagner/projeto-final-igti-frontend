import React from 'react'

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { isAutentication } from './funcoes/services'

import App from './App'
import Grupo from './pages/grupo'
import Login from './pages/login'
import Tamplate from './layout/tamplate'
import Transacao from './pages/transacao'

const PrivateRouter = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAutentication() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
    )} />
)

const renderRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <PrivateRouter path='/app' component={App} />
            <PrivateRouter path='/grupo' component={Grupo} />
            <PrivateRouter path='/transacao' component={Transacao} />
        </Switch>
    </BrowserRouter>
)

export default renderRoute