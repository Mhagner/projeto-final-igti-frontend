import React from 'react'

import { Row, Col } from 'antd'

export default (props) => {
    return (
        <Row>
            <Col xs={{ span: 12, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col>
            <Col xs={{ span: 12, offset: 1 }} lg={{ span: 6, offset: 2 }}>teste</Col>
            <Col xs={{ span: 12, offset: 1 }} lg={{ span: 6, offset: 2 }}></Col>
        </Row> 
    )
}