import React, { Component } from 'react';
import PasswordResetBox from "../PasswordResetBox"

class PasswordResetPage extends Component {
    render() {
        return (
            <section id="login-page">
                <div className="inner-container">
                    <PasswordResetBox/>
                </div>
            </section>
        );
    }
}

export default PasswordResetPage;
