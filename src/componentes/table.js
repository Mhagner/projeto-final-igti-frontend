
import React from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { numberToReal, formatMoney } from '../funcoes/utils'

import { Table, Divider, Icon, Popconfirm, Row } from 'antd';

export default (props) => {
    const columns = [
        {
            title: 'Nome do Grupo',
            dataIndex: 'nome',
            render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: 'Valor Mensal',
            dataIndex: 'valorMensal',
            render: valorMensal =>
                <a href="javascript:;">
                    {formatMoney(valorMensal, 2, 'R$ ', '.', ',')}
                </a>
        },
        {
            title: 'Mês/Ano Início',
            dataIndex: 'mesAnoInicio',
            render: date1 => <a href="javascript:;">{moment(date1).format("MM/YYYY")}</a>
        },
        {
            title: 'Mês/Ano Fim',
            dataIndex: 'mesAnoFim',
            render: date2 => <a href="javascript:;">{moment(date2).format("MM/YYYY")}</a>
        },
        {
            title: 'Ação',
            render: (text, grupo) =>
                props.dados.length >= 1 ? (
                    <span>
                        <a
                            href="javascript:;"
                            onClick={(e) => props.handleEdit(grupo._id)}
                        >
                            <Icon
                                type="user-add"
                                theme="twoTone"
                                style={{ fontSize: '24px' }}
                            />
                            <Icon
                                type="plus-circle"
                                style={{ fontSize: '24px' }}
                                theme="twoTone"
                                twoToneColor="#52c41a"
                            />
                        </a>
                        <Divider type="vertical" />
                        <Popconfirm
                            title='Deseja mesmo excluir?'
                            onConfirm={() => props.deletarGrupo(grupo)}
                            cancelText='Não'
                            okText='Sim'>
                            <a
                                href="javascript:;"
                            >
                                <Icon
                                    type="delete"
                                    theme="twoTone"
                                    twoToneColor="#eb2f96"
                                    style={{ fontSize: '24px' }} />
                            </a>
                        </Popconfirm>
                    </span>
                ) : []
        },

    ];
    return (
        <Row gutter={{ xs: 16, sm: 8, md: 24}}>
            <Table dataSource={props.dados} columns={columns} rowKey='_id' />
        </Row>
    )
}
