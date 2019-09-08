import React, { Component } from 'react'
import Tamplate from '../layout/tamplate'
import { Button, Select, Row, Col, Form, Descriptions, Tabs, Divider, Spin } from 'antd';
import { AUTH, getUser } from './../funcoes/services';
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
            usuarioEmail: getUser(),
            loading: false,
            _id: undefined,
            grupos: [],
            mesesTab: []
        }
    }

    listaGrupos = () => {
        api.get(`/grupos?usuarioEmail=${this.state.usuarioEmail}`)
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
                jurosMensal: response.data.jurosMensal,
                participantes: response.data.participantes
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
    }

    calcularValorAPagar = (valor, juros, cont) => {
        var i = 0
        var dados = []
        var valorAcumulado = 0
        for (i = 0; i < cont; i++) {
            if (i === 0) {
                valorAcumulado = valor
            } else {
                valorAcumulado = valorAcumulado + (valorAcumulado * juros / 100)
            }
            dados.push(valorAcumulado)
        }
        return dados
    }

    render() {
        const { participantes, grupo, mesesTab, grupos, descricao, mesAnoFim, mesAnoInicio, valorMensal, jurosMensal } = this.state

        const lista = grupos || []
        
        const renderGrupos = lista.map(grupo => (
            <Option key={grupo._id} value={grupo.nome}>{grupo.nome}</Option>
        ))

        var inicio = moment(mesAnoInicio)
        var fim = moment(mesAnoFim)
        var qtdeMeses = (fim.diff(inicio, 'months')+2)
        var valorAPagar = this.calcularValorAPagar(valorMensal, jurosMensal, qtdeMeses)

        const renderTabs =
            [...Array(qtdeMeses).keys()].map(i => (
                <TabPane
                    tab={moment(inicio.add((i < 2) ? i : 1, 'month')).format('MMMM/YYYY')}
                    key={i}
                >
                    <Descriptions title="" layout="vertical">
                        <DescriptionsItem label="Ordem/participante">
                            {(grupo && participantes) ? participantes.map((p, indice) => (
                                <p>{indice + 1}º - {p.nome}</p>
                            )) : undefined}
                        </DescriptionsItem>
                        <DescriptionsItem label="Valor a pagar">
                            {(grupo && participantes) ? participantes.map(p => (
                                <p>{formatMoney(valorAPagar[i], 2, 'R$ ', '.', ',')}</p>
                            )) : undefined}
                        </DescriptionsItem>
                        <DescriptionsItem label="Valor a receber">
                            {(grupo && participantes) ? participantes.map((p, indice) => (
                                <p>
                                    {(indice === i) ?
                                        (formatMoney(valorAPagar[i] * qtdeMeses, 2, 'R$ ', '.', ',')) :
                                        (formatMoney(0, 2, 'R$ ', '.', ','))}
                                </p>
                            )) : undefined}
                        </DescriptionsItem>
                    </Descriptions>
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
                <If test={grupo}>
                    <Spin
                        tip='Carregando...'
                        spinning={this.state.loading}>
                        <Divider />
                        <Row gutter={24}>
                            <Col span={24}>

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
                                        {(grupo) ? formatMoney(valorMensal, 2, 'R$ ', '.', ',') : undefined}
                                    </DescriptionsItem>
                                    <DescriptionsItem label="Juros mensal">
                                        {(grupo) ? jurosMensal : undefined}%
                                    </DescriptionsItem>
                                    <DescriptionsItem label="Duração em meses">
                                        {(grupo) ? qtdeMeses : undefined}
                                    </DescriptionsItem>
                                </Descriptions>
                            </Col>
                        </Row>
                        <Divider />
                        <Row gutter={24}>
                            <Col span={24}>
                                <div>
                                    <Tabs type="card" >
                                        {renderTabs}
                                    </Tabs>
                                </div>
                            </Col>
                        </Row>
                    </Spin>
                </If>
            </Tamplate >
        )
    }
}

export default transacao