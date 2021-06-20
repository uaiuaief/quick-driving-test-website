import React, { Component } from 'react';
import { PricingCard } from './Cards/PricingCard'

class Pricing extends Component {
    render() {
        return (
            <section id="pricing">
                <div className="inner-container">
                    <h1 id="pricing-title">PRICING</h1>
                    <h2>We’ll find you a cancellation within three days! Sit tight - We’ve got this!</h2>
                    <div id="price-cards">
                        <PricingCard
                            className="coming-soon"
                            disabled={true}
                            title="Plan I"
                            price="£ 0.00"
                            features={[
                                'Free trial',
                                'Upgrade at any time',
                                'Unreserved test dates',
                                'Customer service',
                                'Single test center search'
                            ]}
                        />
                        <PricingCard
                            className="recommended"
                            title="Plan II"
                            price="£ 19.00"
                            features={[
                                'Unlimited notifications',
                                'Money back guarantee',
                                'One test usage',
                                'Automatic booking',
                                'Search up to 4 test centers'
                            ]}
                        />
                    </div>
                </div>
            </section>
        );
    }
}

export { Pricing };
