import React, { Component } from 'react'

import { notification } from 'antd'
import '../assets/css/form-login.css'
import { withRouter } from 'react-router-dom'
import { login, isAutentication, setUser } from '../funcoes/services'
import apiAuth from './../funcoes/apiAuth';

class LoginForm2 extends Component {
    constructor() {
        super()
        this.state = {
            email: undefined,
            password: undefined,
            name: undefined,
            passwordRepeat: undefined,
        }
    }

    handleClear = () => {
        this.setState({
            email: '',
            password: '',
            name: '',
            passwordRepeat: ''
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        const { email, password } = this.state

        notification.config({
            bottom: 50,
            duration: 1.8
        })

        this.setState({ loading: true })

        apiAuth.post('login/', { email, password })
            .then(response => [login(response.data.token), setUser(response.data.usuarioEmail)])
            .then(response => this.props.history.push('/app'))
            .catch(error => [
                notification.error({
                    message: 'Ops!',
                    description:
                        error.toString()//error.response.data.message.toString()
                }),
            ])
    }

    handleRegister = (e) => {
        e.preventDefault()
        const { email, password, passwordRepeat, name } = this.state

        notification.config({
            bottom: 50,
            duration: 1.8
        })

        apiAuth.post('registrar/', { email, password, passwordRepeat, name })
            .then(response => [
                notification.success({
                    message: 'Sucesso!',
                    description:
                        response.data.message.toString()
                })
            ])
            .then(resp => (this.handleClear()))
            .catch(error => [
                notification.error({
                    message: 'Ops!',
                    description:
                        error.response.data.message.toString()
                }),
            ])
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const { email, password, name, passwordRepeat, loading } = this.state
        return (
            <div className="login-wrap">
                <div className="login-html">
                    <input
                        id="tab-1"
                        type="radio"
                        name="tab"
                        className="sign-in"
                        defaultChecked
                    />
                    <label htmlFor="tab-1" className="tab">Entrar</label>
                    <input
                        id="tab-2"
                        type="radio"
                        name="tab"
                        className="sign-up" />
                    <label htmlFor="tab-2" className="tab">Registrar</label>
                    <div className="login-form">
                        <form onSubmit={this.handleLogin}>
                            <div className="sign-in-htm">
                                <div className="group">
                                    <label htmlFor="email" className="label">E-mail</label>
                                    <input
                                        value={email}
                                        onChange={this.handleChange.bind(this)}
                                        id="email"
                                        type="email"
                                        className="input"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="password" className="label">Senha</label>
                                    <input
                                        value={password}
                                        onChange={this.handleChange.bind(this)}
                                        id="password"
                                        type="password"
                                        className="input"
                                        data-type="password"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <input
                                        id="check"
                                        type="checkbox"
                                        className="check"
                                    />
                                   
                                </div>
                                <div className="group">
                                    
                                    <input
                                        type="submit"
                                        className="button"
                                        value="Entrar" />
                                </div>
                                <div className="hr"></div>
                                <div className="foot-lnk">
                                    <a href="#">Esqueceu sua senha?</a>
                                </div>
                            </div>
                        </form>
                        <form onSubmit={this.handleRegister}>
                            <div className="sign-up-htm">
                                <div className="group">
                                    <label htmlFor="name" className="label">Nome</label>
                                    <input
                                        value={name}
                                        onChange={this.handleChange.bind(this)}
                                        id="name"
                                        type="text"
                                        className="input"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="password" className="label">Senha</label>
                                    <input
                                        value={password}
                                        onChange={this.handleChange.bind(this)}
                                        id="password"
                                        type="password"
                                        className="input"
                                        data-type="password"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="passwordRepeat" className="label">Repita a senha</label>
                                    <input
                                        value={passwordRepeat}
                                        onChange={this.handleChange.bind(this)}
                                        id="passwordRepeat"
                                        type="password"
                                        className="input"
                                        data-type="passwordRepeat"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="email" className="label">E-mail</label>
                                    <input
                                        value={email}
                                        onChange={this.handleChange.bind(this)}
                                        id="email"
                                        type="email"
                                        className="input"
                                        required
                                    />
                                </div>
                                <div className="group">

                                    <input
                                        type="submit"
                                        className="button"
                                        value="Registrar" />
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginForm2)