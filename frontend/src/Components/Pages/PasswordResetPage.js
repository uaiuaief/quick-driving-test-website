import React, { Component } from 'react';
import BlueButton2 from "../Buttons/BlueButton2"
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';


class PasswordResetPage extends Component {
    state = {
        redirect: false
    }

    componentDidMount() {
        document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    render() {
        return (
            this.state.redirect
            ?
            <Redirect to="/password-reset-email-sent"/>
            :
            <section id="password-reset-page">
                <div className="inner-container">
                    <div id="password-reset-box" className="auth-box">
                        <h1>Forgot your password?</h1>
                        <Formik
                            initialValues={{
                                email: ""
                            }}

                            onSubmit={async (values, actions) => {
                                // alert(JSON.stringify(values, null, 2))
                                const ENDPOINT = "/api/recover-password/"

                                let res = await fetch(ENDPOINT, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'X-CSRFToken': window.getCookie('csrftoken')
                                    },
                                    body: JSON.stringify(values)
                                })

                                this.setState({
                                    redirect: true
                                })
                            }}
                        >
                            {props => (
                                <form onSubmit={props.handleSubmit}>
                                    <p>
                                        Don’t worry, just enter your email and we will send you instructions on how to recover it
                                    </p>
                                    <input
                                        name="email"
                                        value={props.values.email}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
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
                            )}
                        </Formik>
                        <span className="auth-footer">Don't have an account? <Link to="/signup">Sign up</Link></span>
                    </div>
                </div>
            </section>
        );
    }
}

export default PasswordResetPage;
