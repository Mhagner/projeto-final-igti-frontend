
import React from 'react'

import { Table, Divider, Icon, Popconfirm } from 'antd';

export default (props) => {
    const columns = [
        {
            title: 'Nome do Grupo',
            dataIndex: 'nome',
            render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
        },
        {
            title: 'Mês/Ano Início',
            dataIndex: 'mesAnoInicio',
        },
        {
            title: 'Mês/Ano Fim',
            dataIndex: 'mesAnoFim',
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
                            <Icon type="user-add" theme="twoTone" style={{ fontSize: '24px' }}
                              />
                               <Icon type="plus-circle" style={{ fontSize: '24px' }} theme="twoTone" twoToneColor="#52c41a" />
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
                                style={{ fontSize: '24px' }}/>
                            </a>
                        </Popconfirm>
                    </span>
                ) : []
        },

    ];
    return (
        <Table dataSource={props.dados} columns={columns} rowKey='_id' />
    )
}
