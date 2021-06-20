import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BuyButton extends Component {
    render() {
        return (
            <Link
                to={this.props.disabled ? "#" : "signup"}
                className="buy-button"
            >
                {this.props.text}
            </Link>
        );
    }
}

export default BuyButton;
