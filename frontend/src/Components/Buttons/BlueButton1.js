import React, { Component } from 'react';

class BlueButton1 extends Component {
    render() {
        return (
            <button className="blue-button-1" onClick={this.props.onClick}>
                {this.props.text}
            </button>
        );
    }
}

export default BlueButton1;
