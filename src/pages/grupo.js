import React, { Component } from 'react'
import { formatMoney } from '../funcoes/utils'
import moment from 'moment'
//import ptbr from 'antd/lib/locale-provider/pt_BR'

import Card from '../componentes/card'
import Table from '../componentes/table'
import TableParticipantes from '../componentes/tableParticipantes'
import Tamplate from '../layout/tamplate'
import api from './../funcoes/api';
import If from '../componentes/if'
import { Link } from 'react-router-dom'
import numeral from 'numeral'
import {
    Form,
    Input,
    DatePicker,
    Select,
    Modal,
    Button,
    notification,
    Icon,
    InputNumber,
    Row,
    Col,
    Spin,
    Steps,
    Switch
} from 'antd'

notification.config({
    bottom: 50,
    duration: 2.0
})

const ButtonGroup = Button.Group;
const Step = Steps.Step;
const { MonthPicker, RangePicker } = DatePicker;
const { Option } = Select;
const FormItem = Form.Item;

const steps = [{
    title: 'Grupo',
    content: 'Grupo-content',
}, {
    title: 'Valores',
    content: 'Valores-content',
}, {
    title: 'Participantes',
    content: 'Participantes-content',
}];

let uuid = 0;

const dateFormat = 'DD/MM/YYYY';
const mesFormat = 'MM/YYYY';

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
            valorMensal: undefined,
            jurosMensal: undefined,
            jurosAcumulativo: false,
            participantes: [{}],
            loading: false,
            tableLoading: false,
            grupos: [],
            visible: false,
            current: 0,
            edicao: false,
            array: []
        }

        this.limpaCampos = this.limpaCampos.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.editarGrupo = this.editarGrupo.bind(this)
    }

    listarGrupos() {
        this.setState({ tableLoading: true })
        api.get('/grupos')
            .then(response => this.setState({ grupos: response.data }))
            .then(response => this.setState({ tableLoading: false }))
            .catch(error => {
                console.log(error)
            })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.setState({
            mesAnoInicio: moment(moment(this.state.mesAnoInicio).format("L"), "MMDDYYYY").format(),
            mesAnoFim: moment(moment(this.state.mesAnoFim).format("L"), "MMDDYYYY").format()
        })

        const { nome, descricao, diaPagamento, diaRecebimento, mesAnoInicio, mesAnoFim,
            valorMensal, jurosAcumulativo, jurosMensal, participantes } = this.state

        this.setState({ loading: true })

        api.post(`/grupos`, {
            nome, descricao, diaPagamento, diaRecebimento, mesAnoInicio,
            mesAnoFim, valorMensal, jurosAcumulativo, jurosMensal, participantes
        })
            .then(response => [
                this.setState({ loading: false }),
                this.limpaCampos(),
                this.setState({
                    visible: false
                }),
                this.listarGrupos()
            ])
            .catch(e => [
                this.setState({ loading: false }),
                notification.error({
                    message: 'Ops!',
                    description: e.response.data.message.toString()
                })
            ])

    }

    deletarGrupo = (grupo) => {
        this.setState({ tableLoading: true })
        api.delete(`/grupos/${grupo._id}`)
            .then(response => [
                notification.success({
                    message: 'Sucesso!',
                    description:
                        response.data.message.toString()
                })
            ])
            .then(response => this.setState({ tableLoading: false }))
            .then(response => this.listarGrupos())
            .catch(e => [
                this.setState({ loading: false }),
                notification.error({
                    message: 'Ops!',
                    description: e.response.data.message.toString()
                })
            ])
    }

    editarGrupo = (grupo) => {
        api.put(`/grupos/${grupo._id}`)
            .then(response => [
                notification.success({
                    message: 'Sucesso!',
                    description:
                        response.data.message.toString()
                })
            ])
            .then(response => this.listarGrupos())
            .catch(e => [
                this.setState({ loading: false }),
                notification.error({
                    message: 'Ops!',
                    description: e.response.data.message.toString()
                })
            ])

    }

    limpaCampos() {
        this.setState({
            nome: '',
            edicao: false,
            grupos: [],
            descricao: '',
            diaPagamento: '',
            diaRecebimento: '',
            current: 0,
            mesAnoInicio: undefined,
            mesAnoFim: undefined,
            valorMensal: undefined,
            jurosMensal: undefined,
            participantes: [
                { nome: [] }
            ],
            array: []
        })
        this.listarGrupos()

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
        let parts = []
        parts = firtItem.participantes

        let partsNome = parts.map(p => (p.nome))

        this.setState({
            ...this.state,
            nome: firtItem.nome,
            descricao: firtItem.descricao,
            diaPagamento: firtItem.diaPagamento,
            diaRecebimento: firtItem.diaRecebimento,
            mesAnoInicio: firtItem.mesAnoInicio,
            mesAnoFim: firtItem.mesAnoFim,
            valorMensal: firtItem.valorMensal,
            jurosAcumulativo: firtItem.jurosAcumulativo,
            jurosMensal: firtItem.jurosMensal,
            edicao: true,
            participantes: [
                { nome: partsNome }
            ]
        })

        this.setState({ array: this.state.grupos[0].participantes })

        this.showModal()
    }

    handleCancel = () => {
        this.setState({
            visible: false
        });
        this.limpaCampos()
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDiaRecebimentoChange = value => {
        this.setState({
            diaRecebimento: value
        });
    };

    handleDiaPagamentoChange = value => {
        this.setState({
            diaPagamento: value
        });
    };

    handleJurosMesalChange = (value) => {
        this.setState({
            jurosMensal: value
        });
    };

    handleValorMensalChange = (value) => {
        this.setState({
            valorMensal: value
        })
    }

    handleDataInicioChange = (value) => {
        this.setState({
            mesAnoInicio: value
        });
    };

    handleDataFimChange = (value) => {
        this.setState({
            mesAnoFim: value
        });
    };

    handleChecked = (checked) => {
        this.setState({ jurosAcumulativo: checked })

        return (this.state.jurosAcumulativo) ?
            this.setState({ jurosMensal: undefined }) : null
    }

    componentDidMount() {
        this.listarGrupos()
    }

    next() {
        const current = this.state.current + 1
        this.setState({ current })
    }

    prev() {
        const current = this.state.current - 1
        this.setState({ current })
    }

    calculaQuantidadeDeMeses = () => {
        var inicio = moment(this.state.mesAnoInicio)
        var fim = moment(this.state.mesAnoFim)
        var qtdeMeses = (fim.diff(inicio, 'months') + 1)
        return qtdeMeses + 1
    }

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }
        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {

        uuid++;
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');

        var meses = this.calculaQuantidadeDeMeses()

        if (keys.length < meses) {
            const nextKeys = keys.concat(uuid);
            // can use data-binding to set
            // important! notify form to detect changes

            form.setFieldsValue({
                keys: nextKeys,
            });
        } else return;
    }

    handleParticipanteNomeChange = (value, index) => {
        let dados = this.state.participantes
        dados[index].nome = value
        this.setState({ participantes: dados[index].nome })
        console.log(this.state.participantes)
    }

    atualizaStadoDoArray = (array) => {
        this.setState({ participantes: array })
    }

    render() {
        const formItemLayout = {    
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const { TextArea } = Input;
        const { visible, loading, current, grupos, edicao } = this.state;


        getFieldDecorator('keys', { initialValue: (edicao) ? this.state.array : [] });

        const keys = getFieldValue('keys');


        const formItems = keys.map((item, index) => {

            const part = 'participantes'

            getFieldDecorator(`${item}[${index}].nome`, {
                initialValue: item.nome
            })

            const { participantes } = this.state

            return (
                <Row gutter={24}>
                    <Col span={16}>
                        <FormItem
                            required={false}
                            key={index}
                        >
                            {getFieldDecorator(`${item}[${index}].nome`)(
                                <Input
                                    name={`${part}[${index}][nome]`}
                                    placeholder="Digite o nome"
                                    style={{ width: '100%', marginRight: 10 }}
                                    onChange={(e) => this.handleParticipanteNomeChange(e.target.value, index)}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={2}>
                        <If test={keys.length > 1}>
                            <Icon
                                className="dynamic-delete-button"
                                type="minus-circle-o"
                                disabled={keys.length === 1}
                                onClick={() => this.remove(item)}
                            />
                        </If>
                    </Col>
                </Row>
            );
        });

        return (
            <div>
                <Tamplate>
                    <Button
                        type="primary"
                        onClick={this.showModal}
                        style={{ marginBottom: 20 }}>
                        <Icon type="usergroup-add" style={{ fontSize: '18px' }} />
                        Novo Grupo
                    </Button>

                    <Modal
                        className='modal'
                        style={{ marginBottom: 24 }}
                        visible={visible}
                        title='Cadastrar novo Grupo'
                        onCancel={this.handleCancel}
                        wrapClassName="vertical-center-modal"
                        footer={
                            [
                                <Button
                                    //key="submit"
                                    type="default"
                                    onClick={this.handleCancel}>
                                    Cancelar
                                </Button>,
                                <If test={(steps[this.state.current].content) === 'Participantes-content'} >
                                    <Button
                                        key="edit"
                                        type="primary"
                                        loading={loading}
                                        onClick={this.handleSubmit}>
                                        Salvar
                                    </Button>
                                </If>
                            ]}
                    >
                        <div style={{ background: '#fff', padding: 20, minHeight: 280 }}>
                            <Form onSubmit={this.handleSubmit} layout='vertical' >

                                <Steps current={current} style={{ marginBottom: 20 }}>
                                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                                </Steps>

                                <div style={{ background: '#fff', padding: 20, minHeight: 280 }}>
                                    <If test={(steps[this.state.current].content) === 'Grupo-content'} >
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
                                        <Row gutter={24}>
                                            <Col span={10}>
                                                <Form.Item label="Dia de pagamento">
                                                    <InputNumber
                                                        min={5}
                                                        max={8}
                                                        name='diaPagamento'
                                                        value={this.state.diaPagamento}
                                                        onChange={this.handleDiaPagamentoChange}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={10}>
                                                <Form.Item label="Dia de recebimento">
                                                    <InputNumber
                                                        min={10}
                                                        max={15}
                                                        name='diaPagamento'
                                                        value={this.state.diaRecebimento}
                                                        onChange={this.handleDiaRecebimentoChange}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={24}>
                                            <Col span={10}>
                                                <Form.Item label="Mês/Ano Início">
                                                    <MonthPicker
                                                        name='mesAnoInicio'
                                                        placeholder='Selecione a data'
                                                        format={mesFormat}
                                                        value={moment(this.state.mesAnoInicio)}
                                                        onChange={this.handleDataInicioChange}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={10}>
                                                <Form.Item label="Mês/Ano Fim">
                                                    <MonthPicker
                                                        name='mesAnoFim'
                                                        placeholder='Selecione a data'
                                                        format={mesFormat}
                                                        value={moment(this.state.mesAnoFim)}
                                                        onChange={this.handleDataFimChange}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </If>
                                    <If test={(steps[this.state.current].content) === 'Valores-content'} >
                                        <Row gutter={24}>
                                            <Col span={10}>
                                                <Form.Item label="Mensalidade - R$">
                                                    <Input
                                                        name="valorMensal"
                                                        type="text"
                                                        value={this.state.valorMensal}
                                                        onChange={(e) => this.handleValorMensalChange(e.target.value)}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={24}>
                                            <Col span={10}>
                                                <Form.Item label="Juros acumulativo mensal?">
                                                    <Switch
                                                        onChange={this.handleChecked}
                                                        defaultChecked={this.state.jurosAcumulativo}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={24}>
                                            <Col span={10}>
                                                <If test={this.state.jurosAcumulativo}>
                                                    <Form.Item label="% percentual de juros/mês">
                                                        <InputNumber
                                                            min={2}
                                                            max={6}
                                                            name='jurosMensal'
                                                            formatter={value => `${value}%`}
                                                            value={this.state.jurosMensal}
                                                            onChange={this.handleJurosMesalChange}
                                                        />
                                                    </Form.Item>
                                                </If>
                                            </Col>
                                        </Row>
                                    </If>
                                    <If test={(steps[this.state.current].content) === 'Participantes-content'} >
                                        <p>Quantidade de participantes possíveis: {this.calculaQuantidadeDeMeses()}</p>
                                        {formItems}
                                        <FormItem>
                                            <Button
                                                type="dashed"
                                                onClick={this.add}
                                                style={{ width: '60%' }}>
                                                <Icon type="plus" />
                                                Adicionar participante
                                            </Button>
                                        </FormItem>
                                    </If>
                                </div>
                                <div className="steps-action">
                                    <ButtonGroup>
                                        <Button
                                            type="primary"
                                            style={{ marginLeft: 8 }}
                                            onClick={() => this.prev()}
                                            disabled={this.state.current <= 0}
                                        >
                                            <Icon type="left" />
                                            Voltar
                                        </Button>
                                        <Button
                                            type="primary"
                                            onClick={() => this.next()}
                                            disabled={this.state.current >= 2}
                                        >
                                            Próximo
                                            <Icon type="right" />
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </Form>
                        </div>
                    </Modal>
                    <Spin
                        tip='Carregando...'
                        spinning={this.state.tableLoading}
                    >
                        <Table
                            pagination={{
                                pageSizeOptions: ['30', '50'],
                                showSizeChanger: true
                            }}
                            dados={this.state.grupos}
                            deletarGrupo={this.deletarGrupo}
                            handleEdit={(id) => this.handleEdit(id)}
                        />
                    </Spin>
                </Tamplate>
            </div >
        )
    }
}

const GrupoPage = Form.create({ name: 'formGrupo' })(Grupo);

export default GrupoPage