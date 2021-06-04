import React, { Component } from 'react';
import { PricingCard } from './Cards/PricingCard'

class Pricing extends Component {
    render() {
        return (
            <section id="pricing">
                <h1 id="pricing-title">PRICING</h1>
                <h2>We’ll find you a cancellation within three days! Sit tight - We’ve got this!</h2>
                <div id="price-cards">
                    <PricingCard
                        title="Plan I"
                        price="€ 0.00"
                        features={[
                            'lorem ipsum',
                            'lorem ipsum',
                            'lorem ipsum',
                            'lorem ipsum',
                            'lorem ipsum',
                            'lorem ipsum',
                        ]}
                    />
                    <PricingCard
                        recommended={true}
                        title="Plan II"
                        price="€ 49.00"
                        features={[
                            'lorem ipsum',
                            'lorem ipsum',
                            'lorem ipsum',
                            'lorem ipsum',
                            'lorem ipsum',
                            'lorem ipsum',
                        ]}
                    />
                </div>
            </section>
        );
    }
}

export { Pricing };
