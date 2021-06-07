import React, { Component } from 'react';
import BlueButton2 from "../Buttons/BlueButton2"
import { Link } from 'react-router-dom';


class PasswordResetPage extends Component {
    render() {
        return (
            <section id="password-reset-page">
                <div className="inner-container">
                    <div id="password-reset-box" className="auth-box">
                        <h1>Forgot your password?</h1>
                        <form>
                            <p>
                                Don’t worry, just enter your email and we will send you instructions on how to recover it
                            </p>
                            <input
                                required
                                placeholder="Email"
                                type="email"
                                id="password-reset-email-field"
                            />
                            <br />
                            <BlueButton2
                                id="send-email-button"
                                text="Send email" />
                        </form>
                        <span className="auth-footer">Don't have an account? <Link to="/signup">Sign up</Link></span>
                    </div>
                </div>
            </section>
        );
    }
}

export default PasswordResetPage;
