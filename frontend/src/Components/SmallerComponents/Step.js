import React, { Component } from 'react';

class Step extends Component {
    render() {
        return (
            <div class="tutorial-step">
                <div className="tutorial-text">
                    <h1>Lorem Ipsum Adore</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna Lorem
                        ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna
                    </p>
                    <div className="dotted-line"></div>
                </div>
                <div className="tutorial-delimiter">
                    <h2>STEP</h2>
                    <h1>{this.props.step}</h1>
                    <div className="dotted-line"></div>
                </div>
                <div className="tutorial-image image-wrapper">
                    <img src={this.props.image} />
                </div>
            </div>
        );
    }
}

export { Step };
