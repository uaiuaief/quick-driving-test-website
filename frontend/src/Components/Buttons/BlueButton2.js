import React, { Component } from 'react';

class BlueButton2 extends Component {
    render() {
        return (
            <button id={this.props.id} class="blue-button-2">
                {this.props.text}
            </button>
        );
    }
}

export default BlueButton2;
