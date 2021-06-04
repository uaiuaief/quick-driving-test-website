import React, { Component } from 'react';
import BuyButton from '../Buttons/BuyButton'

class PricingCard extends Component {
    render() {
        let cls = this.props.recommended ? "price-card recommended" : "price-card"
        
        return (
            <div className={cls}>
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
                    <BuyButton text="Buy"/>
                </div>
            </div>
        );
    }
}

export { PricingCard };
