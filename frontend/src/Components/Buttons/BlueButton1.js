import React, { Component } from 'react';

class BlueButton1 extends Component {
    render() {
        return (
            <button class="blue-button-1">
                {this.props.text}
            </button>
        );
    }
}

export default BlueButton1;
