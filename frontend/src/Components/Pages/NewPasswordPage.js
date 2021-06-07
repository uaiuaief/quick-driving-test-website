import React, { Component } from 'react';
import BlueButton2 from "../Buttons/BlueButton2"
import { Link } from 'react-router-dom';


class NewPasswordPage extends Component {
    render() {
        return (
            <section id="choose-new-password-page">
                <div className="inner-container">
                    <div id="choose-new-password-box" className="auth-box">
                        <h1>Reset password</h1>
                        <form>
                            <input
                                required
                                placeholder="New password"
                                type="password"
                                id="new-password-field"
                            />
                            <input
                                required
                                placeholder="Confirm new password"
                                type="password"
                                id="confirm-new-password-field"
                            />
                            <br />
                            <BlueButton2
                                id="password-reset-button"
                                text="Reset" />
                        </form>
                        <span className="auth-footer">Don't have an account? <Link to="/signup">Sign up</Link></span>
                    </div>
                </div>
            </section>
        );
    }
}

export default NewPasswordPage;
