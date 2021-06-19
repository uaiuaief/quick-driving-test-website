import React, { Component } from 'react';

class RoundButton extends Component {
    render() {
        return (
            <button
                className={this.props.className ? `round-button ${this.props.className}` : "round-button"}
                onClick={this.props.onClick}
                type={this.props.type ? this.props.type : "button"}
            >
                {this.props.text}
            </button>
        );
    }
}

export default RoundButton;
