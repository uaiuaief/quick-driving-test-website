import React, { Component } from 'react';
import SquareCard from './Cards/SquareCard';
import MainButton from './Buttons/MainButton'

class CTA extends Component {
    render() {
        return (
            <section id="CTA">
                <div id="CTA-inner" className="inner-container">
                    <div id="CTA-text">
                        <h1>Find Quick Driving Test Cancellations</h1>
                        <h2> We can get you a driving test cancellation booked at your preferred test centre for any date & times of your choosing. Let's get you an earlier practical driving test booked NOW</h2>
                    </div>
                    <div id="cards">
                        <SquareCard
                            title="€ 100.00"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                            image="images/money-icon.png"
                        />
                        <SquareCard
                            title="10 weeks"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                            image="/images/clock-icon.png"
                            />
                        <SquareCard
                            title="50 tests"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                            image="/images/test-icon.png"
                        />
                    </div>
                    <MainButton
                        id="cta-button"
                        text="Get Cancellations NOW!"
                    />
                </div>
            </section>
        );
    }
}

export { CTA };
