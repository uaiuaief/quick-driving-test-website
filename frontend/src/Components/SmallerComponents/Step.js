import React, { Component } from 'react';

class Step extends Component {
    render() {
        return (
            <div className="tutorial-step">
                <div className="tutorial-text">
                    <h1>{this.props.title}</h1>
                    <p>{this.props.text}</p>
                    <div className="dotted-line"></div>
                </div>
                <div className="tutorial-delimiter">
                    <h2>STEP</h2>
                    <h1>{this.props.step}</h1>
                    <div className="dotted-line"></div>
                </div>
                <div className="tutorial-delimiter mobile">
                    <div className="dotted-line"></div>
                    <div className="delimiter-text">
                        <h2>STEP</h2>
                        <h1>{this.props.step}</h1>
                    </div>
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
