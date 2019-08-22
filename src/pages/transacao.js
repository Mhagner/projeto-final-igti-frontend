import React, { Component } from 'react'
import Tamplate from '../layout/tamplate'
import { Button, Select, Row, Col, Form, Descriptions, Tabs, Divider, Spin } from 'antd';
import { AUTH } from './../funcoes/services';
import api from './../funcoes/api';
import { formatMoney } from '../funcoes/utils'
import moment from 'moment'
import If from '../componentes/if'

const { Option } = Select
const FormItem = Form.Item;
const DescriptionsItem = Descriptions.Item
const { TabPane } = Tabs;
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
            loading: false,
            _id: undefined,
            grupos: [],
            mesesTab: []
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
        this.setState({ loading: true })
        api.get(`/grupos/${id}`)
            .then(response => this.setState({
                nome: response.data.nome,
                descricao: response.data.descricao,
                mesAnoInicio: response.data.mesAnoInicio,
                mesAnoFim: response.data.mesAnoFim,
                valorMensal: response.data.valorMensal,
                jurosMensal: response.data.jurosMensal
            }))
            .then(response => this.setState({ loading: false }))
    }

    onChange = (value, key) => {
        const id = key.key
        this.setState({ grupo: value, _id: id })
        this.listaDadosDeUmGrupo(id)
    }

    onSearch(val) {
        console.log('search:', val);
    }

    componentDidMount() {
        this.listaGrupos()
        // this.listaDadosDeUmGrupo(this.state._id || '')
    }

    render() {
        const { grupo, mesesTab, grupos, descricao, mesAnoFim, mesAnoInicio, valorMensal, jurosMensal } = this.state

        const lista = grupos || []
        const renderGrupos = lista.map(grupo => (
            <Option key={grupo._id} value={grupo.nome}>{grupo.nome}</Option>
        ))

        var inicio = moment(mesAnoInicio)
        var fim = moment(mesAnoFim)
        var qtdeMeses = fim.diff(inicio, 'months') + 1

        const renderTabs =
            [...Array(qtdeMeses).keys()].map(i => (
                <TabPane
                    tab={moment(inicio.add((i < 2) ? i : 1, 'month')).format('MMMM/YYYY')}
                    key={i}
                >
                    <h3>{i}</h3>
                </TabPane>
            ))

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
                        <Divider />
                        <Spin
                            tip='Carregando...'
                            spinning={this.state.loading}>
                            <Descriptions title="" layout="vertical">
                                <DescriptionsItem label="Descrição do grupo">
                                    {descricao}
                                </DescriptionsItem>
                                <DescriptionsItem label="Mês/Ano inicio">
                                    {(grupo) ? moment(mesAnoInicio).format("MMMM/YYYY") : undefined}
                                </DescriptionsItem>
                                <DescriptionsItem label="Mês/Ano fim">
                                    {(grupo) ? moment(mesAnoFim).format("MMMM/YYYY") : undefined}
                                </DescriptionsItem>
                                <DescriptionsItem label="Mensalidade">
                                    {formatMoney(valorMensal, 2, 'R$ ', '.', ',')}
                                </DescriptionsItem>
                                <DescriptionsItem label="Juros mensal">
                                    {jurosMensal} %
                                    </DescriptionsItem>
                                <DescriptionsItem label="Duração em meses">
                                    {qtdeMeses}
                                </DescriptionsItem>
                            </Descriptions>
                        </Spin>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={24}>
                    <Col span={24}>
                        <div>
                            <Spin
                                tip='Carregando...'
                                spinning={this.state.loading}>
                                <Tabs type="card" style={{ height: 220 }}>
                                    {renderTabs}
                                </Tabs>
                            </Spin>
                        </div>
                    </Col>
                </Row>
            </Tamplate >
        )
    }
}

export default transacao