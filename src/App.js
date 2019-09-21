import React, { Component } from 'react';
import { Row, Col, Result, Card, Icon, Typography, Spin } from 'antd';
import Tamplate from './layout/tamplate'
import api from './funcoes/api'
import { formatMoney } from './funcoes/utils'
import { getUser } from './funcoes/services'

//css do antd
import 'antd/dist/antd.css'
import './assets/css/custom.css'

const { Title } = Typography;

class App extends Component {
  constructor() {
    super()

    this.state = {
      quantidade: 0,
      valores: 0,
      loading: false
    }
  }

  obtenhaQuantidadeDeGrupos = () => {
    this.setState({ loading: true })
    var usuarioEmail = getUser()
    //console.log(usuarioEmail)
    api.get('/grupos/count', { usuarioEmail })
      .then(response => this.setState({ quantidade: response.data.valor }))
      .then(response => this.setState({ loading: false }))
      .catch(error => {
        console.log(error)
      })
  }

  obtenhaASomaTotalDasParcelas = () => {
    this.setState({ loading: true })
    api.get('/grupos/valores')
      .then(response => this.setState({ valores: response.data.valor }))
      .then(response => this.setState({ loading: false }))
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.obtenhaQuantidadeDeGrupos()
    this.obtenhaASomaTotalDasParcelas()
  }

  render() {
    return (
      <div className="App">
        <Tamplate>
          <Spin
            spinning={this.state.loading}
          >
            <Row gutter={16}>

              <Col span={8}>
                <Card
                  style={{ width: 300, color: 'white', background: 'DodgerBlue' }}>
                  <Row>
                    <Col span={8}>
                      <Icon type="team" style={{ fontSize: '60px' }} />
                    </Col>
                    <Col span={14}>
                      <Title
                        level={3}
                        style={{ color: 'white' }}>
                        {this.state.quantidade || 0}
                      </Title>
                      <p>Grupos gerenciados</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: 300, color: 'white', background: 'LimeGreen' }}>
                  <Row>
                    <Col span={8}>
                      <Icon type="arrow-up" style={{ fontSize: '60px' }} />
                    </Col>
                    <Col span={14}>
                      <Title
                        level={3}
                        style={{ color: 'white' }}>
                        {formatMoney(this.state.valores, 2, 'R$ ', '.', ',')}
                      </Title>
                      <p>Total das parcelas</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <Card style={{ width: 300, color: 'white', background: 'LimeGreen' }}>
                  <Row>
                    <Col span={8}>
                      <Icon type="arrow-down" style={{ fontSize: '60px' }} />
                    </Col>
                    <Col span={14}>
                      <Title
                        level={3}
                        style={{ color: 'white' }}>
                        R$ 458,00
                    </Title>
                      <p>A receber</p>
                    </Col>
                  </Row>

                </Card>
              </Col>
            </Row>
          </Spin>
        </Tamplate>
      </div>
    )
  }
}


export default App;
