import React, { Component } from 'react';

class BuyButton extends Component {
    render() {
        return (
            <button className="buy-button">
                {this.props.text}
            </button>
        );
    }
}

export default BuyButton;
