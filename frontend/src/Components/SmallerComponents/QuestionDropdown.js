import React, { Component } from 'react';

class QuestionDropdown extends Component {
    render() {
        return (
            <div className="question-dropdown">
                <div className="question-row">
                    <div className="image-wrapper down-arrow">
                        <img src="images/down-arrow.png"/>
                    </div>
                    <h2>{this.props.question}</h2>
                </div>
                <p>{this.props.answer}</p>
            </div>
        );
    }
}

export default QuestionDropdown;
