import React, { Component } from 'react';

class PricingCard extends Component {
    render() {
        return (
            <div className="price-card">
                <div className="inner-container">
                    <h2>{this.props.title}</h2>
                    <h1>{this.props.price}</h1>
                    <ul>
                        {this.props.features.map(each => {
                            return (
                                <li>{each}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export { PricingCard };
