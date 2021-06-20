import React, { Component } from 'react';
import SquareCard from './Cards/SquareCard';
import MainButton from './Buttons/MainButton'
import clockIcon from "../assets/clock-icon.png"
import moneyIcon from "../assets/money-icon.png"
import testIcon from "../assets/test-icon.png"

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
                            title="£ 100.00"
                            description="Average money you will save"
                            image={moneyIcon}
                        />
                        <SquareCard
                            title="10 weeks"
                            description="How many weeks earlier we move your test on average"
                            image={clockIcon}
                            />
                        <SquareCard
                            title="50 tests"
                            description="How many tests we find per day on average"
                            image={testIcon}
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
