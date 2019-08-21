import React, { Component } from 'react'
import Tamplate from '../layout/tamplate'
import { Button, Select, Row, Col, Form, Descriptions } from 'antd';
import { AUTH } from './../funcoes/services';
import api from './../funcoes/api';
import { formatMoney } from '../funcoes/utils'
import moment from 'moment'

const { Option } = Select
const FormItem = Form.Item;
const DescriptionsItem = Descriptions.Item
class transacao extends Component {
    constructor(props) {
        super(props)

        this.state = {
            grupo: undefined,
            descricao: undefined,
            mesAnoInicio: undefined,
            mesAnoFim: undefined,
            valorMensal: undefined,
            jurosMensal: undefined,
            _id: undefined,
            grupos: []
        }
    }

    listaGrupos = () => {
        api.get('/grupos')
            .then(response => this.setState({ grupos: response.data }))
            .catch(error => {
                console.log(error)
            })
    }

    listaDadosDeUmGrupo = (id) => {
        api.get(`/grupos/${id}`)
            .then(response => this.setState({
                nome: response.data.nome,
                descricao: response.data.descricao,
                mesAnoInicio: response.data.mesAnoInicio,
                mesAnoFim: response.data.mesAnoFim,
                valorMensal: response.data.valorMensal,
                jurosMensal: response.data.jurosMensal
            }))
    }

    onChange = (value, key) => {
        const id = key.key
        this.setState({ grupo: value, _id: id })
        this.listaDadosDeUmGrupo(id)
    }

    onBlur = () => {
        console.log('blur');
    }
      
    onFocus = () => {
        console.log('focus');
    }

    onSearch(val) {
        console.log('search:', val);
    }

    componentDidMount() {
        this.listaGrupos()
       // this.listaDadosDeUmGrupo(this.state._id || '')
    }

    render() {
        const lista = this.state.grupos || []
        const renderGrupos = lista.map(grupo => (
            <Option key={grupo._id} value={grupo.nome}>{grupo.nome}</Option>
        ))
        const { descricao, mesAnoFim, mesAnoInicio, valorMensal, jurosMensal } = this.state
        return (
            <Tamplate>
                <h2>Simulação</h2>
                <Row gutter={24}>
                    <Col span={10}>
                        <Form>
                            <FormItem label="Grupo">
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Selecione o grupo"
                                    optionFilterProp="children"
                                    onChange={this.onChange.bind(this)}
                                    onBlur={this.onBlur}
                                    onFocus={this.onFocus}
                                    onSearch={this.onSearch}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {renderGrupos}
                                </Select>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Descriptions title="Informações do Grupo" layout="vertical">
                            <DescriptionsItem label="Descrição do grupo">{descricao}</DescriptionsItem>
                            <DescriptionsItem label="Mês/Ano inicio">{moment(mesAnoInicio).format("MM/YYYY")}</DescriptionsItem>
                            <DescriptionsItem label="Mês/Ano fim">{moment(mesAnoFim).format("MM/YYYY")}</DescriptionsItem>
                            <DescriptionsItem label="Mensalidade">{formatMoney(valorMensal, 2, 'R$ ', '.', ',')}</DescriptionsItem>
                            <DescriptionsItem label="Juros mensal">{jurosMensal} %</DescriptionsItem>
                        </Descriptions>
                    </Col>
                </Row>
            </Tamplate>
        )
    }
}

export default transacao