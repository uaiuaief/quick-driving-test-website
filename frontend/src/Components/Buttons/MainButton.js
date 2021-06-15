import React, { Component } from 'react';

class MainButton extends Component {
    render() {
        return (
            <button 
            id={this.props.id} 
            className="main-button"
            onClick={() => window.smoothScroll("pricing")}
            >
                {this.props.text}
            </button>
        );
    }
}

export default MainButton;
