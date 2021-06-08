import React, { Component } from 'react';
import BlueButton2 from "../Buttons/BlueButton2"
import { Link } from 'react-router-dom';


class PasswordResetSuccessPage extends Component {
    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    render() {
        return (
            <section id="password-reset-success-page">
                <div className="inner-container">
                    <div id="password-reset-success-box" className="auth-box">
                        <h1>Your password was reset successfully!</h1>
                        <Link
                            to="/profile" 
                            className="blue-button-2">
                            Go to account
                        </Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default PasswordResetSuccessPage;
