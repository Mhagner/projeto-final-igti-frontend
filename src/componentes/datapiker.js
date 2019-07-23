import React, { Component } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment';
const { RangePicker } = DatePicker

class Datapiker extends Component {
    state = {
        mode: ['month', 'month'],
        value: [],
    };

    handlePanelChange = (value, dateString) => {
        this.setState({
            value,
            dateString
            //mode: [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]],
        });
        console.log(this.state.dateString)
    };

    handleChange = (value) => {
        this.setState({ value });
        console.log(value)
        
    };

    render() {
        const { value, mode } = this.state;
        return (
            <RangePicker
                placeholder={['Start month', 'End month']}
                format="MM-YYYY"
                value={value}
                mode={mode}
                onChange={this.handleChange}
                //onPanelChange={this.handlePanelChange}
            />
        );
    }
}

export default Datapiker