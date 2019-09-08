import React from 'react';
import { Row, Col, Result, Card, Icon, Typography } from 'antd';


import Tamplate from './layout/tamplate'

//css do antd
import 'antd/dist/antd.css'
import './assets/css/custom.css'

const { Title } = Typography;

function App(props) {
  return (
    <div className="App">
      <Tamplate>
        <Row gutter={24}>
          <Col span={8}>
            <Card
              style={{ width: 300, color: 'white', background: 'DodgerBlue' }}>
              <Row>
                <Col span={8}>
                  <Icon type="team" style={{ fontSize: '50px' }} />
                </Col>
                <Col span={14}>
                  <Title
                    level={3}
                    style={{ color: 'white' }}>
                    3
                    </Title>
                  <p>Grupos gerenciados</p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ width: 300, color: 'white', background: 'OrangeRed' }}>
              <Row>
                <Col span={8}>
                  <Icon type="arrow-up" style={{ fontSize: '50px' }} />
                </Col>
                <Col span={14}>
                  <Title
                    level={3}
                    style={{ color: 'white' }}>
                    R$ 458,00
                    </Title>
                  <p>A pagar</p>
                </Col>
              </Row>

            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ width: 300, color: 'white', background: 'LimeGreen' }}>
              <Row>
                <Col span={8}>
                  <Icon type="arrow-down" style={{ fontSize: '50px' }} />
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
      </Tamplate>
    </div>
  );
}

export default App;
