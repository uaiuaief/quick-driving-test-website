import React, { Component } from 'react';

class MainButton extends Component {
    render() {
        return (
            <button id={this.props.id} className="main-button">
                {this.props.text}
            </button>
        );
    }
}

export default MainButton;
