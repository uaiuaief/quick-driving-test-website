import React, { Component } from 'react';
import BlueButton2 from "./Buttons/BlueButton2"
import { Link } from 'react-router-dom';


class PasswordResetBox extends Component {
    render() {
        return (
            <div id="password-reset-box" className="auth-box">
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
                    <br/>
                    <BlueButton2
                        id="password-reset-button"
                        text="Reset"/>
                </form>
                <span className="auth-footer">Don't have an account? <Link to="/signup">Sign up</Link></span>
             </div>
        );
    }
}

export default PasswordResetBox;
