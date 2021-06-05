import React, { Component } from 'react';

class QuestionDropdown extends Component {
    state = {
        open: false
    }

    handleClick(e) {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        let cls = this.state.open ? "question-dropdown open" : "question-dropdown"
        let icon = this.state.open ? "images/up-arrow.png" : "images/down-arrow.png"

        return (
            <div className={cls}
                onClick={e => this.handleClick(e)}
            >
                <div className="question-row">
                    <div className="image-wrapper arrow">
                        <img src={icon} />
                    </div>
                    <h2>{this.props.question}</h2>
                </div>
                <p>{this.props.answer}</p>
            </div>
        );
    }
}

export default QuestionDropdown;
