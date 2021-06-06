import React, { Component } from 'react';
import BlueButton2 from "./Buttons/BlueButton2"


class LoginBox extends Component {
    render() {
        return (
            <div id="login-box" className="auth-box">
                <h1>Login to your account</h1>
                <form>
                    <input
                        required
                        placeholder="Email"
                        type="email"
                        id="login-email-field"
                    />
                    <input
                        required
                        placeholder="Password"
                        type="password"
                        id="login-password-field"
                    />
                    <div className="form-row-2">
                        <div>
                            <input
                                id="keep-me-logged-in"
                                type="checkbox"
                                />
                            <label for="keep-me-logged-in">Keep me logged in</label>
                        </div>
                        <a href="#">Forgot password?</a>
                    </div>
                    <BlueButton2
                        id="login-button"
                        text="Login"/>
                </form>
                <span>Don't have an account? <a href="#">Sign up</a></span>
            </div>
        );
    }
}

export default LoginBox;
