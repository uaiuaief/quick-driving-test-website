import React, { Component } from 'react';

class SubInputButton extends Component {
    render() {
        return (
            <button
                id={this.props.id}
                type="button"
                className="sub-input-button"
                onClick={this.props.onClick}
            >
                {this.props.text}
            </button>
        );
    }
}

export default SubInputButton;
