import React, { Component } from 'react';
import BuyButton from '../Buttons/BuyButton'

class PricingCard extends Component {
    render() {
        return (
            <div className={this.props.className ? `price-card ${this.props.className}` : "price-card"}>
                <div className="inner-container">
                    <h2>{this.props.title}</h2>
                    <h1>{this.props.price}</h1>
                    <ul>
                        {this.props.features.map((each, index) => {
                            return (
                                <li key={index}>{each}</li>
                            )
                        })}
                    </ul>
                    <BuyButton 
                        disabled={this.props.disabled}
                        text="Buy"/>
                </div>
            </div>
        );
    }
}

export { PricingCard };
