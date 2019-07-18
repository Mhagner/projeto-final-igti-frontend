import React from 'react'
import { Modal, Button, Icon } from 'antd';

class ModalComponent extends React.Component {
    state = {
        loading: false,
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, loading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    {this.props.buttonModal}
                </Button>
                <Modal
                    visible={visible}
                    title={this.props.title}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            {this.props.buttonCancel}
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            {this.props.buttonSubmit}
                        </Button>,
                    ]}
                >
                    {this.props.children}
                </Modal>
            </div>
        );
    }
}

export default ModalComponent