import React, { Component } from 'react'

import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import { login, logout, getToken } from '../funcoes/services'

class Tamplate extends Component {
    constructor(props) {
        super(props)
    }

    handleLogout() {
        const token = getToken()
        logout(token)
    }

    render() {
        const { Header, Content, Footer } = Layout;
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['']}
                        style={{ lineHeight: '64px' }}
                    >

                        <Menu.Item key="1"><Link to='/app'>Dashboard</Link></Menu.Item>

                        <Menu.Item key="2"><Link to='/grupo'>Grupos</Link></Menu.Item>

                        <Menu.Item key="3"><Link to='/transacao'>Transações</Link></Menu.Item>

                        <Menu.Item key="4">
                            <Link to='/' onClick={this.handleLogout.bind(this)}>Sair</Link>
                        </Menu.Item>

                    </Menu>

                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} />
                    <div style={{ background: '#fff', padding: 30, minHeight: 280 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    developer by: Mahilson Hagnner
                 </Footer>
            </Layout >
        )
    }
}

export default Tamplate