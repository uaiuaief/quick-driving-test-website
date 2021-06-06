import React, { Component } from 'react';
import LoginBox from "../LoginBox"

class LoginPage extends Component {
    render() {
        return (
            <section id="login-page">
                <div className="inner-container">
                    <LoginBox/>
                </div>
            </section>
        );
    }
}

export default LoginPage;
