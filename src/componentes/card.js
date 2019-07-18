import React from 'react'

import { Card, Icon } from 'antd'

const { Meta } = Card

export default (props) => {
    return (
        <Card
            style={{ width: 300 }}
            cover={
                <img
                    alt={props.alt}
                    src={props.image}
                />
            }
            actions={[
                <Icon type={props.icon1} />,
                <Icon type={props.icon2} />,
                <Icon type={props.icon3} />
            ]}
        >
            <Meta
                title={props.title}
                description={props.description}
            />
        </Card>
    )
}