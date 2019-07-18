import React, { Component } from 'react'
import { notification } from 'antd'
import Card from '../componentes/card'
import Table from '../componentes/table'
import Tamplate from '../layout/tamplate'
import api from './../funcoes/api';
import If from '../componentes/if'
import moment from 'moment'
import {
    Form,
    Input,
    DatePicker,
    Select,
    Modal,
    Button
} from 'antd'

notification.config({
    bottom: 50,
    duration: 2.0
})

const { MonthPicker, RangePicker } = DatePicker;
const { Option } = Select;

const dateFormat = 'DD/MM/YYYY';
const mesFormat = 'MM/YYYY';

const diasData = []
for (let i = 1; i < 20; i++) {
    diasData.push(<Option key={i}>{i}</Option>);
}

class Grupo extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nome: undefined,
            descricao: undefined,
            dataCriacao: undefined,
            diaRecebimento: undefined,
            diaPagamento: undefined,
            mesAnoInicio: undefined,
            mesAnoFim: undefined,
            loading: false,
            grupos: [],
            visible: false
        }

        this.limpaCampos = this.limpaCampos.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    listarGrupos() {
        api.get('/grupos')
            .then(response => this.setState({ grupos: response.data }))

            .catch(error => {
                console.log(error)
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { nome, descricao } = this.state

        this.setState({ loading: true })

        api.post(`/grupos`, { nome, descricao })
            .then(response => [
                this.setState({ loading: false }),
                notification.success({
                    message: 'Sucesso!',
                    description:
                        response.data.message.toString()
                }),
                this.limpaCampos(),
                this.setState({ visible: false }),
                this.listarGrupos()
            ])
            .catch(error => [
                this.setState({ loading: false }),
                notification.error({
                    message: 'Ops!',
                    description:
                        error.response.data.message.toString()
                }),
            ])
    }

    deletarGrupo = (grupo) => {

        api.delete(`/grupos/${grupo._id}`)
            .then(response => [
                notification.success({
                    message: 'Sucesso!',
                    description:
                        response.data.message.toString()
                })
            ])
            .then(response => this.listarGrupos())
            .catch(error => [
                notification.error({
                    message: 'Ops!',
                    description:
                        error.response.data.message.toString()
                }),
            ])
    }

    editarGrupo = (grupo) => {
        api.put(`/grupos/${grupo._id}`, )
            .then(response => [
                notification.success({
                    message: 'Sucesso!',
                    description:
                        response.data.message.toString()
                })
            ])
            .then(response => this.listarGrupos())
            .catch(error => [
                notification.error({
                    message: 'Ops!',
                    description:
                        error.response.data.message.toString()
                }),
            ])
    }

    limpaCampos() {
        this.setState({
            nome: '',
            descricao: ''
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleEdit = (id) => {
        const grupos = this.state.grupos.filter((grupo) => {
            return grupo._id === id
        })

        const firtItem = grupos[0]

        this.setState({
            ...this.state,
            nome: firtItem.nome,
            descricao: firtItem.descricao
        })

        this.showModal()
    }

    handleCancel = () => {
        this.setState({ visible: false });
        this.limpaCampos()
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        this.listarGrupos()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        const { visible, loading, _id } = this.state;
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        const now = new Date
        

        return (
            <div>
                <Tamplate>
                    <Button
                        type="primary"
                        onClick={this.showModal}
                        style={{ marginBottom: 16 }}>
                        Novo Grupo
                    </Button>
                    <Modal
                        visible={visible}
                        title='Cadastrar novo Grupo'
                        onCancel={this.handleCancel}
                        footer={
                            [
                                <Button
                                    //key="submit"
                                    type="default"
                                    onClick={this.handleCancel}>
                                    Cancelar
                                </Button>,

                                <Button
                                    key="submit"
                                    type="primary"
                                    loading={loading} onClick={this.handleSubmit}>
                                    Salvar
                                 </Button>
                            ]}
                    >
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item label="Data da criação">
                                <DatePicker
                                    name='dataCricao'
                                    format={dateFormat}
                                    onChange={this.dateChange}
                                    value={this.state.dataCriacao}
                                    disabled={true}
                                />
                            </Form.Item>
                            <Form.Item label="Nome do grupo">
                                <Input
                                    name='nome'
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.nome}
                                />
                            </Form.Item>
                            <Form.Item label="Descrição do grupo">
                                <TextArea
                                    placeholder="Informe uma descrição sobre esse grupo"
                                    name='descricao'
                                    onChange={this.handleChange.bind(this)}
                                    autosize={{ minRows: 2, maxRows: 6 }}
                                    required={true}
                                    value={this.state.descricao}
                                />
                            </Form.Item>


                            {/*
                            <Form.Item label="Dia de pagamento">
                                <Select
                                    defaultValue="5"
                                    onChange={this.handleSelect.bind(this)}
                                    style={{ width: 180 }}>
                                    {this.state.dias}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Dia de recebimento">
                                <Select
                                    defaultValue="10"
                                    onChange={this.handleSelect.bind(this)}
                                    style={{ width: 180 }} >
                                    {this.state.dias}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Mês/Ano Início">
                                <MonthPicker
                                    format={mesFormat}
                                />
                            </Form.Item>
                            <Form.Item label="Mês/Ano Fim">
                                <MonthPicker
                                    format={mesFormat}
                                />
                            </Form.Item> */}
                        </Form>
                    </Modal>
                    <Table
                        pagination={{
                            pageSizeOptions: ['30', '50'],
                            showSizeChanger: true
                        }}
                        dados={this.state.grupos}
                        deletarGrupo={this.deletarGrupo}
                        handleEdit={(id) => this.handleEdit(id)}
                    />
                </Tamplate>
            </div >
        )
    }
}

const WrappedApp = Form.create({ name: 'formGrupo' })(Grupo);

export default WrappedApp