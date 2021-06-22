import React, { Component } from 'react';

class BlueButton1 extends Component {
    render() {
        return (
            this.props.disabled ?
                <button
                    id={this.props.id}
                    type={this.props.type}
                    className="blue-button-1"
                    onClick={this.props.onClick}
                    disabled
                >
                    {this.props.text}
                </button>
                :
                <button
                    id={this.props.id}
                    type={this.props.type}
                    className="blue-button-1"
                    onClick={this.props.onClick}
                >
                    {this.props.text}
                </button>
        );
    }
}

export default BlueButton1;
