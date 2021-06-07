import React, { Component } from 'react';

class BlueButton2 extends Component {
    render() {
        return (
            <button id={this.props.id} className="blue-button-2" onClick={this.props.onClick}>
                {this.props.text}
            </button>
        );
    }
}

export default BlueButton2;
