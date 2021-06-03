import React, { Component } from 'react';

class SquareCard extends Component {
    render() {
        return (
            <div className="cta-card">
                <div className="img-wrapper">
                    <img src={this.props.image} alt=""></img>
                </div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.description}</h2>
            </div>
        );
    }
}

export default SquareCard;
