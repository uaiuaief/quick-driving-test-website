import React, { Component } from 'react';
import BlueButton2 from "../Buttons/BlueButton2"
import { Link } from 'react-router-dom';
import { Formik } from 'formik';


class PasswordResetEmailSentPage extends Component {
    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    render() {
        return (
            <section id="password-reset-email-sent-page">
                <div className="inner-container">
                    <div id="password-reset-email-sent-box" className="auth-box">
                        <h1>Please check your email</h1>
                        <p>
                            We've sent you instructions on how to 
                            change your password.
                        </p>
                        <Link
                            to="/password-reset" 
                            className="blue-button-2">
                            Go back
                        </Link>
                    </div>
                </div>
            </section>
        );
    }
}

export default PasswordResetEmailSentPage;
