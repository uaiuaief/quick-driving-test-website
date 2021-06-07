import React, { Component } from 'react';
import BlueButton2 from "../Buttons/BlueButton2";
import { Link } from 'react-router-dom';


class LoginPage extends Component {
    render() {
        return (
            <section id="login-page">
                <div className="inner-container">
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
                                <Link to="/password-reset">Forgot password?</Link>
                            </div>
                            <BlueButton2
                                id="login-button"
                                text="Login" />
                        </form>
                        <span className="auth-footer">Don't have an account? <Link to="/signup">Sign up</Link></span>
                    </div>
                </div>
            </section>
        );
    }
}

export default LoginPage;
